import { NgModule } from "@angular/core";

export class Test{
    public id: string;
    public subject_id:string;
    public link:string;
    public testCode:number;
    public testTitle:string;
    public timeTest: string;
    public hardQty: number;
    public normalQty: number;
    public easyQty: number;
    constructor(id:string, subject_id: string, link: string,
        testCode: number, testTitle: string, timetest: string, 
        hardQty: number, normalQty: number, easyQty: number)
        {
        this.id = id;
        this.subject_id = subject_id;
        this.link = link;
        this.testCode = testCode;
        this.testTitle = testTitle;
        this.timeTest = this.timeTest;
        this.hardQty = hardQty;
        this.normalQty = normalQty;
        this.easyQty = easyQty;
    }
};