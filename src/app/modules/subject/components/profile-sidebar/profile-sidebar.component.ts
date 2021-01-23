import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {
  username:string;
  constructor(
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')).username;
  }
  toSubject(){
    this.router.navigate(['/bo-de']);
  }
  onLogOut(){
    localStorage.removeItem('user');
    console.log('logout')
    this.router.navigate(['/gioi-thieu']);
  }
}
