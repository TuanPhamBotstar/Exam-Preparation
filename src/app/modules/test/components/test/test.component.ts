import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Question } from 'src/app/modules/subject/models/question.model';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  public test:any;
  public questions: any;
  constructor(
    private testApi:TestApiService,
    private _location:Location,
  ) { }

  ngOnInit(): void {
    this.testApi.getTest('600f90154c737252ec4931c2').subscribe(test => {
      console.log(test)
      this.test = test;
      this.questions = test.questions;
    })
  }
  onBack(){
    this._location.back();
  }
}
