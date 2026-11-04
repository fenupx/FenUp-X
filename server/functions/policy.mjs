export const GRADES = ['5', '6', '7', '8'];
export const validGrade = value => typeof value === 'string' && GRADES.includes(value);
export function schoolYear(now = new Date()) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
    return Number(parts.year) - (Number(parts.month) < 9 ? 1 : 0);
}
export function promote(profile, year) {
    if (!validGrade(profile.grade) || !Number.isInteger(profile.schoolYear) || profile.schoolYear >= year || profile.graduated) return null;
    // One atomic catch-up, capped at graduation; never invent grade 9.
    const next = Number(profile.grade) + year - profile.schoolYear;
    return { grade: next > 8 ? '8' : String(next), schoolYear:year, graduated:next > 8 };
}
export function requireCompetition(profile, user, grade, year) {
    if (user.role !== 'student' && user.role !== 'ogrenci' && user.role !== 'öğrenci') throw new Error('student-required');
    if (user.isBanned || !validGrade(grade) || profile.graduated || profile.grade !== grade || profile.schoolYear !== year || String(user.sinif) !== profile.grade) throw new Error('cohort-mismatch');
}

export function periodIds(now = new Date()) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
    const d=new Date(Date.UTC(Number(parts.year),Number(parts.month)-1,Number(parts.day)));
    d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));
    const week=Math.ceil(((d-new Date(Date.UTC(d.getUTCFullYear(),0,1)))/86400000+1)/7);
    return {weekId:`${d.getUTCFullYear()}-W${week}`,monthId:`${parts.year}-${parts.month}`};
}
