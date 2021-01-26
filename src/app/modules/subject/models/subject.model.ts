export class Subject {
    public id: string;
    public subjectname: string;
    public questionQty: number;
    public testQty: number;
    constructor(id:string,subjectname:string, questionQty:number,testQty:number){
        this.id = id;
        this.subjectname = subjectname;
        this.questionQty = questionQty;
        this.testQty = testQty;
    }
}