import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';
import { AuthService } from 'src/app/shared/Services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn:number = 0;
  username: any;
  childCpn:any;
  constructor(
    public authApi: AuthApiService,
    public auth: AuthService,
  ) { }

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
}
