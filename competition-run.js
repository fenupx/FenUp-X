// The browser sends actions/choices, never a numeric competition score.
export class CompetitionRun {
    constructor(call, uid, storage = localStorage) { this.call=call;this.uid=uid;this.storage=storage;this.key=`fenupx_competition_pending_${uid}`;this.state=null;this.pending=null; }
    read() { try{return JSON.parse(this.storage.getItem(this.key)||'null');}catch{return null;} }
    save(value) { try{value?this.storage.setItem(this.key,JSON.stringify(value)):this.storage.removeItem(this.key);}catch{/* The server still keeps its authoritative attempt and receipt. */} }
    async request(data) {
        const pending={uid:this.uid,grade:this.grade,unit:this.unit,attemptId:this.state?.attemptId || data.attemptId || data.startId,pending:data};
        this.pending=data;this.save(pending);
        const state=await this.call('competitionAction',data);
        this.state=state;this.pending=null;
        if(state.done&&state.settlement?.accepted)this.save(null);
        else this.save({...pending,attemptId:state.attemptId,pending:null});
        return state;
    }
    async start(grade,unit) {
        this.grade=grade;this.unit=unit;
        const saved=this.read();
        if(saved?.uid===this.uid && saved.grade===grade && saved.unit===unit) {
            return this.request(saved.pending || {action:'state',attemptId:saved.attemptId});
        }
        return this.request({action:'start',grade,unit,startId:crypto.randomUUID()});
    }
    async action(action,extra={}) {
        if(!this.state)throw Error('Yarışma henüz başlatılmadı.');
        const data={action,attemptId:this.state.attemptId,index:this.state.index,...extra,actionId:crypto.randomUUID()};
        if(this.state.question)data.token=this.state.question.token;
        return this.request(data);
    }
    retry() { if(!this.pending)throw Error('Yeniden gönderilecek işlem yok.');return this.request(this.pending); }
}
