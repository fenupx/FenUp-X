// Owner-operated one-time setup. Credentials stay in memory and go only to the
// existing Firebase Auth project and the official Wrangler secret command.
import {createRequire} from 'node:module';
import {randomBytes} from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {initializeApp,deleteApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {FirestoreRest} from './worker/firestore-rest.mjs';
if(!process.argv.includes('--confirmed-free-plan'))throw Error('Verify Workers Current plan: Free in the official dashboard first.');
const require=createRequire(import.meta.url),cli=require('firebase-tools/lib/auth.js');
const account=cli.getGlobalDefaultAccount();if(!account)throw Error('Firebase CLI login required');
const token=await cli.getAccessToken(account.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform']);
const billing=await fetch('https://cloudbilling.googleapis.com/v1/projects/fenup-x/billingInfo',{headers:{Authorization:`Bearer ${token.access_token}`}});
if(!billing.ok||(await billing.json()).billingEnabled!==false)throw Error('Expected Firebase billing disabled; setup stopped.');
const app=initializeApp({projectId:'fenup-x',credential:{getAccessToken:async()=>({access_token:token.access_token,expires_in:3600})}});
const auth=getAuth(app),uid='fenupx-score-worker';
try{
 let existing;try{existing=await auth.getUser(uid);}catch(e){if(e.code!=='auth/user-not-found')throw e;}
 if(existing)throw Error('Service identity already exists. Inspect prior setup; do not silently rotate its credentials.');
 const password=randomBytes(36).toString('base64url');
 const user=await auth.createUser({uid,email:'score-worker@service.fenupx.invalid',password,emailVerified:true,displayName:'FenUp X Score Service'});
 const db=new FirestoreRest({projectId:'fenup-x',token:async()=>token.access_token});
 await db.runTransaction(async tx=>{tx.create(db.doc(`internalServiceIdentities/${uid}`),{enabled:true,purpose:'competition-score',createdAt:new Date()});});
 const child=spawn(process.execPath,[fileURLToPath(new URL('./worker/node_modules/wrangler/bin/wrangler.js',import.meta.url)),'secret','put','FIREBASE_SERVICE_CREDENTIAL','--config',fileURLToPath(new URL('./worker/wrangler.jsonc',import.meta.url)),'--env',''],{stdio:['pipe','pipe','pipe']});
 child.stdin.end(JSON.stringify({uid,email:user.email,password}));
 // Do not echo CLI input or credential-bearing debug output.
 let diagnostic='';child.stdout.on('data',d=>{diagnostic+=d;});child.stderr.on('data',d=>{diagnostic+=d;});
 const exit=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('exit',resolve);});
 if(exit!==0){await db.runTransaction(async tx=>tx.update(db.doc(`internalServiceIdentities/${uid}`),{enabled:false}));throw Error('Secret upload failed; service registry disabled. Inspect official Wrangler logs privately.');}
 console.log(JSON.stringify({project:'fenup-x',serviceIdentity:uid,registryEnabled:true,secretUploaded:true,billingEnabled:false,studentRecordsChanged:0}));
}finally{await deleteApp(app);}
