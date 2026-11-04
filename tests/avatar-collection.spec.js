import {test,expect} from '@playwright/test';
import {mockFirebase} from './helpers/firebase-mock.js';
const legacySvg='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g_av_bilim_einstein"/></defs></svg>');
async function setup(page,avatar=legacySvg){
 await mockFirebase(page);
 await page.evaluate(async avatar=>{window.__records={s:{uid:'s',name:'Test',surname:'Student',nickname:'TestCaptain',role:'student',sinif:'5',avatar,totalScore:120,schoolYear:2026,grade:'5',score:300,weeklyScore:300,weekId:'2026-W45',monthlyScore:300,monthId:'2026-11',isBanned:false}};await window.__login('s');},avatar);
 // Open the real profile through its existing menu control.
 if(await page.locator('#btn-mobile-menu').isVisible())await page.locator('#btn-mobile-menu').click();
 await page.locator('#btn-uyelik').click();
 await page.locator('#btn-open-profile').click();
 await page.locator('#btn-open-avatar-selector').click();
 await expect(page.locator('#avatar-selector-container')).toBeVisible();
}
test('selection previews, cancels, saves permanent ID and survives reload without class/score writes',async({page})=>{
 const requests=[];page.on('request',r=>{if(r.url().includes('/assets/avatars/'))requests.push(r.url());});
 await setup(page);
 const dialog=page.locator('#avatar-selector-container');
 await expect(dialog.locator('.avatar-tab-btn')).toHaveCount(4);
 await expect(dialog.locator('.avatar-item')).toHaveCount(6); // mapped old Einstein
 await expect(dialog.locator('#avatar-draft-name')).toHaveText('Albert Einstein');
 await expect(dialog.locator('.avatar-item.selected')).toHaveAttribute('data-avatar-id','fenupx-v2-einstein');
 await expect(page.locator('#p-current-avatar')).toHaveAttribute('src',/einstein-192.webp/);
 await dialog.locator('[data-category="ogrenciler"]').click();await expect(dialog.locator('.avatar-item')).toHaveCount(18);
 await dialog.locator('[data-avatar-id="fenupx-v2-g06"]').click();await expect(dialog.locator('#avatar-draft-preview')).toHaveAttribute('src',/g06-192.webp/);
 expect(await page.evaluate(()=>window.__writes)).toEqual([]);
 await dialog.locator('#avatar-picker-cancel').click();
 await expect(page.locator('#p-current-avatar')).toHaveAttribute('src',/einstein-192.webp/);
 await page.locator('#btn-open-avatar-selector').click();
 await dialog.locator('[data-category="hayvanlar"]').click();await expect(dialog.locator('.avatar-item')).toHaveCount(6);
 await dialog.locator('[data-avatar-id="fenupx-v2-otter"]').click();await dialog.locator('#avatar-picker-save').click();
 await expect(dialog).toBeHidden();await expect(page.locator('#p-current-avatar')).toHaveAttribute('src',/otter-192.webp/);
 expect(await page.evaluate(()=>window.__writes)).toEqual([{uid:'s',data:{avatar:'fenupx-v2-otter'}}]);
 expect(await page.evaluate(()=>({grade:window.__records.s.sinif,score:window.__records.s.totalScore}))).toEqual({grade:'5',score:120});
 await page.reload();await page.waitForFunction(()=>window.__login&&document.querySelector('.profile-img-header')?.src.includes('otter-192.webp'));
 expect(await page.evaluate(()=>window.__records.s.avatar)).toBe('fenupx-v2-otter');
 expect(requests.some(u=>u.includes('-384.webp'))).toBe(false);
});
test('responsive controls, keyboard focus, all categories and failed save retain a retryable draft',async({page},info)=>{
 await setup(page,'av_ogrenci_genc_kiz');const dialog=page.locator('#avatar-selector-container');
 const metrics=await dialog.evaluate(d=>{const r=d.getBoundingClientRect(),list=d.querySelector('#avatar-selector');return {width:r.width,right:r.right,bottom:r.bottom,viewportWidth:innerWidth,viewportHeight:innerHeight,overflow:d.scrollHeight>d.clientHeight+2,controls:[...d.querySelectorAll('button')].map(b=>{const r=b.getBoundingClientRect();return {w:r.width,h:r.height};}),listHeight:list.clientHeight,listScroll:list.scrollHeight};});
 expect(metrics.right).toBeLessThanOrEqual(metrics.viewportWidth);expect(metrics.bottom).toBeLessThanOrEqual(metrics.viewportHeight);expect(metrics.overflow).toBe(false);expect(metrics.listHeight).toBeGreaterThan(25);expect(metrics.controls.every(r=>r.w>=47.5&&r.h>=47.5)).toBe(true);
 await page.screenshot({path:`tests/artifacts/avatar-${info.project.name}.png`});
 for(const [cat,n] of [['bilim',6],['hayvanlar',6],['uzay',6],['ogrenciler',18]]){await dialog.locator(`[data-category="${cat}"]`).click();await expect(dialog.locator('.avatar-item')).toHaveCount(n);}
 await dialog.locator('[data-category="bilim"]').focus();await page.keyboard.press('Enter');await expect(dialog.locator('[data-category="bilim"]')).toHaveAttribute('aria-pressed','true');
 await dialog.getByRole('button',{name:'Nüzhet Gökdoğan',exact:true}).focus();await page.keyboard.press('Space');await expect(dialog.locator('#avatar-draft-name')).toHaveText('Nüzhet Gökdoğan');
 await page.evaluate(()=>window.__fail=true);await dialog.locator('#avatar-picker-save').click();await expect(dialog.locator('#avatar-picker-status')).toContainText('kaydedilemedi');await expect(dialog).toBeVisible();expect(await page.evaluate(()=>window.__records.s.avatar)).toBe('av_ogrenci_genc_kiz');
 await page.evaluate(()=>window.__fail=false);await dialog.locator('#avatar-picker-save').click();await expect(dialog).toBeHidden();
 await page.locator('#btn-open-avatar-selector').click();await page.keyboard.press('Escape');await expect(dialog).toBeHidden();await expect(page.locator('#btn-open-avatar-selector')).toBeFocused();
});
test('every legacy ID and SVG resolves, unknown values fall back, and no gallery loads on startup',async({page})=>{
 const requests=[];page.on('request',r=>{if(r.url().includes('/assets/avatars/'))requests.push(r.url());});await mockFirebase(page);
 const result=await page.evaluate(async()=>{const a=await import('/avatar-catalog.js');return {count:a.AVATARS.length,categories:a.AVATARS.reduce((m,a)=>(m[a.category]=(m[a.category]||0)+1,m),{}),legacy:Object.entries(a.LEGACY_AVATAR_IDS).every(([id,target])=>a.resolveAvatarId(id)===target&&a.resolveAvatarId('data:image/svg+xml,'+encodeURIComponent(`<svg><linearGradient id="g_${id}"/></svg>`))===target),fallback:a.resolveAvatarId('javascript:alert(1)')===a.DEFAULT_AVATAR_ID};});
 expect(result).toEqual({count:36,categories:{ogrenciler:18,bilim:6,hayvanlar:6,uzay:6},legacy:true,fallback:true});expect(new Set(requests).size).toBeLessThanOrEqual(2);await expect(page.locator('.avatar-item')).toHaveCount(0);
});

