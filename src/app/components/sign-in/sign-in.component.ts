import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import {Observable,Subscription } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isSignIn: boolean = true;
  isSignUp: boolean = false;
  public signInForm:FormGroup;
  public signUpForm:FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.isSignIn)
    this.activatedRoute.params.subscribe(data => {console.log(data);if(1){this.createSignUpForm()}});
    this.createSignInForm();
  }

  onSignUp() {
    this.router.navigate(['dang-ky'], { relativeTo: this.activatedRoute.parent });
    this.isSignUp = true;
    this.isSignIn = false;
    console.log('sign up', this.isSignUp);
  }
  createSignInForm(){
    this.signInForm = this.formBuilder.group(
      {
        username:[''],
        password:['']
      }
    );
  }
  createSignUpForm(){
    this.signUpForm = this.formBuilder.group(
      {
      fullname:[''],
      username:[''],
      email:[''],
      newpassword:['']
      }
    );
    console.log(this.signInForm.controls)
  }
}
