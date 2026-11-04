import data from './question-banks.mjs';
import { randomInt, randomUUID } from 'node:crypto';
export const banks=new Map(Object.entries(data));
export function shuffled(items) {
 const list=[...items];for(let i=list.length-1;i>0;i--){const j=randomInt(i+1);[list[i],list[j]]=[list[j],list[i]];}return list;
}
export function unitPool(grade,unit) { return (banks.get(grade)||[]).filter(q=>String(q.unit)===String(unit)); }
export function chooseQuestions(grade,unit) {
 const pool=unitPool(grade,unit),counts=[4,4,2];
 const selected=counts.flatMap((count,i)=>shuffled(pool.filter(q=>Number(q.difficulty)===i+1)).slice(0,count));
 if(selected.length!==10)throw Error('question-pool-unavailable');
 return selected.map(prepareQuestion);
}
export function prepareQuestion(q) {
 return {key:q.key,question:q.question,hint:q.hint || '',difficulty:Number(q.difficulty),options:shuffled(q.answerOptions.map(o=>({id:randomUUID(),text:o.text,correct:o.isCorrect===true})))};
}
