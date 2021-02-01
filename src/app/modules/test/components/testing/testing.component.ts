import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { ResApiService } from '../../services/res-api.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  alphaArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  tutorialBox: boolean = true;
  isTypeCode: boolean;
  errCode: boolean = false;
  testCode: number;
  test_id: string;
  showTest: boolean = false;
  confirmCode: FormGroup;
  public point: number;
  public total: number;
  public chosenAnsers: any = [];
  public correctAnswer: any;
  public testing: any;
  public resBlock: boolean = false;
  public confirmBlock: boolean = false;
  public test: any;
  public questions: any;
  public timeTest: number;
  public m: any;
  public s: any = '00';
  constructor(
    public activatedRouter: ActivatedRoute,
    public testApi: TestApiService,
    public resAPi: ResApiService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.confirmCode = this.formBuilder.group({
      codeTyped: ['']
    })
    this.activatedRouter.queryParams.subscribe(data => {
      this.test_id = data.de_thi;
      if (this.test_id) {
        this.testApi.getTesting(this.test_id).subscribe(test => {
          // console.log(test)
          this.isTypeCode = test.typeCode;
          this.testCode = test.testCode;
          this.test = test;
          this.questions = test.questions;
          this.timeTest = test.timeTest * 60;
          if (this.timeTest < 60) {
            this.m = '00';
            this.s = this.timeTest;
          }
          this.m = Math.floor(this.timeTest / 60)
          this.s = this.timeTest - 60 * this.m;
          if (this.m < 10) { this.m = '0' + this.m }
          if (this.s < 10) { this.s = '0' + this.s }
          // this.testing = setInterval(() => {
          //   this.timeTest--;
          //   if (this.timeTest == 0) {
          //     this.onReport();
          //   }
          //   this.m = Math.floor(this.timeTest / 60)
          //   this.s = this.timeTest - 60 * this.m;
          //   if (this.m < 10) { this.m = '0' + this.m }
          //   if (this.s < 10) { this.s = '0' + this.s }
          // }, 1000)

        })
      }
    })
  }

  onReport() {
    clearInterval(this.testing);
    console.log(this.chosenAnsers)
    const check = {
      test_id: this.test_id,
      chosenAnswers: this.chosenAnsers,
      timetest: this.timeTest,
    }
    this.resAPi.checkAnswers(check).subscribe(data => {
      console.log(data)
      this.point = data['point'];
      this.correctAnswer = data['correctAnswer'];
      this.total = data['correctAnswer'].length;
    });
    this.resBlock = !this.resBlock;
    if (this.timeTest > 0) {
      this.confirmBlock = !this.confirmBlock;
      this.timeTest = 0;
    }
  }
  openConfirm() {
    if (this.timeTest > 0) {
      this.confirmBlock = !this.confirmBlock;
    }
  }
  showRes(e, i, j) { //record answer'user
    this.chosenAnsers[i] = j;
    console.log(e.target.checked)
  }
  closeResBlock() {
    this.resBlock = !this.resBlock;
  }
  onStartTesting() {
    console.log(this.confirmCode.value)
    if(this.isTypeCode){
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
    else{
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
}
