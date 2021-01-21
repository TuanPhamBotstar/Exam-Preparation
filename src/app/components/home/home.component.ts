import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isSignedIn:number = 0;
  username: string;
  constructor(
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public authApi: AuthApiService,
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.isSignedIn = 1;
      this.username = JSON.parse(localStorage.getItem('user')).username;
      console.log(this.username)
    }
  }

}
