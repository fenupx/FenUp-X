// Intentionally discard request objects/headers: they can contain bearer tokens.
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const child=spawn(process.execPath,[fileURLToPath(new URL('./node_modules/wrangler/bin/wrangler.js',import.meta.url)),'tail','--config',fileURLToPath(new URL('./wrangler.jsonc',import.meta.url)),'--format','json'],{stdio:['ignore','pipe','pipe']});
let buffer='',depth=0,quoted=false,escaped=false;
child.stdout.on('data',chunk=>{for(const c of String(chunk)){
 if(!depth&&c!=='{')continue;buffer+=c;
 if(quoted){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c==='"')quoted=false;}
 else if(c==='"')quoted=true;else if(c==='{')depth++;else if(c==='}')depth--;
 if(!depth){try{const e=JSON.parse(buffer);console.log(JSON.stringify({outcome:e.outcome,cpuTimeMs:e.cpuTimeMs,wallTimeMs:e.wallTimeMs,exceptions:e.exceptions?.map(x=>x.message),logs:e.logs?.map(x=>x.message)}));}catch{}buffer='';}
}});
child.stderr.on('data',()=>{});process.on('SIGINT',()=>child.kill());process.on('SIGTERM',()=>child.kill());
