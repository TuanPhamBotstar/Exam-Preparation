import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../../../shared/models/user.model'
import { AuthService } from 'src/app/shared/Services/auth/auth.service';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isExist:number = 0;
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
  }
  redirectLogin(){
    this.router.navigate(['dang-nhap'],{relativeTo:this.activatedRouter.parent});
  }
  onSignUp(username: string, password: string, fullname: string, email: string) {
    let newUser = new User('', username, password, fullname, email);
    console.log(newUser);
    // this.authApi.addUser(newUser).subscribe(data => console.log(data));
    this.auth.addUser(newUser);
    this.auth.getUser().subscribe(data => {
      console.log(data)
      if(data['isAuthenticated'] && !data['loading']){
        this.isExist = 1;
        setTimeout(() => {
          this.redirectLogin()
        }, 2000);
      }
      else{
        this.isExist = -1;
      }
    });
  }

}
