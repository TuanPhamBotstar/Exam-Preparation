import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.css']
})
export class IntroduceComponent implements OnInit {

  constructor(
    public activatedRoute:ActivatedRoute,
    public router:Router,
  ) { }

  ngOnInit(): void {
  }
  onSignUp(){
    this.router.navigate(['/account/sign-up'],{relativeTo:this.activatedRoute});
  }
}
