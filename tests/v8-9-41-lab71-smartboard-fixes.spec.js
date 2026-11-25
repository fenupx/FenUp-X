import { test, expect } from '@playwright/test';

test.describe('FenUp X — V8.9.41 Deney 7.1 Çift Etiket/Buton Düzeltmesi ve Akıllı Tahta Koordinat Doğrulaması', () => {
  test('1. Deney 7.1: Mod 1 ve Mod 2 karşılaştırma ekranında tekrarlı buton ve üst üste kuvvet etiketi olmamalı', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined');
    await page.evaluate(() => localStorage.clear());

    await page.locator('#btn-deney-modulu').click();
    await page.locator('.lab-welcome-card[data-grade="7"]').click();
    await page.locator('.lab-launch-btn[data-exp-id="7.1"]').click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();

    const qc = page.locator('#quick-controls-7-1');
    await expect(qc).toBeVisible();

    // Tekrarlı rozet/buton (#badge-dual-current-mode) DOM'dan kaldırılmış olmalı
    await expect(page.locator('#badge-dual-current-mode')).toHaveCount(0);

    // Mod 1'e geç: alt kontrol alanında "Mod 1: Kuvvetin İşe Etkisi" yalnızca tek bir butonda yer almalı
    await page.locator('#btn-work-mode-force').click();
    await page.waitForTimeout(150);
    await expect(page.locator('#btn-work-mode-force')).toHaveClass(/active/);
    await expect(page.locator('#btn-dual-play-pause')).toBeVisible();
    await expect(page.locator('#btn-dual-reset')).toBeVisible();

    const mod1TextMatches = await qc.evaluate((root) => {
      const visibleEls = Array.from(root.querySelectorAll('button, .lab-dual-mode-badge'))
        .filter(el => el.offsetParent !== null && (el.textContent || '').includes('Mod 1: Kuvvetin İşe Etkisi'));
      return visibleEls.length;
    });
    expect(mod1TextMatches).toBe(1);

    // Canvas fillText çağrılarını tek karede izleyerek "10 N" ve "20 N" etiketlerinin her parkur için yalnızca 1 kez çizildiğini doğrula
    const labelCountsMod1 = await page.evaluate(() => new Promise((resolve) => {
      const c = document.getElementById('lab-canvas');
      const ctx = c.getContext('2d');
      const origFillText = ctx.fillText.bind(ctx);
      const drawn = [];
      ctx.fillText = function (text, x, y, ...rest) {
        drawn.push({ text: String(text), x: Math.round(x), y: Math.round(y) });
        return origFillText(text, x, y, ...rest);
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ctx.fillText = origFillText;
          // Yalnızca tek bir render karesini incele: son "Kuvvetin İşe Etkisi" başlığından sonraki çağrılar
          let startIdx = 0;
          for (let i = drawn.length - 1; i >= 0; i--) {
            if (drawn[i].text === 'Kuvvetin İşe Etkisi') {
              startIdx = i;
              break;
            }
          }
          const frameTexts = drawn.slice(startIdx);
          resolve({
            count10N: frameTexts.filter(t => t.text === '10 N').length,
            count20N: frameTexts.filter(t => t.text === '20 N').length,
          });
        });
      });
    }));
    expect(labelCountsMod1.count10N).toBe(1);
    expect(labelCountsMod1.count20N).toBe(1);

    // Mod 2'ye geç ve aynı şekilde tekil "15 N" etiketlerini (2 parkur -> toplam 2 kez, her ok üstünde 1 kez) doğrula
    await page.locator('#btn-work-mode-dist').click();
    await page.waitForTimeout(150);
    await expect(page.locator('#btn-work-mode-dist')).toHaveClass(/active/);

    const labelCountsMod2 = await page.evaluate(() => new Promise((resolve) => {
      const c = document.getElementById('lab-canvas');
      const ctx = c.getContext('2d');
      const origFillText = ctx.fillText.bind(ctx);
      const drawn = [];
      ctx.fillText = function (text, x, y, ...rest) {
        drawn.push({ text: String(text), x: Math.round(x), y: Math.round(y) });
        return origFillText(text, x, y, ...rest);
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ctx.fillText = origFillText;
          let startIdx = 0;
          for (let i = drawn.length - 1; i >= 0; i--) {
            if (drawn[i].text === 'Alınan Yolun İşe Etkisi') {
              startIdx = i;
              break;
            }
          }
          const frameTexts = drawn.slice(startIdx);
          resolve({
            count15N: frameTexts.filter(t => t.text === '15 N').length,
          });
        });
      });
    }));
    expect(labelCountsMod2.count15N).toBe(2);

    expect(errors).toEqual([]);
  });

  test('2. Akıllı Tahta Piksel-Koordinat Doğruluğu (DPR 1, 1.5 ve 2 — Normal ve Tam Ekran)', async ({ browser, baseURL }) => {
    for (const dpr of [1, 1.5, 2]) {
      const context = await browser.newContext({
        baseURL,
        viewport: { width: 1280, height: 800 },
        deviceScaleFactor: dpr,
      });
      const page = await context.newPage();
      await page.goto('/');
      await page.waitForFunction(() => typeof window.openSmartboard === 'function');

      await page.evaluate(() => window.openSmartboard());
      const canvas = page.locator('#smartboard-canvas');
      await expect(canvas).toBeVisible();
      await page.waitForTimeout(80);

      for (const useFullscreen of [false, true]) {
        if (useFullscreen) {
          await page.locator('#sb-btn-fullscreen').click();
          await page.waitForTimeout(80);
        } else {
          await page.locator('#sb-btn-clear').click();
        }

        await page.locator('#sb-btn-clear').click();

        const box = await canvas.boundingBox();
        expect(box).not.toBeNull();

        // Sağa/aşağı ölçek sapmasını en keskin yakalayan iki nokta: merkez (0.5, 0.5) ve sağ-alt kadran (0.78, 0.68)
        for (const [rx, ry] of [[0.5, 0.5], [0.78, 0.68]]) {
          await page.locator('#sb-btn-clear').click();
          const targetDx = Math.round(box.width * rx);
          const targetDy = Math.round(box.height * ry);

          await page.mouse.move(box.x + targetDx, box.y + targetDy);
          await page.mouse.down();
          await page.mouse.up();

          const measured = await page.evaluate(() => {
            const c = document.getElementById('smartboard-canvas');
            const p = document.getElementById('smartboard-preview-canvas');
            const rect = c.getBoundingClientRect();
            const pRect = p.getBoundingClientRect();
            const ctx = c.getContext('2d');
            const img = ctx.getImageData(0, 0, c.width, c.height);
            const data = img.data;
            let sumX = 0;
            let sumY = 0;
            let count = 0;
            for (let py = 0; py < c.height; py++) {
              for (let px = 0; px < c.width; px++) {
                const a = data[(py * c.width + px) * 4 + 3];
                if (a > 30) {
                  sumX += px + 0.5;
                  sumY += py + 0.5;
                  count++;
                }
              }
            }
            const curDpr = window.devicePixelRatio || 1;
            return {
              count,
              centroidCssX: count > 0 ? (sumX / count) / curDpr : -1,
              centroidCssY: count > 0 ? (sumY / count) / curDpr : -1,
              canvasW: c.width,
              expectedW: Math.round(Math.round(rect.width) * curDpr),
              previewMatchesMain:
                Math.abs(rect.left - pRect.left) < 0.5 &&
                Math.abs(rect.top - pRect.top) < 0.5 &&
                Math.abs(rect.width - pRect.width) < 0.5 &&
                Math.abs(rect.height - pRect.height) < 0.5,
            };
          });

          expect(measured.previewMatchesMain).toBe(true);
          expect(measured.canvasW).toBe(measured.expectedW);
          expect(measured.count).toBeGreaterThan(0);
          expect(Math.abs(measured.centroidCssX - targetDx)).toBeLessThanOrEqual(4);
          expect(Math.abs(measured.centroidCssY - targetDy)).toBeLessThanOrEqual(4);
        }
      }

      await context.close();
    }
  });

  test('3. Linux/ETAP bozuk getCoalescedEvents alt olaylarına karşı koruma ve artımlı Fatih Kalem çizimi', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.openSmartboard === 'function');
    await page.evaluate(() => window.openSmartboard());
    await expect(page.locator('#smartboard-canvas')).toBeVisible();
    await page.waitForTimeout(80);

    const strokeCheck = await page.evaluate(() => {
      const c = document.getElementById('smartboard-canvas');
      const rect = c.getBoundingClientRect();
      const startX = rect.left + 220;
      const startY = rect.top + 180;
      const endX = rect.left + 320;
      const endY = rect.top + 210;

      c.dispatchEvent(new PointerEvent('pointerdown', {
        bubbles: true, cancelable: true, pointerId: 7, pointerType: 'touch', clientX: startX, clientY: startY
      }));

      // Sürücü hatasını simüle et: getCoalescedEvents içinde (0, 0) ve geçerli nokta birlikte dönüyor
      const moveEv = new PointerEvent('pointermove', {
        bubbles: true, cancelable: true, pointerId: 7, pointerType: 'touch', clientX: endX, clientY: endY
      });
      Object.defineProperty(moveEv, 'getCoalescedEvents', {
        value: () => [
          { clientX: 0, clientY: 0 },
          { clientX: NaN, clientY: NaN },
          { clientX: startX + 50, clientY: startY + 15 },
          { clientX: endX, clientY: endY },
        ]
      });
      c.dispatchEvent(moveEv);

      c.dispatchEvent(new PointerEvent('pointerup', {
        bubbles: true, cancelable: true, pointerId: 7, pointerType: 'touch', clientX: endX, clientY: endY
      }));

      const lastCmd = window.globalSmartboardState.history[window.globalSmartboardState.history.length - 1];
      const minPtX = Math.min(...lastCmd.points.map(p => p.x));
      return {
        pointCount: lastCmd.points.length,
        minPtX: Math.round(minPtX),
      };
    });

    expect(strokeCheck.pointCount).toBeGreaterThanOrEqual(3);
    // Bozuk (0, 0) noktası filtrelendiği için minPtX ~220 civarında kalmalı
    expect(strokeCheck.minPtX).toBeGreaterThanOrEqual(215);
  });
});
