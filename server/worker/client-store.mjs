// Use Firebase's supported optimistic client transactions. Unlike IAM server
// transactions, these run with a Firebase ID token and remain subject to Rules.
import {initializeApp} from 'firebase/app';
import {initializeAuth,inMemoryPersistence,signInWithEmailAndPassword,connectAuthEmulator} from 'firebase/auth';
import {setLogLevel,getFirestore,connectFirestoreEmulator,doc,runTransaction} from 'firebase/firestore/lite';
import {FirestoreRest} from './firestore-rest.mjs';
let initialization;
export async function getClientStore(env,emulator){
 if(!initialization)initialization=(async()=>{
  setLogLevel('silent');
  let credential;try{credential=JSON.parse(env.FIREBASE_SERVICE_CREDENTIAL);}catch{throw Error('service-not-configured');}
  const app=initializeApp({apiKey:env.FIREBASE_API_KEY,projectId:env.FIREBASE_PROJECT_ID},'score-service');
  const auth=initializeAuth(app,{persistence:inMemoryPersistence});const firestore=getFirestore(app);
  if(emulator){connectAuthEmulator(auth,'http://127.0.0.1:9098',{disableWarnings:true});connectFirestoreEmulator(firestore,'127.0.0.1',8188);}
  const {user}=await signInWithEmailAndPassword(auth,credential.email,credential.password);
  if(user.uid!==credential.uid)throw Error('service-authentication-failed');
  const rest=new FirestoreRest({projectId:env.FIREBASE_PROJECT_ID,token:()=>user.getIdToken(),...(emulator?{baseURL:'http://127.0.0.1:8188/v1'}:{})});
  rest.runTransaction=fn=>runTransaction(firestore,async transaction=>{
   const reads=new Map(),writes=[];
   const get=async ref=>{
    if(!reads.has(ref.path))reads.set(ref.path,transaction.get(doc(firestore,ref.path)));
    const snap=await reads.get(ref.path);return {exists:snap.exists(),data:()=>snap.data()};
   };
   const result=await fn({get,create:(ref,data)=>writes.push({kind:'create',ref,data}),set:(ref,data,options)=>writes.push({kind:'set',ref,data,options}),update:(ref,data)=>writes.push({kind:'update',ref,data}),delete:ref=>writes.push({kind:'delete',ref})});
   for(const write of writes)if(write.kind==='create'&&(await get(write.ref)).exists)throw Error('document-already-exists');
   for(const write of writes){const ref=doc(firestore,write.ref.path);
    if(write.kind==='delete')transaction.delete(ref);
    else if(write.kind==='update')transaction.update(ref,write.data);
    else if(write.options)transaction.set(ref,write.data,write.options);
    else transaction.set(ref,write.data);
   }
   return result;
  });
  return rest;
 })().catch(e=>{initialization=undefined;throw e;});
 return initialization;
}
