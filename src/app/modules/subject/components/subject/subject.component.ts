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

  ngOnInit(): void {}
 

  onLogOut(){
    localStorage.removeItem('user');
    console.log('logout')
    this.router.navigate(['/gioi-thieu']);
  }
 
 
  openPopup(){
    this.isOpen = true;
  }
  closePopup(){
    this.isOpen = false;
  }
}
