import { test, expect } from '@playwright/test';

test('Ortak başlık: mobil sınırlar, erişilebilirlik ve sahne yaşam döngüsü', async ({ page }, info) => {
  await page.goto('/');
  const mobile = page.viewportSize().width <= 820;
  const toggle = page.locator('#btn-mobile-menu');
  if (!mobile) {
    await expect(toggle).toBeHidden();
    await expect(page.locator('#btn-hakkimizda')).toBeVisible();
    await expect(page.locator('#btn-uyelik')).toBeVisible();
    return;
  }
  await expect(toggle).toBeVisible();
  await expect(page.locator('#header-navigation')).toBeHidden();
  const bounds = async selector => {
    const box = await page.locator(selector).boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width);
  };
  await bounds('.site-brand-link');
  await bounds('#btn-mobile-menu');
  const brand = await page.locator('.site-brand-link').boundingBox();
  const button = await toggle.boundingBox();
  expect(brand.x + brand.width).toBeLessThanOrEqual(button.x);
  expect(button.height).toBeGreaterThanOrEqual(48);
  expect(button.width).toBeGreaterThanOrEqual(48);
  expect(await toggle.evaluate(el => getComputedStyle(el).touchAction)).toBe('manipulation');
  await page.screenshot({ path: `tests/artifacts/${info.project.name}-menu-closed.png` });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await bounds('#header-navigation');
  expect(await page.locator('#header-navigation').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await expect(page.locator('#btn-header-home')).toBeHidden();
  await page.screenshot({ path: `tests/artifacts/${info.project.name}-menu-open.png` });
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('#header-navigation')).toBeHidden();
  await page.locator('#btn-uyelik').evaluate(el => el.focus());
  await expect(page.locator('#btn-uyelik')).not.toBeFocused();
  await toggle.click();
  await page.locator('#btn-uyelik').click();
  await expect(page.locator('#auth-modal')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await page.locator('#btn-close-auth').click();
  for (const [button, scene] of [['#btn-hakkimizda', '#scene-hakkimizda'], ['#btn-iletisim', '#scene-iletisim']]) {
    await toggle.click();
    await page.locator(button).click();
    await expect(page.locator(scene)).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(page.locator('#btn-header-home')).toBeVisible();
    await page.locator('#btn-header-home').click();
    await expect(page.locator('#scene-home')).toBeVisible();
  }
  for (const module of ['#btn-oyun-modulu', '#btn-deney-modulu', '#btn-yazili-modulu']) {
    if (!await page.locator(module).count()) continue;
    await page.locator(module).click();
    await toggle.click();
    await expect(page.locator('#btn-header-home')).toBeVisible();
    await page.locator('#site-logo-link').click();
    await expect(page.locator('#scene-home')).toBeVisible();
  }
  await toggle.click();
  await page.locator('#scene-home').click({ position: { x: 5, y: 200 } });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.screenshot({ path: `tests/artifacts/${info.project.name}-menu-scrolled.png` });
  for (const width of [820, 821, 768, 667, 390]) {
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width, height: 375 });
    if (width <= 820) { await toggle.click(); await bounds('#header-navigation'); }
    else { await expect(toggle).toBeHidden(); await expect(page.locator('#btn-hakkimizda')).toBeVisible(); }
  }
});

test('İzole hesap görünümü, panel içi kaydırma ve masaüstüne geçiş', async ({ page }) => {
  await page.goto('/');
  if (page.viewportSize().width > 820) return;
  const toggle = page.locator('#btn-mobile-menu');
  await page.evaluate(() => {
    const button = document.getElementById('btn-uyelik');
    button.innerHTML = '<img class="profile-img-header" alt=""> ÇokUzunBirDenemeKullanıcıAdıÇokUzunBirDenemeKullanıcıAdı';
    button.onclick = e => {
      e.stopPropagation();
      document.getElementById('profile-dropdown').classList.toggle('is-hidden');
    };
  });
  await toggle.click();
  await page.locator('#btn-uyelik').click();
  await expect(page.locator('#profile-dropdown')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(await page.locator('#header-navigation').evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await page.locator('#btn-open-profile').click();
  await expect(page.locator('#profile-modal')).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await page.locator('#close-profile').click();
  await toggle.click();
  await toggle.click();
  await expect(page.locator('#header-navigation')).toBeHidden();
  await toggle.click();
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#header-navigation')).toBeVisible();
  await page.setViewportSize({ width: 375, height: 320 });
  await expect(page.locator('#header-navigation')).toBeHidden();
  await toggle.click();
  const box = await page.locator('#header-navigation').boundingBox();
  expect(box.y + box.height).toBeLessThanOrEqual(320);
});
