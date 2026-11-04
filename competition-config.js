// Enable only after trusted Worker + Firestore rules pass a production test.
// Free plans only; annual promotion deliberately stays disabled.
export const COMPETITION_BACKEND_READY = true;
export const COMPETITION_API_URL = 'https://fenupx-score.mistralx-rk.workers.dev';
export const ANNUAL_PROMOTION_ENABLED = false;
export function competitionYear(now = new Date()) {
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
    return Number(p.year)-(Number(p.month)<9?1:0);
}

export function competitionPeriods(now = new Date()) {
    const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
    const d=new Date(Date.UTC(Number(p.year),Number(p.month)-1,Number(p.day)));
    d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));
    const week=Math.ceil(((d-new Date(Date.UTC(d.getUTCFullYear(),0,1)))/86400000+1)/7);
    return {weekId:`${d.getUTCFullYear()}-W${week}`,monthId:`${p.year}-${p.month}`};
}
