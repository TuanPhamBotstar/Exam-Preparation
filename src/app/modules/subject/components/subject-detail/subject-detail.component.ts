import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectApiService } from '../../services/subject-api.service ';
// go to previous page
import { Location } from '@angular/common';
import { Question } from '../../models/question.model';
import { SubjectService } from '../../services/subject.service';
import { first, last, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  total: number;
  page: number;
  author: string;
  public isExistSubject: boolean = false;
  public questions: any;
  public confirmBlock: boolean = false;
  public subjectname: string;
  public subject_id: string;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi: SubjectApiService,
    private subjectService: SubjectService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(data => { 
      this.subject_id = data.subject;
      this.subjectService.loadQuestions(this.subject_id, this.page);
      // console.log(data.subject) 
      this.author = JSON.parse(localStorage.getItem('user')).user_id;
    });
    this.subscription2 = this.subjectService.getSubject().subscribe(data => { // get data from store
      console.log(data.subject.list)
      if(!data.subject.loading){
        data.subject.list.forEach(subject => {
          if (subject._id == this.subject_id) {
            console.log(subject._id)
            this.subjectname = subject.subjectname;
            console.log(this.subjectname)
          }
        })
      }
      if (!this.subjectname && !data.subject.loading) {
        console.log('subject is not exist')
        this.isExistSubject = true;
      }
      else {
        // this.subjectService.loadQuestions(this.subject_id, this.page);
      }
    });
   
    this.subscription3 = this.subjectService.getSubject().subscribe(data => {
      console.log(data)
      if(!data.question.loading){
        this.questions = data.question.list;
        this.total = data.question.total;
      }
    });
  }
  ngOnDestroy() { 
    if (this.subscription) {
      console.log('detail subject is destroyed')
      this.subscription.unsubscribe();
      this.subscription2.unsubscribe();
      this.subscription3.unsubscribe();
    }
  }
  openConfirmBlock() {
    if (!this.isExistSubject) {
      this.confirmBlock = !this.confirmBlock;
    }
  }
  onDelSubject(id: string) {
    this.subjectApi.removeSubject(id).subscribe(data => console.log(data));
    this._location.back();
  }

 
  // onBack() {
  //   this._location.back();
  // }
 
}
