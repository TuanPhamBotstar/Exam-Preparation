import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Question } from 'src/app/modules/subject/models/question.model';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  public shareBox: boolean = false;
  public confirmBlock:boolean = false;
  public test_id: string;
  public test:any;
  public questions: any;
  public shareForm: FormGroup;
  constructor(
    private testApi:TestApiService,
    private _location:Location,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data =>{
      console.log(data.de_thi)
      this.test_id = data.de_thi;
      if(this.test_id){
        this.testApi.getTesting(this.test_id).subscribe(test => {
          console.log(test)
          if(test){
            this.test = test;
            this.questions = test.questions;
          }
        })
      }
    })
  }
  openConfirm(){
    this.confirmBlock = !this.confirmBlock;
    console.log('open confirm')
  }
  openShareBox(){
    this.createShareForm();
    this.shareBox = !this.shareBox;
  }
  onDelTest(){
    this.testApi.delTest(this.test_id).subscribe(data => console.log(data));
    this.onBack();
  }
  onShareTest(){
    this.shareForm.value.test_id = this.test_id;
    console.log(this.shareForm.value)
    this.testApi.putTypeCode(this.shareForm.value).subscribe(data => {
      console.log(data)
    });
  }
  onBack(){
    this._location.back();
  }
  getSubject_id(id){
    console.log('not required', id)
  }
  createShareForm(){
    this.shareForm = this.formBuilder.group({
      link:[`http://localhost:4200/lam-bai-thi/?de_thi=${this.test_id}`],
      listEmail:[''],
      haveCode:[false]
    })
  }
}
