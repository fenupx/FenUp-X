const decoder=new TextDecoder(),encoder=new TextEncoder();
const decode64=value=>Uint8Array.from(atob(value.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));
let keyLoad;
let keys,keysUntil=0,keysFetched=0,serviceToken,serviceUntil=0;
export async function verifyFirebaseToken(token,projectId,{emulator=false}={}) {
 if(typeof token!=='string'||token.length>16000)throw Error('unauthenticated');
 const parts=token.split('.');if(parts.length!==3)throw Error('unauthenticated');
 let header,claims;try{header=JSON.parse(decoder.decode(decode64(parts[0])));claims=JSON.parse(decoder.decode(decode64(parts[1])));}catch{throw Error('unauthenticated');}
 const now=Date.now()/1000;
 if(claims.aud!==projectId||claims.iss!==`https://securetoken.google.com/${projectId}`||typeof claims.sub!=='string'||!claims.sub||claims.sub.length>128||claims.sub.includes('/')||!Number.isFinite(claims.exp)||claims.exp<=now||!Number.isFinite(claims.iat)||claims.iat>now+5||!Number.isFinite(claims.auth_time)||claims.auth_time>now+5)throw Error('unauthenticated');
 if(emulator){if(projectId!=='demo-fenupx')throw Error('emulator-project-mismatch');return claims;}
 if(header.alg!=='RS256'||typeof header.kid!=='string'||header.kid.length>256)throw Error('unauthenticated');
 if(!keys||Date.now()>=keysUntil){
  if(!keyLoad)keyLoad=(async()=>{
   const r=await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');if(!r.ok)throw Error('authentication-unavailable');
   const body=await r.json();keys=new Map((body.keys||[]).map(k=>[k.kid,k]));
   const seconds=Math.min(86400,Number(r.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1] || 3600));keysUntil=Date.now()+seconds*1000;
  })().finally(()=>{keyLoad=undefined;});
  await keyLoad;
 }
 const jwk=keys.get(header.kid);if(!jwk)throw Error('unauthenticated');
 const key=await crypto.subtle.importKey('jwk',jwk,{name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'},false,['verify']);
 if(!await crypto.subtle.verify('RSASSA-PKCS1-v1_5',key,decode64(parts[2]),encoder.encode(parts[0]+'.'+parts[1])))throw Error('unauthenticated');
 return claims;
}
export async function getServiceToken(env,emulator=false) {
 if(serviceToken&&Date.now()<serviceUntil)return serviceToken;
 let credential;try{credential=JSON.parse(env.FIREBASE_SERVICE_CREDENTIAL);}catch{throw Error('service-not-configured');}
 if(!credential.email||!credential.password||!credential.uid)throw Error('service-not-configured');
 const base=emulator?'http://127.0.0.1:9098/identitytoolkit.googleapis.com':'https://identitytoolkit.googleapis.com';
 const r=await fetch(`${base}/v1/accounts:signInWithPassword?key=${encodeURIComponent(env.FIREBASE_API_KEY)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:credential.email,password:credential.password,returnSecureToken:true})});
 const result=await r.json();if(!r.ok||result.localId!==credential.uid)throw Error('service-authentication-failed');
 serviceToken=result.idToken;serviceUntil=Date.now()+Math.min(3300,Number(result.expiresIn)-60)*1000;return serviceToken;
}
