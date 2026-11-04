// Owner-operated synthetic production verification, never a real student's profile.
if(!process.argv.includes('--production'))throw Error('Use --production only for an authorized synthetic account test.');
const fs=require('node:fs'),{createRequire}=require('node:module'),{randomUUID,randomBytes}=require('node:crypto');
const server=createRequire(require('node:path').resolve('server/package.json'));
const cli=server('firebase-tools/lib/auth.js'),{initializeApp,deleteApp}=server('firebase-admin/app'),{getAuth}=server('firebase-admin/auth');
const {chromium,webkit}=require('@playwright/test');
(async()=>{
 const {FirestoreRest}=await import('../server/worker/firestore-rest.mjs');
 const owner=cli.getGlobalDefaultAccount();if(!owner)throw Error('Firebase CLI owner sign-in required');
 const token=await cli.getAccessToken(owner.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform']);
 const app=initializeApp({projectId:'fenup-x',credential:{getAccessToken:async()=>({access_token:token.access_token,expires_in:3600})}});
 const auth=getAuth(app),db=new FirestoreRest({projectId:'fenup-x',token:async()=>token.access_token});
 const uid='avatar-test-'+randomUUID(),email=uid+'@example.invalid',password=randomBytes(24).toString('base64url');
 let browser;try{
  await auth.createUser({uid,email,password,emailVerified:true});
  await db.runTransaction(async tx=>tx.create(db.doc('users/'+uid),{name:'Avatar',surname:'Test',nickname:'AvatarTest',role:'student',sinif:'5',totalScore:120,isBanned:false,avatar:'av_hayvan_owl'}));
  const engine=process.env.AVATAR_BROWSER==='webkit'?webkit:chromium;
  browser=await engine.launch();const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await context.newPage();page.setDefaultTimeout(20000);
  await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));
  await page.route('**/script.js*',async route=>{
   let source=await (await route.fetch()).text();if(source!==fs.readFileSync('script.js','utf8'))throw Error('Published script differs from committed source');
   source=source.replace('const db = getFirestore(app);',`const db = getFirestore(app);await signInWithEmailAndPassword(auth,${JSON.stringify(email)},${JSON.stringify(password)});`);
   return route.fulfill({contentType:'text/javascript',body:source});
  });
  await page.goto('https://fenupx.com/');await page.waitForFunction(()=>document.querySelector('.profile-img-header')?.src.includes('owl-192.webp'));
  const open=async()=>{if(await page.locator('#btn-mobile-menu').isVisible())await page.locator('#btn-mobile-menu').click();await page.locator('#btn-uyelik').click();await page.locator('#btn-open-profile').click();await page.locator('#btn-open-avatar-selector').click();};
  await open();const dialog=page.locator('#avatar-selector-container');
  await dialog.locator('[data-category="bilim"]').click();await dialog.getByRole('button',{name:'Nüzhet Gökdoğan',exact:true}).click();
  await dialog.locator('#avatar-picker-cancel').click();
  let snapshot=await db.runTransaction(tx=>tx.get(db.doc('users/'+uid)));if(snapshot.data().avatar!=='av_hayvan_owl')throw Error('Cancel wrote data');
  await page.locator('#btn-open-avatar-selector').click();await dialog.locator('[data-category="bilim"]').click();await dialog.getByRole('button',{name:'Nüzhet Gökdoğan',exact:true}).click();await dialog.locator('#avatar-picker-save').click();await dialog.waitFor({state:'hidden'});
  snapshot=await db.runTransaction(tx=>tx.get(db.doc('users/'+uid)));const data=snapshot.data();if(data.avatar!=='fenupx-v2-gokdogan'||data.sinif!=='5'||data.totalScore!==120||data.role!=='student')throw Error('Unexpected profile mutation');
  await page.reload();await page.waitForFunction(()=>document.querySelector('.profile-img-header')?.src.includes('gokdogan-192.webp'));
  await open();await page.getByRole('button',{name:'Nüzhet Gökdoğan',exact:true}).waitFor();if(await dialog.locator('.avatar-item.selected').getAttribute('data-avatar-id')!=='fenupx-v2-gokdogan')throw Error('Selected state not preserved');
  await page.locator('#avatar-draft-preview').evaluate(i=>i.decode());await page.screenshot({path:'tests/artifacts/avatar-live-'+(process.env.AVATAR_BROWSER||'chromium')+'.png'});
  console.log(JSON.stringify({production:true,syntheticAccountOnly:true,cancelDidNotWrite:true,savedPermanentId:'fenupx-v2-gokdogan',reloadPreserved:true,legacyImageResolved:true,role:'student',classPreserved:'5',scorePreserved:120,browser:process.env.AVATAR_BROWSER||'chromium'}));
 }finally{
  if(browser)await browser.close();
  await db.api(`${db.database}/documents:commit`,'POST',{writes:[{delete:db.doc('users/'+uid).name},{delete:db.doc('competitionProfiles/'+uid).name}]});
  try{await auth.deleteUser(uid);}catch(e){if(e.code!=='auth/user-not-found')throw e;}
  await deleteApp(app);console.log('Only synthetic avatar test data cleaned.');
 }
})().catch(e=>{console.error(e.message);process.exitCode=1;});
