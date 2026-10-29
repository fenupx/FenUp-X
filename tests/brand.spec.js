import { test, expect } from '@playwright/test';
test('Marka, müfredat, modül dengesi ve ikon erişimi', async ({page},info)=>{
 await page.goto('/');
 await expect(page).toHaveTitle('FenUp X | Fen Bilimleri Platformu');
 await expect(page.locator('.curriculum-label')).toHaveText('Maarif Modeli’ne uygun');
 await expect(page.locator('.main-title')).toHaveText('Fen bilimlerini keşfet!');
 await expect(page.locator('.main-subtitle')).toHaveText('5, 6 ve 7. sınıflar için');
 expect(await page.locator('.brand-x').evaluate(el=>getComputedStyle(el).color)).toBe('rgb(255, 128, 107)');
 for(const selector of ['.site-brand-link','.curriculum-label','.main-menu-grid', '#btn-oyun-modulu','#btn-deney-modulu','#btn-yazili-modulu']) {
  const b=await page.locator(selector).boundingBox();expect(b.x).toBeGreaterThanOrEqual(0);expect(b.x+b.width).toBeLessThanOrEqual(page.viewportSize().width+1);
  expect(await page.locator(selector).evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true);
 }
 expect(await page.locator('.module-btn > i').evaluateAll(els=>new Set(els.map(e=>getComputedStyle(e).fontSize)).size)).toBe(1);
 await expect(page.locator('#btn-yazili-modulu > i')).toHaveClass(/fa-file-pen/);
 for(const [rel,size] of [['icon',16],['icon',32],['apple-touch-icon',180]]){
  const href=await page.locator(`link[rel="${rel}"][sizes="${size}x${size}"]`).getAttribute('href');
  expect((await page.request.get('/'+href)).status()).toBe(200);
  expect(await page.evaluate(src=>new Promise(resolve=>{const i=new Image();i.onload=()=>resolve([i.naturalWidth,i.naturalHeight]);i.onerror=()=>resolve([]);i.src=src;}),href)).toEqual([size,size]);
 }
 await page.evaluate(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));
 await page.reload();
 await page.screenshot({path:`tests/artifacts/${info.project.name}-brand.png`,fullPage:true,scale:'css',animations:'disabled'});
 for(const [button,scene] of [['#btn-oyun-modulu','#scene-crossroads'],['#btn-deney-modulu','#lab-view'],['#btn-yazili-modulu','#scene-yazili']]){
  await page.locator(button).click();await expect(page.locator(scene)).toBeVisible();
  await page.goBack();await expect(page.locator('#scene-home')).toBeVisible();
  await page.goForward();await expect(page.locator(scene)).toBeVisible();
  await page.locator('#site-logo-link').click();await expect(page.locator('#scene-home')).toBeVisible();
 }
});

 test('Kök ICO uyumluluk dosyası gerçek ICO ve doğru MIME ile sunulur', async ({page})=>{
 await page.goto('/');
 const link=page.locator('link[rel="icon"][type="image/x-icon"]');
 await expect(link).toHaveCount(1);
 const response=await page.request.get(await link.getAttribute('href'));
 expect(response.status()).toBe(200);
 expect(response.headers()['content-type']).toMatch(/image\/(x-icon|vnd.microsoft.icon)/);
 const data=await response.body();
 expect([...data.subarray(0,4)]).toEqual([0,0,1,0]);
 expect(data.readUInt16LE(4)).toBe(6);
 expect((await page.request.get('/apple-touch-icon.png')).headers()['content-type']).toContain('image/png');
 await expect(page.locator('meta[name="apple-mobile-web-app-title"]')).toHaveAttribute('content', 'FenUp X');
 await expect(page.locator('meta[name="application-name"]')).toHaveAttribute('content', 'FenUp X');
});

test('Mobil alt bilgi (footer) bilgilendirme açılır butonu ve erişilebilirlik', async ({page}, info)=>{
 await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
 await page.goto('/');
 const isMobile = (page.viewportSize()?.width || 1000) <= 768;
 if (isMobile) {
  const toggle = page.locator('#btn-mobile-menu');
  await expect(toggle).toBeVisible();
  await toggle.click();
  const mobileFooter = page.locator('#header-navigation .mobile-nav-footer-section');
  await expect(mobileFooter).toBeVisible();
  await expect(mobileFooter.locator('.btn-kvkk-open')).toBeVisible();
 } else {
  const dropdown = page.locator('#footer-info-dropdown');
  await expect(dropdown).toBeVisible();
  await expect(page.locator('.policy-links .btn-kvkk-open')).toBeVisible();
 }
});
