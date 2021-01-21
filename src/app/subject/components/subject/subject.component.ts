import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  public subjectForm: FormGroup;
  isOpen: Boolean = false;
  constructor(
    public router:Router,
    public formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createSubjectFrom();
  }
  createSubjectFrom(){
    this.subjectForm = this.formBuilder.group({
      subjectname: ['',[Validators.required]]
    })
  }

  onLogOut(){
    localStorage.removeItem('user');
    console.log('logout')
    this.router.navigate(['/gioi-thieu']);
  }
  onAddQuestion(){
    console.log('add question')
    this.router.navigate(['/them-cau-hoi']);
  }
  onCreateSubject(){
    console.log('create subject test')
    this.router.navigate(['/tao-bo-de']);
  }
  openPopup(){
    this.isOpen = true;
  }
  closePopup(){
    this.isOpen = false;
  }
}
