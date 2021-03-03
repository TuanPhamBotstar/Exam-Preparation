import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { BehaviorSubject, from, Subscription } from 'rxjs';
import { Question } from 'src/app/modules/subject/models/question.model';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TestService } from 'src/app/modules/subject/services/test.service';
import { TestEffects } from '../../../subject/store/effects/test.effects'
import { ofType } from "@ngrx/effects";
// viewChild
import { LineTimeComponent } from '../testChart/line-time/line-time.component';
import { ScoreChartComponent } from '../testChart/score-chart/score-chart.component';
import { ResApiService } from '../../services/res-api.service';
import { ScoreBarChartComponent } from '../testChart/score-bar-chart/score-bar-chart.component';
import { QuestionsAnalyticsComponent } from '../testChart/questions-analytics/questions-analytics.component';
import { ViewAnswerComponent } from '../view-answer/view-answer.component';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class TestComponent implements OnInit, OnDestroy {
  startDate: any;
  endDate: any;
  evaluate: any;
  userScore: any;
  avgScore: any;
  staticQuestions: any;
  testTitle: string;
  totalPage: number;
  total: number;
  page: number;
  perPage: number = 5;
  time: string;
  subcription: Subscription;
  alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  isShareSuccess: boolean = false;
  shareBox: boolean = false;
  confirmBlock: boolean = false;
  config: boolean = false;
  outEllipsis: boolean = false;
  test_id: string;
  subject_id: string;
  test: any;
  results: any;
  questions: Question[] = [];
  qsOnePage: Question[] = [];
  shareForm: FormGroup;
  showContent: boolean = false;
  showResTable: boolean = false;
  active: number = null;
  // viewChild
  setData: any = null;
  @ViewChild(LineTimeComponent) linetTime: LineTimeComponent;
  @ViewChild(ScoreChartComponent) scoreChart: ScoreChartComponent;
  @ViewChild(ScoreBarChartComponent) scoreBarChart: ScoreBarChartComponent;
  @ViewChild(QuestionsAnalyticsComponent) questionAnalytic: QuestionsAnalyticsComponent;
  @ViewChild(ViewAnswerComponent) viewAnswer: ViewAnswerComponent;
  ngAfterViewInit(){
    if(this.setData){
      this.setData.subscribe(data => {
        console.log(data)
        // console.log(this.startDate)
        this.scoreChart.setResults(data);
        this.scoreChart.setEvaluate(this.evaluate, this.avgScore);
        this.linetTime.setResults(data);
        // this.scoreBarChart.setResults(data);
        this.scoreBarChart.setScores(this.userScore);
        this.linetTime.setDate(this.startDate, this.endDate)
        this.questionAnalytic.setCorrectQty(this.staticQuestions);
        this.questionAnalytic.setResults(data)
      })
    }
  }
  constructor(
    private testApi: TestApiService,
    private resultApi: ResApiService,
    private testService: TestService,
    private router: Router,
    private _location: Location,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
  ) { }
  
  ngOnInit(): void {
    const author = JSON.parse(localStorage.getItem('user')).user_id;
    this.setData = new BehaviorSubject([]);
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data.test)
      this.test_id = data.test;
      this.subject_id = data.subject;
      this.page = data.page;
      this.time = data.time;
      if (this.test_id && this.subject_id) {
        this.testService.loadDetaitTest(author, this.subject_id, this.test_id);
        this.resultApi.getResultByTest(author,this.test_id, this.time).subscribe(data => {
          console.log('result api',data)
          if(data){
            this.startDate = data.dateArr;
            this.endDate = data.userArr;
            this.evaluate = data.evaluate;
            this.avgScore = data.avgScore;
            this.userScore = data.userScore;
            this.staticQuestions = data.staticQuestions;
            this.results = data.results;
            this.setData.next(data.results);
          }
        });
      }
    });
    this.subcription = this.testService.getTests().subscribe(data => {
      console.log('get test', data.test)
      if (data.test.testing && !data.test.loading) {
        this.test = data.test.testing;
        this.testTitle = this.test.testTitle;
        this.questions = this.test.questions;
        this.total = this.questions.length;
        console.log(this.total)
        this.totalPage = Math.ceil(this.total/this.perPage);
        let limit = this.page * this.perPage
        let start = this.perPage * (this.page - 1)
        this.qsOnePage = [];
        for (let i = start; i < limit; i++) {
          if (i < this.total) {
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
  ngOnDestroy(): void {
    if (this.subcription) {
      console.log('detail test is destroyed')
      this.subcription.unsubscribe();
    }
  }
  openConfirm() {
    this.confirmBlock = !this.confirmBlock;
    console.log('open confirm')
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
  openShareBox() {
    this.createShareForm();
    this.shareBox = !this.shareBox;
    this.isShareSuccess = false;
  }
  onDelTest() {
    // this.testApi.delTest(this.test_id).subscribe(data => console.log(data));
    this.testService.deleteTest(this.test_id);
    this.router.navigate(['/subject/tests'], {queryParams: {subject: this.subject_id}})
  }
  onShareTest() {
    this.shareForm.value.test_id = this.test_id;
    console.log(this.shareForm.value)
    this.testService.putTypeCode(this.shareForm.value);
    this.testService.getTests().subscribe(data => {
      console.log(data.test)
      this.isShareSuccess = data.test.isShareSuccess;
      setTimeout(() => this.isShareSuccess = false, 1000);
    })
    // this.testApi.putTypeCode(this.shareForm.value).subscribe(data => {
    //   console.log(data)
    // });
  }
  copyToClipboard(link) {
    link.select();
    document.execCommand('copy');
  }
  onBack() {
    this._location.back();
  }
  getSubject_id(id) {
    console.log('not required', id)
  }
  createShareForm() {
    this.shareForm = this.formBuilder.group({
      link: [`http://localhost:4200/testing/?test=${this.test_id}`],
      listEmail: [''],
      haveCode: [false]
    })
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
  onShowContent(){
    this.showContent = true;
    this.showResTable = false;
    this.active = null;
  }
  onShowChart(){
    this.showContent = false;
    this.showResTable = false;
    this.active = null;
  }
  onShowResTable(){
    this.showContent = false;
    this.showResTable = true;
  }
  onViewAnswer(userName, score, chosenAnswers, correctAnswer, i, time){
    this.active = i;
    this.viewAnswer.setTestData(userName, score, this.test,chosenAnswers, correctAnswer, time);
    console.log('pass test')
  }
  onCloseDetail(active){
    this.active = active;
  }
}
