import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const G6_ASSETS_DIR = path.resolve(process.cwd(), 'data/exam/grade-6/1d1y/assets');

async function enterQuickStudy(page, grade = '6', scenarioNum = 1) {
  await page.addInitScript(() => {
    try { localStorage.setItem('fenupx_cookies_accepted', 'true'); localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}
  });
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForSelector('#btn-yazili-modulu', { state: 'visible', timeout: 15000 });
  await page.click('#btn-yazili-modulu');
  await page.waitForSelector('#exam-select-grade', { state: 'visible', timeout: 10000 });
  if (String(grade) !== '7') {
    await page.selectOption('#exam-select-grade', String(grade));
    await page.waitForTimeout(350);
  }
  await page.selectOption('#exam-select-scenario', String(scenarioNum));
  await page.click('#btn-scope-continue');
  await page.waitForSelector('#btn-choice-go-study', { state: 'visible', timeout: 10000 });
  await page.click('#btn-choice-go-study');
  await page.waitForSelector('#exam-view-study:not(.is-hidden)', { state: 'visible', timeout: 10000 });

  // 7. sınıfta ön seçim ekranı çıkarsa Hızlı Tekrar'ı seç
  const chooserQuick = page.locator('#btn-chooser-quick');
  if (await chooserQuick.isVisible({ timeout: 1200 }).catch(() => false)) {
    await chooserQuick.click();
  }
  await page.waitForSelector('#exam-card-article .exam-card-title', { state: 'visible', timeout: 10000 });
  const cookieBtn = page.locator('#btn-accept-cookies');
  if (await cookieBtn.isVisible().catch(() => false)) {
    await cookieBtn.click();
  }
}