for(const viewport of [{width:844,height:390},{width:740,height:320}])test(`landscape ${viewport.width}x${viewport.height} keeps controls reachable and saves`,async({page},info)=>{
 test.skip(!['mobile-safari-iphone-390','desktop-1366'].includes(info.project.name),'Landscape engines covered once each');await page.setViewportSize(viewport);await setup(page,'fenupx-v2-b01');const dialog=page.locator('#avatar-selector-container');
 await dialog.locator('[data-category="bilim"]').click();await dialog.getByRole('button',{name:'Marie Curie',exact:true}).click();
 for(const id of ['avatar-picker-close','avatar-picker-cancel','avatar-picker-save']){const r=await dialog.locator('#'+id).boundingBox();expect(r.y).toBeGreaterThanOrEqual(0);expect(r.y+r.height).toBeLessThanOrEqual(viewport.height);}
 await page.screenshot({path:`tests/artifacts/avatar-landscape-${info.project.name}-${viewport.width}.png`});await dialog.locator('#avatar-picker-save').click();await expect(dialog).toBeHidden();await page.reload();await page.waitForFunction(()=>document.querySelector('.profile-img-header')?.src.includes('curie-192.webp'));expect(await page.evaluate(()=>window.__records.s.avatar)).toBe('fenupx-v2-curie');
});

test('profile and leaderboard circles display both legacy and new permanent IDs',async({page},info)=>{
 await setup(page,'av_hayvan_owl');await page.locator('#avatar-picker-cancel').click();await page.locator('#close-profile').click();
 await page.locator('#btn-oyun-modulu').click();await page.locator('#btn-mode-bireysel').click();await page.locator('#btn-skip-draw').click();await page.locator('.class-card[data-grade="5"]').click();
 await expect(page.locator('.global-lb-avatar')).toHaveAttribute('src',/owl-96.webp/);
 const measure=async()=>page.locator('.global-lb-avatar').evaluate(async i=>{await i.decode();const r=i.getBoundingClientRect();return {width:r.width,height:r.height,round:getComputedStyle(i).borderRadius,loaded:i.naturalWidth>0};});
 expect(await measure()).toMatchObject({width:45,height:45,round:'50%',loaded:true});
 await page.evaluate(()=>{window.__records.s.avatar='fenupx-v2-gokdogan';});
 await page.locator('.lb-tab-btn[data-tab="alltime"]').click();await expect(page.locator('.global-lb-avatar')).toHaveAttribute('src',/gokdogan-96.webp/);expect((await measure()).loaded).toBe(true);
 await page.screenshot({path:`tests/artifacts/avatar-leaderboard-${info.project.name}.png`});
});

test('all 108 optimized variants and old-client image URLs decode without loading original PNGs',async({page},info)=>{
 test.skip(!['mobile-safari-iphone-390','desktop-1366','desktop-firefox'].includes(info.project.name),'Decode engines covered once each');await mockFirebase(page);
 const result=await page.evaluate(async()=>{const {AVATARS,avatarUrl,resolveAvatarId}=await import('/avatar-catalog.js');const files=AVATARS.flatMap(a=>[96,192,384].map(n=>({url:avatarUrl(a.id,n),size:n})));files.push(...AVATARS.map(a=>({url:'/'+a.id,size:192})));await Promise.all(files.map(async f=>{const img=new Image();img.src=f.url;await img.decode();if(img.naturalWidth!==f.size)throw Error('Unexpected size '+f.url);}));return {decoded:files.length,oldClientUrls:AVATARS.every(a=>resolveAvatarId(location.origin+'/'+a.id)===a.id)};});
 expect(result).toEqual({decoded:144,oldClientUrls:true});
});
