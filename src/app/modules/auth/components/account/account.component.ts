import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isSignIn:boolean = true;
  constructor(
    public activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
  //  this.activatedRoute.url.subscribe(()=>console.log(this.activatedRoute.url));
  }

}
