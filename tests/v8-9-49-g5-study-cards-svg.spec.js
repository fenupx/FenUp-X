import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const G5_ASSETS_DIR = path.resolve(process.cwd(), 'data/exam/grade-5/1d1y/assets');

async function enterGrade5Study(page, scenarioNum = 1) {
  await page.addInitScript(() => {
    try { localStorage.setItem('fenupx_cookies_accepted', 'true'); localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}
  });
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForSelector('#btn-yazili-modulu', { state: 'visible', timeout: 15000 });
  await page.click('#btn-yazili-modulu');
  await page.waitForSelector('#exam-select-grade', { state: 'visible', timeout: 10000 });
  await page.selectOption('#exam-select-grade', '5');
  await page.waitForTimeout(350);
  await page.selectOption('#exam-select-scenario', String(scenarioNum));
  await page.click('#btn-scope-continue');
  await page.waitForSelector('#btn-choice-go-study', { state: 'visible', timeout: 10000 });
  await page.click('#btn-choice-go-study');
  await page.waitForSelector('#exam-view-study:not(.is-hidden)', { state: 'visible', timeout: 10000 });
  await page.waitForSelector('#exam-card-article .exam-card-title', { state: 'visible', timeout: 10000 });
  const cookieBtn = page.locator('#btn-accept-cookies');
  if (await cookieBtn.isVisible().catch(() => false)) {
    await cookieBtn.click();
  }
}

