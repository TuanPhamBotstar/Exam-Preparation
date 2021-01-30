export class Subject {
    public id: string;
    public subjectname: string;
    public questionQty: number;
    public author: string;
    public testQty: number;
    constructor(id:string,subjectname:string, questionQty:number,author:string,testQty:number){
        this.id = id;
        this.subjectname = subjectname;
        this.questionQty = questionQty;
        this.author = author;
        this.testQty = testQty;
    }
}