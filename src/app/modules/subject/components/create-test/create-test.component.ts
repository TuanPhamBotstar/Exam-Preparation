import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectApiService } from '../../services/subject-api.service ';
import { TestApiService } from '../../services/test-api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  public createTestForm:FormGroup;
  constructor(
    private _location:Location,
    private subjectApi: SubjectApiService,
    private testApi: TestApiService,
    public formBuilder: FormBuilder,
    public router:Router,
  ) { }

  ngOnInit(): void {
    this.initialTestForm();
  }
  initialTestForm(){
    this.createTestForm = this.formBuilder.group({
      subject_id:['600d778541ad1335d8d30f21'],
      testTitle:['',[Validators.required]],
      timeTest:['',Validators.required],
      codeTest:['',[Validators.pattern('[0-9]{4}$'), Validators.required]],
      hardQty:['',[Validators.required]],
      normalQty:['',[Validators.required]],
      easyQty:['',[Validators.required]]
    });
    console.log(this.createTestForm.controls)
  }
  onCreateTest(){
    console.log('create test', this.createTestForm.value)
    this.testApi.addNewTest(this.createTestForm.value)
    .subscribe(data => {
      console.log(data);
      this.subjectApi.putQuestionsForTest(data).subscribe(data2 => {
        console.log(data2);
        this.testApi.putQuestions(data2).subscribe(finish => {
          console.log(finish);
          if(finish) this.router.navigate(['de-thi']);
        });
      })
    });
    this.createTestForm.reset();

  }

  onBack(){
    this._location.back();
  }

}
