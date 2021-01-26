export class Question {
    public title:string;
    public answers: [];
    public level: number;
    public test_id:string;
    public subject_id: string;
    constructor(title:string,answers:[],level:number,test_id:string,subject_id:string){
        this.title = title;
        this.answers = answers;
        this.level = level;
        this.test_id = test_id;
        this.subject_id = subject_id;
    }
}