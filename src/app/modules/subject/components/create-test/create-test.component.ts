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

  public createTestForm: FormGroup;
  public subject_id: string;
  public subjectname: string;
  constructor(
    private _location: Location,
    private subjectApi: SubjectApiService,
    private testApi: TestApiService,
    public formBuilder: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.initialTestForm();
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
    this.testApi.addNewTest(this.createTestForm.value)
      .subscribe(data => {
        console.log(data);
        const test_id = data['_id']
        this.subjectApi.putQuestionsForTest(data).subscribe(data2 => {
          console.log(data2);
          this.testApi.putQuestions(data2).subscribe(finish => {
            console.log(finish);
            if (finish) this.router.navigate(['chi-tiet/de-thi/noi-dung-de-thi'],{queryParams: {de_thi: test_id}});
          });
        })
      });
    this.createTestForm.reset();

  }

  onBack() {
    this._location.back();
  }

}
