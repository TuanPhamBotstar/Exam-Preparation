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
        this.subjectname = data.bo_de
        console.log(data.bo_de)
        if(this.subjectname){
            this.subjectApi.getSubjectByName(this.subjectname).subscribe(data => {
            this.subject_id = data;
            console.log(this.subject_id);
            if(this.subject_id){
              console.log('get questions')
              this.subjectApi.getQuestions(this.subject_id).subscribe(data => this.questions = data);
            }
          })
        }
      });
  }
  onAddQuestion(){
    console.log('them cau hoi')
    this.router.navigate(['/chi-tiet/them-cau-hoi'], { queryParams: { bo_de: this.subjectname} });
  }
  openConfirmBlock(){
    this.confirmBlock = true;
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
  onEditQuestion(i:number){
    console.log(this.questions[i])
    this.router.navigate(['/chi-tiet/them-cau-hoi'])
  }
  // test handle
  onCreateTest(){
    this.router.navigate(['/tao-de-thi'], {queryParams: {bo_de:this.subjectname}})
  }
  detailTest(){
    
  }
  //
  onBack(){
      this.confirmBlock = false;
  }
}
