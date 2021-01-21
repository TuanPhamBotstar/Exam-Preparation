import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit(): void {
    this.createSubjectFrom();
  }
  createSubjectFrom() {
    this.subjectForm = this.formBuilder.group({
      subjectname: ['', [Validators.required]]
    })
  }
  onAddQuestion() {
    console.log('add question')
    this.router.navigate(['/them-cau-hoi']);
  }

  onClose(){
    this.router.navigate(['/']);
  }
}
