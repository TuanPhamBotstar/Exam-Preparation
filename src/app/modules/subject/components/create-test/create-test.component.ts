import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectApiService } from '../../services/subject-api.service ';
import { TestApiService } from '../../services/test-api.service';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';
// ng5-slider
import { Options, LabelType } from 'ng5-slider';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit, OnDestroy{
  
  subcription: Subscription;
  errQty: boolean = false;
  maxTypQs: number = -1;
  easyTotal: number;
  normalTotal: number;
  hardTotal: number;
  easyQty: number = 0;
  normalQty: number = 0;
  hardQty: number = 0;
  public createTestForm: FormGroup;
  public author: string;
  public subject_id: string;
  public subjectname: string;
  // ng5-slider
  easyValue: number = 0;
  normalValue: number = 0;
  options: Options = {
    floor: 0,
    ceil: 0,
    showOuterSelectionBars: true,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.easyQty = value;
          // return `<lablel>Easy: </lablel>` + value;
          return ''+value;
        case LabelType.High:
          this.normalQty = value;
          return ''+value;
          // value = value - this.easyQty
          return '' + value;
        default:
          return '' + value;  
      }
    }
  };
  totalQty: number = 0;
  optionsTotal: Options = {
    floor: 0,
    ceil: 0,
    showOuterSelectionBars: true, 
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          // console.log('value totalqty = ',value) ;
          // this.totalQty = value;
          this.options.ceil = value;
          return ''+value;
        default:
          return '' + value;  
      }
    }
  };
  constructor(
    private _location: Location,
    private subjectApi: SubjectApiService,
    private testService: TestService,
    public formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.optionsTotal.translate)
    this.author = JSON.parse(localStorage.getItem('user')).user_id;
    this.subjectApi.getQtyQs(this.subject_id).subscribe(data => {
      console.log(data)
      this.maxTypQs = Math.max(data.easyQty, data.normalQty, data.hardQty);
      this.easyTotal = data.easyQty;
      this.normalTotal = data.normalQty;
      this.hardTotal = data.hardQty;
      this.totalQty = data.easyQty + data.normalQty + data.hardQty;
      this.easyValue = data.easyQty;
      this.normalValue = data.easyQty + data.normalQty;  
      this.optionsTotal.ceil = data.easyQty + data.normalQty + data.hardQty;
      this.options.ceil =   this.totalQty;
    })
    this.initialTestForm();
  }
  ngOnDestroy():void{
    if(this.subcription){
      this.subcription.unsubscribe();
    }
  }
  getSubject_id(id: string, subjectname: string) {
    this.subject_id = id;
    this.subjectname = subjectname;
    console.log(this.subject_id)
  }
  initialTestForm() {
    this.createTestForm = this.formBuilder.group({
      subject_id: [this.subject_id],
      testTitle: ['', [Validators.required]],
      timeTest: ['', Validators.required],
      codeTest: ['', [Validators.pattern('[0-9]{4}$'), Validators.required]],
      // hardQty: ['', [Validators.required]],
      // normalQty: ['', [Validators.required]],
      // easyQty: ['', [Validators.required]],
      author: [this.author],
    });
    console.log(this.createTestForm.value)
  }
  onCreateTest() {
    console.log('create test', this.createTestForm.value)
    this.createTestForm.value.hardQty = this.totalQty - this.normalQty;
    this.createTestForm.value.normalQty = this.normalQty - this.easyQty;
    this.createTestForm.value.easyQty = this.easyQty
    this.subjectApi.putQuestionsForTest(this.createTestForm.value).subscribe(data => {
      console.log(data)
      if(data['susscess']){ 
        this.errQty = false;
        this.createTestForm.value.questions = data['questions']
        console.log(this.createTestForm.value)
        this.testService.addNewTest(this.createTestForm.value);
        this.subcription = this.testService.getTests().subscribe(data => {
          console.log(data)
          if(data.test.test_id && !data.test.loading){
            this.router.navigate(['subject/tests/content-test'],
            {queryParams: {subject: this.subject_id, test: data.test.test_id, page: 1, time: 'all'}});
          }
        })
      }
      else{ 
        this.errQty = true;
        this.easyTotal = data['easyTotal'];
        this.normalTotal = data['normalTotal'];
        this.hardTotal = data['hardTotal'];
      }
    })
  }

  onBack() {
    this._location.back();
  }
  toAddQuestion(){
    this.router.navigate(['subject/questions/add-question'], {queryParams: {subject: this.subject_id, page: 1}});
  }

  changeOptions(totalQty) {
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = totalQty;
    this.options = newOptions;
  }
}