test.describe('V8.9.49 — 5. Sınıf Hızlı Tekrar Konu Kartları 4 Ekran Ölçekleme ve 30 SVG Denetimi', () => {
  test('1. 5. Sınıf 30 SVG diyagramının tamamında viewBox, preserveAspectRatio, kenar/taban boşluğu (>=10px), 0 metin çakışması ve okunaklı font (>=13px)', async ({ page }) => {
    const svgFiles = fs.readdirSync(G5_ASSETS_DIR)
      .filter(f => f.startsWith('diagram-') && f.endsWith('.svg'))
      .sort();
    expect(svgFiles.length).toBe(30);

    const violations = [];

    for (const file of svgFiles) {
      const svgContent = fs.readFileSync(path.join(G5_ASSETS_DIR, file), 'utf8');
      await page.setContent(`<!DOCTYPE html><html><head><style>body{margin:0;padding:16px;background:#0f172a;}</style></head><body>${svgContent}</body></html>`);

      const res = await page.evaluate((filename) => {
        const svg = document.querySelector('svg');
        if (!svg) return { filename, issues: ['Missing <svg>'] };

        const issues = [];
        const vbAttr = svg.getAttribute('viewBox');
        const parAttr = svg.getAttribute('preserveAspectRatio');
        if (!vbAttr) issues.push('Missing viewBox');
        if (parAttr !== 'xMidYMid meet') issues.push(`preserveAspectRatio=${parAttr}`);

        const vbParts = (vbAttr || '').trim().split(/[\s,]+/).map(Number);
        const vb = vbParts.length === 4 ? { x: vbParts[0], y: vbParts[1], w: vbParts[2], h: vbParts[3] } : null;

        const texts = Array.from(svg.querySelectorAll('text'));
        const boxes = [];
        for (const t of texts) {
          const str = (t.textContent || '').trim();
          if (!str) continue;
          const bbox = t.getBBox();
          const ctm = t.getCTM();
          const svgCtm = svg.getCTM();
          let bx = bbox.x, by = bbox.y, bw = bbox.width, bh = bbox.height;
          if (ctm && svgCtm) {
            const rel = svgCtm.inverse().multiply(ctm);
            const pts = [
              new DOMPoint(bbox.x, bbox.y).matrixTransform(rel),
              new DOMPoint(bbox.x + bbox.width, bbox.y).matrixTransform(rel),
              new DOMPoint(bbox.x, bbox.y + bbox.height).matrixTransform(rel),
              new DOMPoint(bbox.x + bbox.width, bbox.y + bbox.height).matrixTransform(rel),
            ];
            bx = Math.min(...pts.map(p => p.x));
            by = Math.min(...pts.map(p => p.y));
            bw = Math.max(...pts.map(p => p.x)) - bx;
            bh = Math.max(...pts.map(p => p.y)) - by;
          }

          const fsAttr = parseFloat(t.getAttribute('font-size') || getComputedStyle(t).fontSize || '0');
          if (fsAttr > 0 && fsAttr < 13) {
            issues.push(`smallFont(${fsAttr}px): "${str}"`);
          }

          if (vb) {
            if (bx < vb.x + 10) issues.push(`leftOverflow(${bx.toFixed(1)}): "${str}"`);
            if (by < vb.y + 10) issues.push(`topOverflow(${by.toFixed(1)}): "${str}"`);
            if (bx + bw > vb.x + vb.w - 10) issues.push(`rightOverflow(${(bx + bw).toFixed(1)} > ${vb.x + vb.w - 10}): "${str}"`);
            if (by + bh > vb.y + vb.h - 10) issues.push(`bottomOverflow(${(by + bh).toFixed(1)} > ${vb.y + vb.h - 10}): "${str}"`);
          }

          boxes.push({ str, x: bx, y: by, w: bw, h: bh });
        }

        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i], b = boxes[j];
            const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
            const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
            if (ox > 0.5 && oy > 0.5) {
              issues.push(`overlap("${a.str}" <-> "${b.str}", ox=${ox.toFixed(1)}, oy=${oy.toFixed(1)})`);
            }
          }
        }

        return { filename, issues };
      }, file);

      if (res.issues.length > 0) {
        violations.push(`${res.filename}: ${res.issues.join(' | ')}`);
      }
    }

    expect(violations, 'Hiçbir 5. sınıf SVG diyagramında taşma, çakışma veya okunaksız font olmamalı').toEqual([]);
  });

  test('2. 5. Sınıf 1D1Y tüm 31 görselli kartta naturalWidth > 0, object-fit: contain, 0 yatay taşma ve profil bazlı görsel boyutları + lightbox', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await enterGrade5Study(page, 1);

    const vp = page.viewportSize();
    const isEtap = vp.width >= 1400;
    const isDesktop = vp.width >= 1025 && vp.width < 1400;
    const isMobile = vp.width <= 600;

    // 5. sınıf 1D1Y kartlarının tamamını sırayla gez (tüm 37 kart -> 31 görselli kart)
    let visualCardsChecked = 0;
    let firstVisualTestedLightbox = false;
    const seenAssets = new Set();

    // Toplam kart sayısını al
    const totalCards = await page.evaluate(() => {
      const navBtns = document.querySelectorAll('#exam-cardnav [data-study-card]');
      return navBtns.length || 37;
    });
    expect(totalCards).toBeGreaterThanOrEqual(31);

    for (let idx = 0; idx < totalCards; idx++) {
      // Kartın görsel kutusunu kontrol et
      const info = await page.evaluate(() => {
        const overflow = document.documentElement.scrollWidth - window.innerWidth;
        const vbox = document.querySelector('#exam-visual');
        const img = vbox ? vbox.querySelector('img') : null;
        const bodyP = document.querySelector('.exam-body-p, .exam-lead');
        const bodyFontSize = bodyP ? parseFloat(getComputedStyle(bodyP).fontSize) : 0;
        if (!vbox || vbox.classList.contains('is-hidden') || !img) {
          return { hasImg: false, overflow, bodyFontSize };
        }
        const rect = vbox.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        const imgStyle = getComputedStyle(img);
        return {
          hasImg: true,
          src: img.getAttribute('src') || '',
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          objectFit: imgStyle.objectFit,
          boxWidth: Math.round(rect.width),
          boxHeight: Math.round(rect.height),
          imgWidth: Math.round(imgRect.width),
          imgHeight: Math.round(imgRect.height),
          overflow,
          bodyFontSize,
        };
      });

      expect(info.overflow, `Kart #${idx + 1} yatay taşma olmamalı`).toBeLessThanOrEqual(1);

      if (info.hasImg) {
        // Görselin yüklenmesini bekle
        await expect.poll(async () => {
          return await page.evaluate(() => {
            const img = document.querySelector('#exam-visual img');
            return img && img.complete ? img.naturalWidth : 0;
          });
        }, { timeout: 8000 }).toBeGreaterThan(0);

        const loaded = await page.evaluate(() => {
          const vbox = document.querySelector('#exam-visual');
          const img = vbox.querySelector('img');
          const rect = vbox.getBoundingClientRect();
          const imgRect = img.getBoundingClientRect();
          return {
            src: img.getAttribute('src') || '',
            naturalWidth: img.naturalWidth,
            objectFit: getComputedStyle(img).objectFit,
            boxWidth: Math.round(rect.width),
            boxHeight: Math.round(rect.height),
            imgWidth: Math.round(imgRect.width),
            imgHeight: Math.round(imgRect.height),
          };
        });

        visualCardsChecked++;
        seenAssets.add(loaded.src.split('?')[0]);

        expect(loaded.naturalWidth, `Görsel yüklenmeli: ${loaded.src}`).toBeGreaterThan(0);
        expect(loaded.objectFit, `object-fit contain olmalı: ${loaded.src}`).toBe('contain');

        if (isDesktop) {
          expect(loaded.boxWidth, `Masaüstü (1366x768) görsel kutusu >= 380px olmalı (${loaded.src})`).toBeGreaterThanOrEqual(380);
          expect(loaded.boxHeight, `Masaüstü görsel kutusu >= 280px olmalı (${loaded.src})`).toBeGreaterThanOrEqual(280);
        } else if (isEtap) {
          expect(loaded.boxWidth, `ETAP (1920x1080) görsel kutusu >= 500px olmalı (${loaded.src})`).toBeGreaterThanOrEqual(500);
          expect(loaded.boxHeight, `ETAP görsel kutusu >= 360px olmalı (${loaded.src})`).toBeGreaterThanOrEqual(360);
        } else if (isMobile) {
          expect(info.bodyFontSize, 'Mobil gövde metni >= 15.5px olmalı').toBeGreaterThanOrEqual(15.5);
          expect(loaded.imgHeight, 'Mobil görsel max-height <= 282px olmalı').toBeLessThanOrEqual(282);
        }

        // İlk görselli kartta lightbox açılıp kapanmasını doğrula
        if (!firstVisualTestedLightbox) {
          firstVisualTestedLightbox = true;
          await page.locator('#exam-visual img').click();
          const lb = page.locator('#exam-lightbox-modal');
          await expect(lb).toBeVisible({ timeout: 5000 });
          await page.keyboard.press('Escape');
          await expect(lb).toBeHidden({ timeout: 5000 });
        }
      }

      if (idx < totalCards - 1) {
        await page.click('#exam-card-next');
      }
    }

    expect(visualCardsChecked, '5. sınıf 1D1Y tüm 31 görselli kart denetlenmiş olmalı').toBe(31);
    expect(seenAssets.size, '31 benzersiz görsel (30 SVG + gunes_only.png) görülmeli').toBe(31);
    expect(pageErrors, 'Sayfa hatası olmamalı').toEqual([]);
  });
});
