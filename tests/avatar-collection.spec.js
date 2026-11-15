import {test,expect} from '@playwright/test';
import {mockFirebase} from './helpers/firebase-mock.js';
const legacySvg='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g_av_bilim_einstein"/></defs></svg>');
async function setup(page,avatar=legacySvg){
 await mockFirebase(page);
 await page.evaluate(async avatar=>{const {competitionPeriods,competitionYear}=await import('/competition-config.js');const {weekId,monthId}=competitionPeriods();window.__records={s:{uid:'s',name:'Test',surname:'Student',nickname:'TestCaptain',role:'student',sinif:'5',avatar,totalScore:120,schoolYear:competitionYear(),grade:'5',score:300,weeklyScore:300,weekId,monthlyScore:300,monthId,isBanned:false}};await window.__login('s');},avatar);
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
 await expect(dialog.locator('.avatar-tab-btn')).toHaveCount(5);
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
 for(const [cat,n] of [['bilim',6],['hayvanlar',6],['uzay',6],['sporcular',16],['ogrenciler',18]]){await dialog.locator(`[data-category="${cat}"]`).click();await expect(dialog.locator('.avatar-item')).toHaveCount(n);}
 await dialog.locator('[data-category="bilim"]').focus();await page.keyboard.press('Enter');await expect(dialog.locator('[data-category="bilim"]')).toHaveAttribute('aria-pressed','true');
 await dialog.getByRole('button',{name:'Nüzhet Gökdoğan',exact:true}).focus();await page.keyboard.press('Space');await expect(dialog.locator('#avatar-draft-name')).toHaveText('Nüzhet Gökdoğan');
 await page.evaluate(()=>window.__fail=true);await dialog.locator('#avatar-picker-save').click();await expect(dialog.locator('#avatar-picker-status')).toContainText('kaydedilemedi');await expect(dialog).toBeVisible();expect(await page.evaluate(()=>window.__records.s.avatar)).toBe('av_ogrenci_genc_kiz');
 await page.evaluate(()=>window.__fail=false);await dialog.locator('#avatar-picker-save').click();await expect(dialog).toBeHidden();
 await page.locator('#btn-open-avatar-selector').click();await page.keyboard.press('Escape');await expect(dialog).toBeHidden();await expect(page.locator('#btn-open-avatar-selector')).toBeFocused();
});
test('every legacy ID and SVG resolves, unknown values fall back, and no gallery loads on startup',async({page})=>{
 const requests=[];page.on('request',r=>{if(r.url().includes('/assets/avatars/'))requests.push(r.url());});await mockFirebase(page);
 const result=await page.evaluate(async()=>{const a=await import('/avatar-catalog.js');const ids=new Set(a.AVATARS.map(x=>x.id));return {count:a.AVATARS.length,uniqueCount:ids.size,categories:a.AVATARS.reduce((m,a)=>(m[a.category]=(m[a.category]||0)+1,m),{}),legacy:Object.entries(a.LEGACY_AVATAR_IDS).every(([id,target])=>a.resolveAvatarId(id)===target&&a.resolveAvatarId('data:image/svg+xml,'+encodeURIComponent(`<svg><linearGradient id="g_${id}"/></svg>`))===target),fallback:a.resolveAvatarId('javascript:alert(1)')===a.DEFAULT_AVATAR_ID};});
 expect(result).toEqual({count:52,uniqueCount:52,categories:{ogrenciler:18,bilim:6,hayvanlar:6,uzay:6,sporcular:16},legacy:true,fallback:true});expect(new Set(requests).size).toBeLessThanOrEqual(2);await expect(page.locator('.avatar-item')).toHaveCount(0);
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
 const m=await measure();expect(m.width).toBe(m.height);expect([34,45]).toContain(m.width);expect(m).toMatchObject({round:'50%',loaded:true});
 await page.evaluate(()=>{window.__records.s.avatar='fenupx-v2-gokdogan';});
 await page.locator('.lb-tab-btn[data-tab="alltime"]').click();await expect(page.locator('.global-lb-avatar')).toHaveAttribute('src',/gokdogan-96.webp/);expect((await measure()).loaded).toBe(true);
 await page.screenshot({path:`tests/artifacts/avatar-leaderboard-${info.project.name}.png`});
});

test('all 108 optimized variants, 16 Meşhur Sporcular 192x192 WebPs, and old-client image URLs decode without loading original PNGs',async({page},info)=>{
 test.skip(!['mobile-safari-iphone-390','desktop-1366','desktop-firefox'].includes(info.project.name),'Decode engines covered once each');await mockFirebase(page);
 const result=await page.evaluate(async()=>{
  const {AVATARS,avatarUrl,resolveAvatarId}=await import('/avatar-catalog.js');
  const core=AVATARS.filter(a=>a.category!=='sporcular');
  const sports=AVATARS.filter(a=>a.category==='sporcular');
  const files=core.flatMap(a=>[96,192,384].map(n=>({url:avatarUrl(a.id,n),size:n})));
  files.push(...core.map(a=>({url:'/'+a.id,size:192})));
  files.push(...sports.map(a=>({url:avatarUrl(a.id),size:192})));
  await Promise.all(files.map(async f=>{const img=new Image();img.src=f.url;await img.decode();if(img.naturalWidth!==f.size||img.naturalHeight!==f.size)throw Error('Unexpected size '+f.url);}));
  return {decoded:files.length,sportsDecoded:sports.length,oldClientUrls:AVATARS.every(a=>resolveAvatarId(location.origin+'/'+a.id)===a.id&&resolveAvatarId(avatarUrl(a.id))===a.id)};
 });
 expect(result).toEqual({decoded:160,sportsDecoded:16,oldClientUrls:true});
});

