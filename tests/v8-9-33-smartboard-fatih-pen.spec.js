import { test, expect } from '@playwright/test';

async function drawPointerStroke(page, canvasLocator, dx1, dy1, dx2, dy2, steps = 6) {
  const box = await canvasLocator.boundingBox();
  expect(box).not.toBeNull();
  const x1 = box.x + dx1;
  const y1 = box.y + dy1;
  const x2 = box.x + dx2;
  const y2 = box.y + dy2;

  await page.mouse.move(x1, y1);
  await page.mouse.down();
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    await page.mouse.move(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t);
  }
  await page.mouse.up();
}

test.describe('FenUp X — V8.9.33 Akıllı Tahta Fatih Kalem Çizim Motoru ve Araç Seti', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.openSmartboard === 'function' && typeof window.globalSmartboardState !== 'undefined');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Fatih Kalem araçları, tahta modları, Geri Al / İleri Al ve Tam Ekran çizim koruması', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.evaluate(() => window.openSmartboard());
    const modal = page.locator('#smartboard-modal');
    const canvas = page.locator('#smartboard-canvas');
    await expect(modal).toBeVisible();
    await expect(canvas).toBeVisible();
    await page.waitForTimeout(120);

    // touch-action: none ve yatay taşma olmaması kontrolü
    const cssProps = await page.evaluate(() => {
      const c = document.getElementById('smartboard-canvas');
      const cs = getComputedStyle(c);
      return {
        touchAction: cs.touchAction,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 2
      };
    });
    expect(cssProps.touchAction).toBe('none');
    expect(cssProps.overflow).toBe(false);

    // 1. Serbest El Kalem + Fosforlu + Düz Çizgi + Kesikli + Ok + Kutu + Daire
    await drawPointerStroke(page, canvas, 40, 60, 140, 95, 8);
    await page.locator('#sb-tool-highlighter').click();
    await drawPointerStroke(page, canvas, 40, 120, 150, 120, 4);
    await page.locator('#sb-tool-line').click();
    await drawPointerStroke(page, canvas, 40, 150, 180, 150, 3);
    await page.locator('#sb-tool-dashed').click();
    await drawPointerStroke(page, canvas, 40, 180, 180, 180, 3);
    await page.locator('#sb-tool-arrow').click();
    await drawPointerStroke(page, canvas, 40, 210, 190, 210, 3);
    await page.locator('#sb-tool-rect').click();
    await drawPointerStroke(page, canvas, 200, 60, 270, 120, 3);
    await page.locator('#sb-tool-circle').click();
    await drawPointerStroke(page, canvas, 200, 140, 270, 210, 3);

    const historyAfter7 = await page.evaluate(() => window.globalSmartboardState.history.length);
    expect(historyAfter7).toBe(7);

    // 2. Silgi + Geri Al + İleri Al
    await page.locator('#sb-btn-eraser').click();
    await expect(page.locator('#sb-btn-eraser')).toHaveClass(/active/);
    await drawPointerStroke(page, canvas, 40, 60, 80, 75, 4);
    expect(await page.evaluate(() => window.globalSmartboardState.history.length)).toBe(8);

    await page.locator('#sb-btn-undo').click();
    expect(await page.evaluate(() => window.globalSmartboardState.history.length)).toBe(7);
    await page.locator('#sb-btn-redo').click();
    expect(await page.evaluate(() => window.globalSmartboardState.history.length)).toBe(8);

    // 3. Tahta Modları: Siyah Tahta ve Kareli Tahta geçişinde yüksek kontrast ve çizim korunumu
    await page.locator('#sb-mode-dark').click();
    await expect(page.locator('#sb-canvas-container')).toHaveClass(/mode-dark/);
    const darkColor = await page.evaluate(() => window.globalSmartboardState.color);
    expect(darkColor).toBe('#f8fafc');
    expect(await page.evaluate(() => window.globalSmartboardState.history.length)).toBe(8);

    await page.locator('#sb-mode-grid').click();
    await expect(page.locator('#sb-canvas-container')).toHaveClass(/mode-grid/);
    expect(await page.evaluate(() => window.globalSmartboardState.history.length)).toBe(8);

    // 4. Tam Ekran Aç/Kapat çizimi korur
    await page.locator('#sb-btn-fullscreen').click();
    await expect(page.locator('#smartboard-modal .smartboard-dialog')).toHaveClass(/is-fullscreen/);
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => window.globalSmartboardState.history.length)).toBe(8);

    // 5. Temizle + Kapat
    await page.locator('#sb-btn-clear').click();
    expect(await page.evaluate(() => window.globalSmartboardState.history.length)).toBe(0);
    await page.locator('#sb-btn-close').click();
    await expect(modal).toBeHidden();

    expect(errors).toEqual([]);
  });
});
