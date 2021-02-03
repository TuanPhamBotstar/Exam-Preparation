import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../../models/subject.model';
import { SubjectApiService } from '../../services/subject-api.service ';
import { SubjectService } from '../../services/subject.service';
import { Location } from '@angular/common';
// take(1) & first()
import { first, take, last } from 'rxjs/operators';
@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  public subjectForm: FormGroup;
  public author: string;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi:SubjectApiService,
    private subjectService: SubjectService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.createSubjectForm();
  }
  createSubjectForm() {
    this.subjectForm = this.formBuilder.group({
      subjectname: ['', [Validators.required]]
    })
  }
  onAddSubject(subjectname: string) {
    const user_id = JSON.parse(localStorage.getItem('user')).user_id;
    const newSubject = new Subject('',subjectname,0,user_id,0);
    this.subjectService.addSubject(newSubject);
    this.subjectService.getSubject().pipe(take(2)).subscribe(data => {
      console.log(data)
      this.router.navigate(['/chi-tiet'], {queryParams: {bo_de: data.subject.subject_id}});
    })
  }
  testViewChild(no){
    console.log('viewchild working',no)
  }
  onClose(){
    // this.router.navigate(['/bo-de'], {queryParams: {trang: 1}});
    this._location.back();
  }
}
