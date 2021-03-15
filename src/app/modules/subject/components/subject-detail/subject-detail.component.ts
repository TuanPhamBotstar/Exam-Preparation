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
  styleUrls: ['./subject-detail.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  total: number;
  page: number;
  test_id: string;
  testTitle: string;
  author: string;
  isExistSubject: boolean = false;
  questions: any;
  confirmBlock: boolean = false;
  config: boolean = false;
  outEllipsis: boolean = false;
  subjectname: string;
  subject_id: string;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi: SubjectApiService,
    private subjectService: SubjectService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.author = JSON.parse(localStorage.getItem('user')).user_id;
    this.subscription = this.activatedRoute.queryParams.subscribe(data => { 
      this.subject_id = data.subject;
      this.test_id = data.test;
      this.page = data.page;
      // this.subjectService.loadQuestions(this.author, this.subject_id, this.page);
      // console.log(data.subject) 
    });
    this.subscription2 = this.subjectService.getSubject().subscribe(data => { // get data from store
      console.log('get subject',data)
      if(data.test.testing && !data.test.loading){
        this.testTitle = data.test.testing.testTitle;
      }
      if(!data.subject.loading && data.subject.list.length > 0){
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
  onDashboard() {
    this.router.navigate(['subject/dashboard'], { queryParams: { subject: this.subject_id } });
  }
  overviewTests() {
    this.router.navigate(['subject/tests'], { queryParams: { subject: this.subject_id } });
  }
  allQuestions() {
    this.router.navigate(['subject/questions'], { queryParams: { subject: this.subject_id, page: 1 } });
  }
  // openConfirmBlock() {
  //   if (!this.isExistSubject) {
  //     this.confirmBlock = !this.confirmBlock;
  //   }
  // }
  onDelSubject() {
    this.subjectService.removeSubject(this.subject_id);
    this.router.navigate(['/subjects'], { queryParams: { page: 1 } });
    this.confirmBlock = !this.confirmBlock;
  }
  openConfirmBlock() {
    this.confirmBlock = !this.confirmBlock;
  }
  openConfig(){
    this.outEllipsis = !this.outEllipsis
    // this.config = !this.config;
  }
  onClick(event) {
    if(this.outEllipsis){
      this.config = !this.config;
      this.outEllipsis = false;
    }
    else{
      this.config = false;
      this.outEllipsis = false;  
    }
   }
 
}
