import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectApiService } from '../../services/subject-api.service ';
import { TestApiService } from '../../services/test-api.service';
import { Router } from '@angular/router';
import { TestService } from '../../services/test.service';
@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit, OnDestroy{

  subcription: Subscription;
  errQty: boolean = false;
  easyTotal: number;
  normalTotal: number;
  hardTotal: number;
  public createTestForm: FormGroup;
  public subject_id: string;
  public subjectname: string;
  constructor(
    private _location: Location,
    private subjectApi: SubjectApiService,
    private testService: TestService,
    public formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
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
      hardQty: ['', [Validators.required]],
      normalQty: ['', [Validators.required]],
      easyQty: ['', [Validators.required]]
    });
    console.log(this.createTestForm.controls)
  }
  onCreateTest() {
    console.log('create test', this.createTestForm.value)
    // this.testApi.addNewTest(this.createTestForm.value)
    //   .subscribe(data => {
    //     console.log(data);
    //     const test_id = data['_id']
    //     this.subjectApi.putQuestionsForTest(data).subscribe(data2 => {
    //       console.log(data2['susscess']);
    //       if(data2['susscess']){
    //         this.testApi.putQuestions(data2).subscribe(finish => {
    //           console.log(finish);
    //           if (finish) this.router.navigate(['chi-tiet/de-thi/noi-dung-de-thi'],{queryParams: {de_thi: test_id}});
    //         });
    //       }
    //     })
    //   });
    // this.createTestForm.reset();
    this.subjectApi.putQuestionsForTest(this.createTestForm.value).subscribe(data => {
      console.log(data)
      if(data['susscess']){
        this.errQty = false;
        this.createTestForm.value.questions = data['questions']
        console.log(this.createTestForm.value)
        this.testService.addNewTest(this.createTestForm.value);
        this.subcription = this.testService.getTests().subscribe(data => {
          console.log(data)
          if(data.test.test_id){
            this.router.navigate(['chi-tiet/de-thi/noi-dung-de-thi'],
            {queryParams: {bo_de: this.subject_id, de_thi: data.test.test_id, trang: 1}});
          }
        })
        // .subscribe(data => {
        //   this.router.navigate(['chi-tiet/de-thi/noi-dung-de-thi'],{queryParams: {bo_de: this.subject_id, de_thi: data}});
        // })
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

}
