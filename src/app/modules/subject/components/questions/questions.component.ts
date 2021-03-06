import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  loading: boolean = true;
  show: boolean = true;
  subscription: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  totalPage: number;
  total: number;
  perpage: number = 10;
  page: number;
  author: string;
  alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  public isExistSubject: boolean = false;
  public showQuestions: boolean = true;
  public levels = ['', 'Easy', 'Normal', 'Hard'];
  public questions: any;
  public confirmBlock: boolean = false;
  public subjectname: string;
  public subject_id: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 1000)
    const author = JSON.parse(localStorage.getItem('user')).user_id;
    this.subscription = this.activatedRoute.queryParams.subscribe(data => { 
      this.subject_id = data.subject;
      this.page = data.page;
      this.subjectService.loadQuestions(author, this.subject_id, this.page);
      console.log('load questions') 
      this.author = JSON.parse(localStorage.getItem('user')).user_id;
    });
    this.subscription2 = this.subjectService.getSubject().subscribe (data => { // get data from store
      console.log(data.subject.list)
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
      console.log('get questions',data.question)
      if(!data.question.loading){
        this.questions = data.question.list;
        this.total = data.question.total;
        this.totalPage = Math.ceil(data.question.total / this.perpage);
      }
    });
  }
  ngOnDestroy() { 
    // unsubscribe
    if (this.subscription) {
      console.log('detail subject is destroyed')
      this.subscription.unsubscribe();
      this.subscription2.unsubscribe();
      this.subscription3.unsubscribe();
    }
  }
  setSubject_id(id: string, subjectname: string) {
    // this.subject_id = id;
    // this.subjectname = subjectname;
    console.log(id)
  } 
  onAddQuestion() {
    this.router.navigate(['/subject/questions/add-question'], { queryParams: { subject: this.subject_id, page: this.page } });
  }
  onEditQuestion(question) {
    console.log(question)
    this.router.navigate(['/subject/questions/edit-question'], { queryParams: { subject: this.subject_id, question: question._id, page: this.page } });
  }
   //pagination
   arrayV() {
    return Array(this.totalPage);
  }
  onPrevious() {
    if (this.page > 1) {
      this.page--;
    }
    this.router.navigate(['/subject/questions'], { queryParams: { subject: this.subject_id, page: this.page } });
  }
  onNext() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    this.router.navigate(['/subject/questions'], { queryParams: { subject: this.subject_id, page: this.page } });
  }
  onActive(childCpn) {
    this.show = false;
  }
  onDeactivate() {
    this.show = true;
  }
}
