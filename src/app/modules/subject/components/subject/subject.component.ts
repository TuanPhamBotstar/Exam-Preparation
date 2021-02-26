import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
//viewChild
import { ProfileSidebarComponent } from '../profile-sidebar/profile-sidebar.component';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit  {
  public colMd: number = 10;
  isOpen: Boolean = false;
  constructor(
    public router:Router,
  ) { }
  @ViewChild(ProfileSidebarComponent) child: ProfileSidebarComponent;
  // ngAfterViewInit(){
  //   this.child.onToggle()
  // }
  ngOnInit(): void {
  }
 
  onLogOut(){
    localStorage.removeItem('user');
    console.log('logout')
    this.router.navigate(['/gioi-thieu']);
  }
 
 
  openPopup(){
    this.isOpen = true;
  }
  closePopup(){
    this.isOpen = false;
  }
  getShowSidebar(value){
    console.log(value)
    this.colMd = 10;
  }
  onToggleSidebr(){
    this.child.onToggle();
    if(this.colMd === 10){
      this.colMd = 12;
    }
    else{
      this.colMd = 10;
    }
  }
}
