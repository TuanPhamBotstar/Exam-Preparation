import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrls: ['./view-answer.component.css']
})
export class ViewAnswerComponent implements OnInit {
  @Output() activeStatus = new EventEmitter<null>();
  userName: string;
  score: number;
  subject_id: string;
  test_id: string;
  test: any;
  time: String;
  questions: any;
  chosenAnswers: any;
  correctAnswer: any;
  alphaArr = ['A', 'B', 'C', 'D', 'E', 'F'];
  page: number = 1;
  perPage: number = 5;
  qsOnePage: any;
  totalPage: number;
  totalQs: number;
  showTest: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      if(data.page){
        this.page = data.page;
        let limit = this.page * this.perPage
        let start = this.perPage * (this.page - 1)
        this.qsOnePage = [];
        for (let i = start; i < limit; i++) {
          if (i < this.totalQs) {
            this.qsOnePage.push(this.questions[i])
          }
          else {
            break;
          }
        }
        console.log(this.qsOnePage)
      }
    })
  }
 
  closeDetailRes() {
    this.activeStatus.emit(null);
    this.test = null;
  }
  setTestData(userName, score, test: any, chosenAnswers, correctAnswer, time){
    if(test){
      this.userName = userName;
      this.score = score;
      this.subject_id =test.subject_id;
      this.test_id = test._id;
      this.time = time;
      this.chosenAnswers = chosenAnswers;
      this.correctAnswer = correctAnswer;
      console.log(chosenAnswers, correctAnswer)
      this.test = test;
      this.questions = test.questions;
      this.totalQs = this.questions.length;
      this.totalPage = Math.ceil(this.totalQs/this.perPage);
      let limit = this.page * this.perPage
      let start = this.perPage * (this.page - 1)
      this.qsOnePage = [];
      for (let i = start; i < limit; i++) {
        if (i < this.totalQs) {
          this.qsOnePage.push(this.questions[i])
        }
        else {
          break;
        }
      }
    }
    console.log('view answer',test)
    this.showTest = true;
  }
   //pagination
   arrayV() {
    return Array(this.totalPage);
  }
  onPrevious() {
    if (this.page > 1) {
      this.page--;
    }
    this.router.navigate(['/subject/tests/content-test'],
      { queryParams: { subject: this.subject_id, test: this.test_id, page: this.page, time: this.time} });
  }
  onNext() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    this.router.navigate(['/subject/tests/content-test'],
      { queryParams: { subject: this.subject_id, test: this.test_id, page: this.page,  time: this.time } });
  }

}
