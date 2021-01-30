import { Component, OnInit } from '@angular/core';

import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { ResApiService } from '../../services/res-api.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  public point: number;
  public total: number;
  public chosenAnsers: any = [];
  public correctAnswer:any;
  public testing: any;
  public resBlock: boolean = false;
  public confirmBlock: boolean = false;
  public test: any;
  public questions: any;
  public timeTest: number;
  public m: any;
  public s: any = '00';
  constructor(
    public testApi: TestApiService,
    public resAPi: ResApiService,
  ) { }

  ngOnInit(): void {
    this.testApi.getTesting('60151902a8510c125049aa7d').subscribe(test => {
      console.log(test)
      this.test = test;
      this.questions = test.questions;
      // this.m = test.timeTest;
      this.timeTest = test.timeTest * 60;
      if (this.timeTest < 60) {
        this.m = '00';
        this.s = this.timeTest;
      }
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

    })
  }

  onReport() {
    clearInterval(this.testing);
    console.log(this.chosenAnsers)
    const check = {
      test_id: '60151902a8510c125049aa7d',
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
}
