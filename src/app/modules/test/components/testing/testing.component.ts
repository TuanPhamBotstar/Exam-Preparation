import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/modules/subject/models/question.model';
import { Test } from 'src/app/modules/subject/models/test.model';

import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { TestService } from 'src/app/modules/subject/services/test.service';
import { ResApiService } from '../../services/res-api.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit, OnDestroy {
  currentDate: any;
  saveTimeTest: number;
  totalPage: number;
  totalQs: number;
  page: number = 1;
  perPage: number = 5;
  qsOnePage: Question[] = [];
  subscription: Subscription;
  alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  tutorialBox: boolean = true;
  isTypeCode: boolean;
  errCode: boolean = false;
  testCode: number;
  user_id: string;
  user_name: string;
  test_id: string;
  nameTest: string;
  result: any;
  showTest: boolean = false;
  confirmCode: FormGroup;
  public point: number;
  public count: number;
  public ansFromServer: number;
  public chosenAnsers: any = [];
  public correctAnswer: any;
  public testing: any;
  public author: string;
  public test: any;
  public resBlock: boolean = false;
  public confirmBlock: boolean = false;
  public questions: any;
  public timeTest: number;
  public m: any;
  public s: any = '00';
  constructor(
    public activatedRouter: ActivatedRoute,
    public router: Router,
    public testApi: TestApiService,
    public testService: TestService,
    public resAPi: ResApiService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // get user_id
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.user_id = user.user_id;
      this.user_name = user.username;
    }

    // 
    this.confirmCode = this.formBuilder.group({
      codeTyped: ['']
    })
    this.activatedRouter.queryParams.subscribe(data => {
      this.test_id = data.test;
      // this.page = data.trang;
      if (this.test_id) {
        this.testService.loadTesting(this.test_id);
      }
    })
    this.subscription = this.testService.getTests().subscribe(data => {
      console.log(data.test.testing)
      if (!data.test.loading && data.test.testing) {
        this.test = data.test.testing;
        this.nameTest = this.test.testTitle;
        this.author = this.test.author;
        this.isTypeCode = this.test.typeCode;
        this.testCode = this.test.testCode;
        this.questions = this.test.questions;
        this.timeTest = this.test.timeTest * 60;
        this.saveTimeTest = this.timeTest;
        if (this.timeTest < 60) {
          this.m = '00';
          this.s = this.timeTest;
        }
        this.m = Math.floor(this.timeTest / 60)
        this.s = this.timeTest - 60 * this.m;
        if (this.m < 10) { this.m = '0' + this.m }
        if (this.s < 10) { this.s = '0' + this.s }
        this.loadPagination()
      }
    })
    this.confirmCode.valueChanges.subscribe(() => {
      this.errCode = false;
    })
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      console.log('testing is destroyed')
      this.subscription.unsubscribe();
    }
  }
  onReport() {
    clearInterval(this.testing);
    this.currentDate = new Date().toISOString();
    console.log(this.currentDate)
    console.log(this.chosenAnsers)
    const check = {
      test_id: this.test_id,
      chosenAnswers: this.chosenAnsers,
      timetest: this.timeTest,
    }
    this.saveTimeTest = this.saveTimeTest - this.timeTest;
    this.resAPi.checkAnswers(check).subscribe(data => {
      console.log(data)
      this.point = data['point'];
      this.count = data['count'];
      this.correctAnswer = data['correctAnswer'];
      this.ansFromServer = data['correctAnswer'].length;
      this.result = {
        user_id: this.user_id,
        user_name: this.user_name,
        test_id: this.test_id,
        author: this.author,
        nameTest: this.nameTest,
        point: this.point,
        time: this.saveTimeTest,
        chosenAnsers: this.chosenAnsers,
        correctAnswer: this.correctAnswer,
        date: this.currentDate,
      }
      this.resAPi.saveTested(this.result).subscribe(data => {
        console.log(data)
      });
    });
    this.resBlock = !this.resBlock;
    if (this.timeTest > 0) {
      this.confirmBlock = !this.confirmBlock;
      this.timeTest = 0;
    }
  }
  openConfirm() {
    console.log(123)
    if (this.timeTest > 0) {
      this.confirmBlock = !this.confirmBlock;
    }
  }
  showRes(e, i, j) { //record answer'user
    this.chosenAnsers[i + (this.page - 1) * this.perPage] = j;
    console.log('chosenAnsers', this.chosenAnsers);
    console.log(e.target.checked)
  }
  closeResBlock() {
    this.resBlock = !this.resBlock;
  }
  onStartTesting() {
    console.log(this.confirmCode.value)
    if (this.isTypeCode) {
      if (this.confirmCode.value.codeTyped === this.testCode) {
        this.tutorialBox = false;
        this.showTest = true;
        this.testing = setInterval(() => {
          this.timeTest--;
          if (this.timeTest == 0) {
            this.onReport();
          }
          this.m = Math.floor(this.timeTest / 60)
          this.s = this.timeTest - 60 * this.m;
          if (this.m < 10) { this.m = '0' + this.m }
          if (this.s < 10) { this.s = '0' + this.s }
        }, 1000)
      }
      else {
        this.errCode = true;
      }
    }
    else {
      this.tutorialBox = false;
      this.showTest = true;
      this.testing = setInterval(() => {
        this.timeTest--;
        if (this.timeTest == 0) {
          this.onReport();
        }
        this.m = Math.floor(this.timeTest / 60)
        this.s = this.timeTest - 60 * this.m;
        if (this.m < 10) { this.m = '0' + this.m }
        if (this.s < 10) { this.s = '0' + this.s }
      }, 1000)
    }
  }
  //pagination
  loadPagination() {
    this.totalQs = this.questions.length;
    console.log(this.totalQs)
    this.totalPage = Math.ceil(this.totalQs / this.perPage);
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
  arrayV() {
    return Array(this.totalPage);
  }
  toPage(no: number) {
    this.page = no;
    this.loadPagination()
  }
  onPrevious() {
    if (this.page > 1) {
      this.page--;
    }
    this.loadPagination()
    // this.router.navigate(['/lam-bai-thi'],
    //   { queryParams: { test: this.test_id, trang: this.page } });
  }
  onNext() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    this.loadPagination()
    // this.router.navigate(['/lam-bai-thi'],
    //   { queryParams: { test: this.test_id, trang: this.page } });
  }
}
