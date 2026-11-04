// A small Firestore REST transaction adapter. All access is server-side; browser
// credentials never authorize database writes through this privileged identity.
const encode = value => {
 if(value===null)return {nullValue:null};
 if(value instanceof Date)return {timestampValue:value.toISOString()};
 if(Array.isArray(value))return {arrayValue:{values:value.map(encode)}};
 if(typeof value==='object')return {mapValue:{fields:Object.fromEntries(Object.entries(value).map(([k,v])=>[k,encode(v)]))}};
 if(typeof value==='boolean')return {booleanValue:value};
 if(typeof value==='number')return Number.isSafeInteger(value)?{integerValue:String(value)}:{doubleValue:value};
 if(typeof value==='string')return {stringValue:value};
 throw Error('unsupported-database-value');
};
const decode = v => {
 if('nullValue'in v)return null;if('timestampValue'in v)return new Date(v.timestampValue);
 if('integerValue'in v)return Number(v.integerValue);if('doubleValue'in v)return v.doubleValue;
 if('stringValue'in v)return v.stringValue;if('booleanValue'in v)return v.booleanValue;
 if('arrayValue'in v)return (v.arrayValue.values||[]).map(decode);
 if('mapValue'in v)return Object.fromEntries(Object.entries(v.mapValue.fields||{}).map(([k,x])=>[k,decode(x)]));
 throw Error('unsupported-database-value');
};
const fieldPath=k=>/^[A-Za-z_][A-Za-z0-9_]*$/.test(k)?k:'`'+k.replaceAll('\\','\\\\').replaceAll('`','\\`')+'`';
export class FirestoreRest {
 constructor({projectId,token,baseURL='https://firestore.googleapis.com/v1',fetcher=fetch}){this.projectId=projectId;this.token=token;this.fetch=fetcher.bind(globalThis);this.database=`projects/${projectId}/databases/(default)`;this.base=baseURL.replace(/\/$/,'');}
 doc(path){if(typeof path!=='string'||path.split('/').some(p=>!p||p==='.'||p==='..')||path.split('/').length%2)throw Error('invalid-document-path');return {path,name:`${this.database}/documents/${path}`};}
 collection(path){return {doc:(id=crypto.randomUUID())=>this.doc(`${path}/${id}`)};}
 async api(path,method='POST',body){
  const response=await this.fetch(`${this.base}/${path}`,{method,headers:{Authorization:`Bearer ${await this.token()}`,'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
  const text=await response.text();let json={};try{json=text?JSON.parse(text):{};}catch{throw Error('database-response-invalid');}
  if(!response.ok){const error=Error(json.error?.status||'database-request-failed');error.status=response.status;error.operation=path.includes(':')?path.split(':').pop().split('?')[0]:'document-read';throw error;}
  return json;
 }
 async runTransaction(fn){
  for(let attempt=0;attempt<5;attempt++){
   const {transaction}=await this.api(`${this.database}/documents:beginTransaction`,'POST',{options:{readWrite:{}}});
   const writes=[];
   const tx={
    get:async ref=>{
     const rows=await this.api(`${this.database}/documents:batchGet`,'POST',{documents:[ref.name],transaction});
     const raw=(Array.isArray(rows)?rows:[rows]).find(row=>row.found)?.found;
     if(!raw)return {exists:false,data:()=>undefined};
     const data=Object.fromEntries(Object.entries(raw.fields||{}).map(([k,v])=>[k,decode(v)]));
     return {exists:true,data:()=>data};
    },
    create:(ref,data)=>writes.push({update:{name:ref.name,fields:encode(data).mapValue.fields},currentDocument:{exists:false}}),
    set:(ref,data,options)=>writes.push({update:{name:ref.name,fields:encode(data).mapValue.fields},...(options?.merge?{updateMask:{fieldPaths:Object.keys(data).map(fieldPath)}}:{})}),
    update:(ref,data)=>writes.push({update:{name:ref.name,fields:encode(data).mapValue.fields},updateMask:{fieldPaths:Object.keys(data).map(fieldPath)},currentDocument:{exists:true}}),
    delete:ref=>writes.push({delete:ref.name})
   };
   try {
    const result=await fn(tx);
    if(writes.length)await this.api(`${this.database}/documents:commit`,'POST',{transaction,writes});
    else await this.api(`${this.database}/documents:rollback`,'POST',{transaction});
    return result;
   }catch(e){
    try{await this.api(`${this.database}/documents:rollback`,'POST',{transaction});}catch{}
    if((e.status===409||e.message==='ABORTED')&&attempt<4){await new Promise(r=>setTimeout(r,20*(attempt+1)));continue;}
    throw e;
   }
  }
 }
}