test('Meşhur Sporcular collection renders 16 athletes, Messi CC BY 4.0 attribution, and persists selection to profile and leaderboard',async({page},info)=>{
 await setup(page,'av_hayvan_owl');
 const dialog=page.locator('#avatar-selector-container');
 await dialog.locator('[data-category="sporcular"]').click();
 await expect(dialog.locator('.avatar-item')).toHaveCount(16);
 await expect(dialog.locator('#avatar-credit-box')).toBeVisible();
 await expect(dialog.locator('#avatar-credit-box')).toContainText('Tasnim News Agency');
 await expect(dialog.locator('#avatar-credit-box')).toContainText('CC BY 4.0');
 await expect(dialog.locator('#avatar-credit-box a').first()).toHaveAttribute('href','https://commons.wikimedia.org/wiki/File:Lionel-Messi-Argentina-2022-FIFA-World-Cup_(cropped).jpg');
 await expect(dialog.locator('#avatar-credit-box a').nth(1)).toHaveAttribute('href','https://creativecommons.org/licenses/by/4.0/');
 const gridCheck=await dialog.evaluate(async d=>{
  const items=[...d.querySelectorAll('.avatar-item')];
  for(const b of items){const img=b.querySelector('img');img.loading='eager';await img.decode();}
  return items.map(b=>{
   const img=b.querySelector('img'),span=b.querySelector('span');
   return {id:b.dataset.avatarId,name:span.textContent,src:img.currentSrc||img.src,naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,round:getComputedStyle(img).borderRadius,overflowX:b.scrollWidth>b.clientWidth+1};
  });
 });
 expect(gridCheck).toHaveLength(16);
 expect(gridCheck.every(i=>i.naturalWidth===192&&i.naturalHeight===192&&i.round==='50%'&&!i.overflowX)).toBe(true);
 expect(gridCheck.find(i=>i.id==='fenupx-v2-lionel-messi')).toMatchObject({name:'Lionel Messi',src:expect.stringMatching(/lionel-messi-192\.webp/)});
 expect(gridCheck.find(i=>i.id==='fenupx-v2-gizem-orge')).toMatchObject({name:'Gizem Örge',src:expect.stringMatching(/gizem-orge-192\.webp/)});
 expect(gridCheck.find(i=>i.id==='fenupx-v2-victor-osimhen')).toMatchObject({name:'Victor Osimhen',src:expect.stringMatching(/victor-osimhen-192\.webp/)});
 await dialog.getByRole('button',{name:'Lionel Messi',exact:true}).focus();
 await page.keyboard.press('Enter');
 await expect(dialog.locator('#avatar-draft-name')).toHaveText('Lionel Messi');
 await expect(dialog.locator('#avatar-draft-meta')).toContainText('Tasnim News Agency');
 await dialog.getByRole('button',{name:'Victor Osimhen',exact:true}).click();
 await expect(dialog.locator('#avatar-draft-name')).toHaveText('Victor Osimhen');
 await expect(dialog.locator('#avatar-draft-preview')).toHaveAttribute('src',/victor-osimhen-192\.webp/);
 await page.screenshot({path:`tests/artifacts/avatar-sporcular-${info.project.name}.png`});
 await dialog.locator('#avatar-picker-save').click();
 await expect(dialog).toBeHidden();
 await expect(page.locator('#p-current-avatar')).toHaveAttribute('src',/victor-osimhen-192\.webp/);
 expect(await page.evaluate(()=>window.__writes)).toEqual([{uid:'s',data:{avatar:'fenupx-v2-victor-osimhen'}}]);
 await page.reload();
 await page.waitForFunction(()=>window.__login&&document.querySelector('.profile-img-header')?.src.includes('victor-osimhen-192.webp'));
 expect(await page.evaluate(()=>window.__records.s.avatar)).toBe('fenupx-v2-victor-osimhen');
 if(await page.locator('#btn-mobile-menu').isVisible())await page.locator('#btn-mobile-menu').click();
 await page.locator('#btn-oyun-modulu').click();await page.locator('#btn-mode-bireysel').click();await page.locator('#btn-skip-draw').click();await page.locator('.class-card[data-grade="5"]').click();
 await expect(page.locator('.global-lb-avatar')).toHaveAttribute('src',/victor-osimhen-192\.webp/);
});