test.describe('V8.9.52 — Tüm Sınıflar (5-6-7) Görsel Hızlandırma (Preload), 6. Sınıf SVG Denetimi ve Ortak 4-Ekran/Tam Ekran Standardı', () => {
  test('1. 6. Sınıf 16 SVG diyagramının tamamında viewBox, preserveAspectRatio, kenar/taban boşluğu (>=10px), 0 metin çakışması ve >=13px font', async ({ page }) => {
    const svgFiles = fs.readdirSync(G6_ASSETS_DIR)
      .filter(f => f.startsWith('diagram-') && f.endsWith('.svg'))
      .sort();
    expect(svgFiles.length).toBe(16);

    const violations = [];
    for (const file of svgFiles) {
      const svgContent = fs.readFileSync(path.join(G6_ASSETS_DIR, file), 'utf8');
      await page.setContent(`<!DOCTYPE html><html><head><style>body{margin:0;padding:16px;background:#0f172a;}</style></head><body>${svgContent}</body></html>`);

      const res = await page.evaluate((filename) => {
        const svg = document.querySelector('svg');
        if (!svg) return { filename, issues: ['Missing <svg>'] };
        const issues = [];
        const vbAttr = svg.getAttribute('viewBox');
        const parAttr = svg.getAttribute('preserveAspectRatio');
        if (!vbAttr) issues.push('Missing viewBox');
        if (parAttr !== 'xMidYMid meet') issues.push(`preserveAspectRatio=${parAttr}`);

        const parts = (vbAttr || '').trim().split(/[\s,]+/).map(Number);
        const vb = parts.length === 4 ? { x: parts[0], y: parts[1], w: parts[2], h: parts[3] } : null;

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
          if (fsAttr > 0 && fsAttr < 13) issues.push(`smallFont(${fsAttr}px): "${str}"`);
          if (vb) {
            if (bx < vb.x + 10) issues.push(`left(${bx.toFixed(1)}): "${str}"`);
            if (by < vb.y + 10) issues.push(`top(${by.toFixed(1)}): "${str}"`);
            if (bx + bw > vb.x + vb.w - 10) issues.push(`right(${(bx + bw).toFixed(1)}): "${str}"`);
            if (by + bh > vb.y + vb.h - 10) issues.push(`bottom(${(by + bh).toFixed(1)}): "${str}"`);
          }
          boxes.push({ str, x: bx, y: by, w: bw, h: bh });
        }
        for (let i = 0; i < boxes.length; i++) {
          for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i], b = boxes[j];
            const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
            const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
            if (ox > 0.5 && oy > 0.5) {
              issues.push(`overlap("${a.str}"<->"${b.str}", ${ox.toFixed(1)}x${oy.toFixed(1)})`);
            }
          }
        }
        return { filename, issues };
      }, file);

      if (res.issues.length > 0) violations.push(`${res.filename}: ${res.issues.join(' | ')}`);
    }
    expect(violations, 'Hiçbir 6. sınıf SVG diyagramında taşma, çakışma veya <13px font olmamalı').toEqual([]);
  });

  test('2. 6. Sınıf tüm görselli kartlarda naturalWidth > 0, ?v=8.9.52 cache-bust, object-fit: contain, 0 taşma ve akıllı preload', async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await enterQuickStudy(page, '6', 1);

    // İlk açılışta ön-yükleme (preload) kümesinin sonraki kart görsellerini başlattığını doğrula
    const initialPreloaded = await page.evaluate(() => {
      const s = window.__FENUPX_PRELOADED_IMAGES__;
      return s ? Array.from(s) : [];
    });
    expect(initialPreloaded.length, 'İlk kart açılışında sonraki görseller sessizce ön-yüklenmeli').toBeGreaterThanOrEqual(2);
    for (const u of initialPreloaded) {
      expect(u).toMatch(/\?v=8\.9\.52/);
    }

    const totalCards = await page.evaluate(() => document.querySelectorAll('#exam-cardnav [data-study-card]').length || 48);
    let visualCount = 0;
    for (let idx = 0; idx < totalCards; idx++) {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `6. sınıf Kart #${idx + 1} yatay taşma olmamalı`).toBeLessThanOrEqual(1);

      const hasImg = await page.evaluate(() => {
        const vbox = document.querySelector('#exam-visual');
        return !!(vbox && !vbox.classList.contains('is-hidden') && vbox.querySelector('img'));
      });

      if (hasImg) {
        await expect.poll(async () => {
          return await page.evaluate(() => {
            const img = document.querySelector('#exam-visual img');
            return img && img.complete ? img.naturalWidth : 0;
          });
        }, { timeout: 8000 }).toBeGreaterThan(0);

        const imgInfo = await page.evaluate(() => {
          const img = document.querySelector('#exam-visual img');
          return {
            src: img.getAttribute('src') || '',
            naturalWidth: img.naturalWidth,
            objectFit: getComputedStyle(img).objectFit,
            loading: img.getAttribute('loading'),
            fetchpriority: img.getAttribute('fetchpriority'),
          };
        });
        visualCount++;
        expect(imgInfo.naturalWidth).toBeGreaterThan(0);
        expect(imgInfo.src).toMatch(/\?v=8\.9\.52/);
        expect(imgInfo.objectFit).toBe('contain');
        expect(imgInfo.loading).toBe('eager');
        expect(imgInfo.fetchpriority).toBe('high');
      }

      if (idx < totalCards - 1) {
        await page.click('#exam-card-next');
      }
    }

    expect(visualCount, '6. sınıf görselli kartları eksiksiz denetlenmeli').toBeGreaterThanOrEqual(16);
    expect(pageErrors).toEqual([]);
  });

  test('3. 5., 6. ve 7. Sınıf Hızlı Tekrar ortak standart: Konular kapatınca >=%75 genişlik ve Tam Ekran büyütme (0 dikey kaydırma)', async ({ page }) => {
    const vp = page.viewportSize();

    for (const grade of ['5', '6', '7']) {
      await enterQuickStudy(page, grade, 1);

      // İlk görselli karta ilerle
      for (let i = 0; i < 6; i++) {
        const hasImg = await page.evaluate(() => {
          const vbox = document.querySelector('#exam-visual');
          return !!(vbox && !vbox.classList.contains('is-hidden') && vbox.querySelector('img'));
        });
        if (hasImg) break;
        await page.click('#exam-card-next');
      }

      // Konular kapatılınca >= %75 genişlik
      const toggleBtn = page.locator('#btn-study-toggle-plan');
      const wasExpanded = await toggleBtn.getAttribute('aria-expanded');
      if (wasExpanded === 'true') {
        await toggleBtn.click();
      } else {
        await toggleBtn.click();
        await toggleBtn.click();
      }
      await expect(page.locator('.exam-cards-layout')).toHaveClass(/plan-collapsed/);
      const ratio = await page.evaluate(() => {
        const card = document.querySelector('#exam-card-article');
        return +(card.getBoundingClientRect().width / window.innerWidth).toFixed(3);
      });
      expect(ratio, `${grade}. sınıf Konular kapalıyken kart >= %75 genişlikte olmalı`).toBeGreaterThanOrEqual(0.75);

      // Konuları geri aç
      await toggleBtn.click();

      // Masaüstü ve ETAP'ta Tam Ekran büyütme + 0 dikey kaydırma
      if (vp.width >= 1025) {
        const normal = await page.evaluate(() => {
          const vbox = document.querySelector('#exam-visual');
          const bodyP = document.querySelector('#exam-view-study .exam-body-p, #exam-view-study .exam-lead');
          return {
            boxH: Math.round(vbox.getBoundingClientRect().height),
            fontSize: parseFloat(getComputedStyle(bodyP).fontSize),
          };
        });

        await page.click('#btn-study-fullscreen');
        await expect(page.locator('#exam-view-study')).toHaveClass(/fullscreen-study-active/);
        await page.waitForTimeout(200);

        const fs = await page.evaluate(() => {
          const vbox = document.querySelector('#exam-visual');
          const bodyP = document.querySelector('#exam-view-study .exam-body-p, #exam-view-study .exam-lead');
          const area = document.querySelector('#exam-view-study .study-card-content-area');
          return {
            boxH: Math.round(vbox.getBoundingClientRect().height),
            fontSize: parseFloat(getComputedStyle(bodyP).fontSize),
            vScroll: area ? Math.max(0, area.scrollHeight - area.clientHeight) : 0,
          };
        });

        expect(fs.boxH, `${grade}. sınıf Tam Ekran görsel yüksekliği >= normal`).toBeGreaterThanOrEqual(normal.boxH);
        expect(fs.fontSize, `${grade}. sınıf Tam Ekran gövde metni >= normal`).toBeGreaterThanOrEqual(normal.fontSize);
        expect(fs.vScroll, `${grade}. sınıf Tam Ekran 0 dikey kaydırma`).toBeLessThanOrEqual(2);

        await page.click('#btn-study-fullscreen');
        await expect(page.locator('#exam-view-study')).not.toHaveClass(/fullscreen-study-active/);
      }
    }
  });
});
