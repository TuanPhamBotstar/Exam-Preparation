import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectApiService } from '../../services/subject-api.service ';
// go to previous page
import { Location } from '@angular/common';
import { Question } from '../../models/question.model';
import { SubjectService } from '../../services/subject.service';
import { first, last, take } from 'rxjs/operators';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subscription: SubscriptionLike;
  totalPage: number;
  total: number;
  perpage: number = 10;
  page: number;
  author: string;
  public isExistSubject: boolean = false;
  public showQuestions: boolean = true;
  public levels = ['', 'Dễ', 'Trung bình', 'Khó'];
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
    this.activatedRoute.queryParams.subscribe(data => {
      this.subject_id = data.bo_de;
      this.page = data.trang;
      // console.log(data.bo_de) 
      this.author = JSON.parse(localStorage.getItem('user')).user_id;
      if (this.subject_id) {
        // this.subjectService.loadSubjects(this.author)
        this.subjectService.getSubject().pipe(first()).subscribe(data => { // get data from store
          console.log(data.subject.list)
          data.subject.list.forEach(subject => {
            if (subject._id == this.subject_id) {
              this.subjectname = subject.subjectname;
            }
          })
          if (!this.subjectname) {
            this.isExistSubject = true;
          }
          else {
            this.subjectService.loadQuestions(this.subject_id, this.page);
            this.subjectService.getSubject().subscribe(data => {
              // console.log(data)
              this.questions = data.question.list;
              this.total = data.question.total;
              this.totalPage = Math.ceil(data.question.total / this.perpage);
            })
          }
        })
        // this.subjectApi.getSubjectName(this.subject_id).subscribe(data => {
        //   if(data){
        //     // console.log(data)
        //     if(this.author == data['author']){
        //         this.subjectname = data['subjectname'];
        //         this.subjectApi.getQuestions(this.subject_id).subscribe(data => this.questions = data);
        //     }
        //     else{
        //       this.isExistSubject = true;
        //     }
        //   }
        //   else{
        //     this.isExistSubject = true;
        //   }
        // })
      }
    });
  }
  ngOnDestroy() {
    // unsubscribe
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onAddQuestion() {
    if (!this.isExistSubject) {
      this.router.navigate(['/chi-tiet/them-cau-hoi'], { queryParams: { bo_de: this.subject_id } });
    }
  }
  openConfirmBlock() {
    if (!this.isExistSubject) {
      this.confirmBlock = !this.confirmBlock;
    }
  }
  onDelSubject(id: string) {
    this.subjectApi.delSubject(id).subscribe(data => console.log(data));
    this._location.back();
  }
  //  question handle
  delQuestion(i: number) {
    const id = this.questions[i]._id;
    console.log(id);
    this.subjectApi.delQuestion(id).subscribe(data => console.log(data))
  }
  onEditQuestion(question) {
    console.log(question)
    this.router.navigate(['/chi-tiet/them-cau-hoi'], { queryParams: { bo_de: this.subject_id } });
  }
  // test handle
  overviewTests() {
    if (!this.isExistSubject) {
      this.router.navigate(['chi-tiet/de-thi'], { queryParams: { bo_de: this.subject_id } });
    }
  }
  // pass subject_id to child component
  onActive(childCpn) {
    this.showQuestions = !this.showQuestions;
    console.log('view child')
    this.activatedRoute.queryParams.subscribe(data => {
      this.subject_id = data.bo_de
      childCpn.getSubject_id(this.subject_id, this.subjectname);
    });
  }
  onToggle() {
    this.showQuestions = !this.showQuestions;
  }
  onBack() {
    this._location.back();
  }
  //pagination
  arrayV() {
    return Array(this.totalPage);
  }
  onPrevious() {
    if (this.page > 1) {
      this.page--;
    }
    this.router.navigate(['/chi-tiet'], { queryParams: { bo_de: this.subject_id, trang: this.page } });
  }
  onNext() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    this.router.navigate(['/chi-tiet'], { queryParams: { bo_de: this.subject_id, trang: this.page } });
  }
}
