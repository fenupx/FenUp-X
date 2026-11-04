import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const banks={};
for (const grade of ['5','6','7','8']) {
 const raw=JSON.parse(readFileSync(new URL(`../${grade}_sinif_sorular.json`,import.meta.url)));
 banks[grade]=(raw.questions||raw).map(q=>({...q,key:createHash('sha256').update(JSON.stringify(q)).digest('hex').slice(0,24)}));
}
writeFileSync(new URL('functions/question-banks.mjs',import.meta.url),'// Generated from the canonical repository question pools.\nexport default '+JSON.stringify(banks)+';\n');
