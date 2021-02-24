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
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  testTitle: string;
  totalPage: number;
  total: number;
  page: number;
  perPage: number = 5;
  subcription: Subscription;
  alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  isShareSuccess: boolean = false;
  public shareBox: boolean = false;
  public confirmBlock: boolean = false;
  public test_id: string;
  public subject_id: string;
  public test: any;
  public questions: Question[] = [];
  public qsOnePage: Question[] = [];
  public shareForm: FormGroup;
  // viewChild
  setData: any = null;
  @ViewChild(LineTimeComponent) linetTime: LineTimeComponent;
  @ViewChild(ScoreChartComponent) scoreChart: ScoreChartComponent;
  ngAfterViewInit(){
    if(this.setData){
      this.setData.subscribe(data => {
        this.scoreChart.setResults(data);
        this.linetTime.setResults(data);
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
    this.setData = new BehaviorSubject([]);
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data.test)
      this.test_id = data.test;
      this.subject_id = data.subject;
      this.page = data.page;
      if (this.test_id && this.subject_id) {
        this.testService.loadDetaitTest(this.subject_id, this.test_id);
        this.resultApi.getResultByTest(this.test_id, 'all').subscribe(data => {
          console.log(data.results)
          this.setData.next(data.results);
        })
      }
    })
    this.subcription = this.testService.getTests().subscribe(data => {
      console.log(data.test)
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
  openShareBox() {
    this.createShareForm();
    this.shareBox = !this.shareBox;
    this.isShareSuccess = false;
  }
  onDelTest() {
    // this.testApi.delTest(this.test_id).subscribe(data => console.log(data));
    this.testService.deleteTest(this.test_id);
    this.router.navigate(['/detail/tests'], {queryParams: {subject: this.subject_id}})
  }
  onShareTest() {
    this.shareForm.value.test_id = this.test_id;
    console.log(this.shareForm.value)
    this.testService.putTypeCode(this.shareForm.value);
    this.testService.getTests().subscribe(data => {
      console.log(data.test)
      this.isShareSuccess = data.test.isShareSuccess;
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
    this.router.navigate(['/detail/tests/content-test'],
      { queryParams: { subject: this.subject_id, test: this.test_id, page: this.page } });
  }
  onNext() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    this.router.navigate(['/detail/tests/content-test'],
      { queryParams: { subject: this.subject_id, test: this.test_id, page: this.page } });
  }
}
