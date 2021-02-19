import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/Services/auth/auth.service';
import { AuthGuard } from 'src/app/shared/Services/guard/auth-guard.guard';
import { Subscription } from 'rxjs';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public signInForm: FormGroup;
  isSignUp: boolean = false;
  isSignedUp:boolean = false;
  error: number = 0;
  constructor(
    public activatedRouter: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public auth:AuthService,
    public authApi: AuthApiService,
    private authGuard: AuthGuard,
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
    this.checkLogin();
  }
  onSignUp() {
    this.isSignUp = true;
    this.router.navigate(['dang-ky'], { relativeTo: this.activatedRouter.parent });
  }
  createSignInForm() {
    this.signInForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
    this.signInForm.valueChanges.subscribe(()=>{this.error=0})
  }
  checkLogin(){
    if(localStorage.getItem('user')){
      this.router.navigate(['']);
    }
  }
  onSignIn(username: string, password: string) {
    var currentUser, saveUser;
    if(username.indexOf('@')>-1){
      currentUser = {email: username, password: password};
      saveUser = { email: username};
    }
    else{
      currentUser = {username: username, password: password};
      saveUser = { username: username};
    }
    this.auth.login(currentUser);
    // this.auth.getUser()
    this.authApi.login(currentUser)
      .subscribe(data => {
        if(data['success']){
          // console.log('success',data);
          this.error = 1;
          saveUser.user_id = data['id'];
          // console.log(saveUser)
          if(saveUser.email){
            saveUser.username = data['username'];
          }
          localStorage.setItem('user',JSON.stringify(saveUser));
          this.router.navigate(['/tong-quan']);
        }
        else{
          this.error = -1;
        }
    });
  
  }
}
