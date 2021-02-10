import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';
import { AuthService } from 'src/app/shared/Services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class HomeComponent implements OnInit {
  isShowChangeProfileBox: boolean = false;
  demo: boolean = false;
  isSignedIn:number = 0;
  username: any;
  childCpn:any;
  constructor(
    public authApi: AuthApiService,
    public auth: AuthService,
    public router: Router,
    private _eref: ElementRef,
  ) { }
  @ViewChild('changeProfileBox') div:ElementRef;
  ngOnInit(): void {
    this.auth.getUser().subscribe(data => {
      // console.log(data)
      const user_id = data['user_id'];
      if(user_id){
        this.authApi.getUsername(user_id).subscribe(data => {
          this.username = data;
        })
      } 
    })
    // console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user')){ 
      this.isSignedIn = 1;
      this.username = JSON.parse(localStorage.getItem('user')).username;
    }
  }
  onActive(e){
    // console.log(e)
    this.childCpn = e;
  }
  onToggleSidebar(){
    this.childCpn.onToggleSidebr();
  }
  openChangeProfile(){
    // this.div.nativeElement.setAttribute('style','display:block');
    this.demo = !this.demo;
  }
  onClick(event) {
    if(this.demo){
      this.isShowChangeProfileBox = !this.isShowChangeProfileBox
      this.demo = false;
    }
    else{
      this.isShowChangeProfileBox = false;
      this.demo = false;  
    }
   }
  onLogOut() {
    localStorage.clear();
    localStorage.removeItem('user');
    this.isShowChangeProfileBox = false;
    this.username = null;
    console.log(this.isShowChangeProfileBox)
    this.router.navigate(['/gioi-thieu']);
  }
}
