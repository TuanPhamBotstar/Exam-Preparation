import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectApiService } from '../../services/subject-api.service ';
// go to previous page
import {Location} from '@angular/common';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {
  public showQuestions: boolean = true;
  public levels = ['', 'Dễ', 'Trung bình', 'Khó'];
  public questions: any;
  public confirmBlock: boolean = false;
  public subjectname: string;
  public subject_id: string;
  constructor(
    public router:Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi: SubjectApiService,
    private _location:Location,
  ) { }

  ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe(data => {
        this.subject_id = data.bo_de
        console.log(data.bo_de)
        if(this.subject_id){
          this.subjectApi.getQuestions(this.subject_id).subscribe(data => this.questions = data);
          this.subjectApi.getSubjectName(this.subject_id).subscribe(data => this.subjectname = data)
        }
      });
  }
  onAddQuestion(){
    this.router.navigate(['/chi-tiet/them-cau-hoi'], { queryParams: { bo_de: this.subject_id} });
  }
  openConfirmBlock(){
    this.confirmBlock = !this.confirmBlock;
  }
  onDelSubject(id:string){
      this.subjectApi.delSubject(id).subscribe(data => console.log(data));
      this._location.back();
  }
  //  question handle
  delQuestion(i:number){
    const id = this.questions[i]._id;
    console.log(id);
    this.subjectApi.delQuestion(id).subscribe(data => console.log(data))
  }
  onEditQuestion(question){
    console.log(question)
    this.router.navigate(['/chi-tiet/them-cau-hoi'], {queryParams: {bo_de:this.subject_id}});
  }
  // test handle
  overviewTests(){
      this.router.navigate(['chi-tiet/de-thi'], {queryParams: {bo_de:this.subject_id}});

  }
  // pass subject_id to child component
  onActive(childCpn){
    this.showQuestions = !this.showQuestions;
    console.log('view child')
    this.activatedRoute.queryParams.subscribe(data => {
      this.subject_id = data.bo_de
      childCpn.getSubject_id(this.subject_id, this.subjectname);
    });
  }
  onToggle(){
    this.showQuestions = !this.showQuestions;
  }
  //
  onBack(){
      this.confirmBlock = false;
  }
}
