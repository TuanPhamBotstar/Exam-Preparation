import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../../shared/models/user.model'
import { AuthService } from 'src/app/shared/Services/auth/auth.service';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  isExist: number = 0;
  subscription: Subscription;
  public signUpForm: FormGroup;

  constructor(
    public activatedRouter: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public auth: AuthService,
    private authApi: AuthApiService,
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  createSignUpForm() {
    this.signUpForm = this.formBuilder.group(
      {
        fullname: ['', [Validators.required]],
        username: ['',
          {
            Validators: [Validators.required, Validators.pattern("^((?!@).)*$")],
          }
        ],
        email: ['',
          {
            Validators: [Validators.required, Validators.pattern("^\S+@\S+$")],
            // updateOn:'blur'
          }
        ],
        password: ['', [Validators.required]]
      }
    );
    this.signUpForm.valueChanges.subscribe(() => {
      this.isExist = 0;
    })
  }
  redirectLogin() {
    this.router.navigate(['dang-nhap'], { relativeTo: this.activatedRouter.parent });
  }
  onSignUp(username: string, password: string, fullname: string, email: string) {
    let newUser = new User('', username, password, fullname, email);
    console.log(newUser);
    // this.authApi.addUser(newUser).subscribe(data => console.log(data));
    this.auth.addUser(newUser);
    this.subscription = this.auth.getUser().subscribe(data => {
      console.log(data)
      if (data.isAuthenticated) {
        this.isExist = 1;
        setTimeout(() => {
          this.redirectLogin()
        }, 2000);
      }
      else if(data.isAuthenticated === false){
        this.isExist = -1;
      }
    });
  }
}
