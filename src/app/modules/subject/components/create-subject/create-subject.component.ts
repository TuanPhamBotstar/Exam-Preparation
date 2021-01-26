import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from '../../models/subject.model';
import { SubjectApiService } from '../../services/subject-api.service ';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  public subjectForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi:SubjectApiService,
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
    const newSubject = new Subject('',subjectname,0,0);
    this.subjectApi.addSubject(newSubject).subscribe(data => console.log(data));
    this.router.navigate(['/chi-tiet'], {queryParams: {bo_de: subjectname}});
  }

  onClose(){
    this.router.navigate(['/bo-de']);
  }
}
