import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';
import { AuthService } from 'src/app/shared/Services/auth/auth.service';
import { SubjectService } from '../../services/subject.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {
  confirmBlock: boolean = false;
  caret_down: boolean = false;
  submenu: boolean = false;
  username: any;
  subject_id: string;
  public show: boolean = true;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public auth: AuthService,
    public authApi: AuthApiService,
    public subjectService: SubjectService,
    private _location: Location,
  ) { }
  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('user')).username;
    if (!this.username) {
      const user_id = JSON.parse(localStorage.getItem('user')).user_id;
      if (user_id) {
        this.authApi.getUsername(user_id).subscribe(data => {
          this.username = data;
        })
      }
    }
    this.activatedRoute.queryParams.subscribe(data => {
      if (data.bo_de) {
        this.subject_id = data.bo_de;
        this.caret_down = true;
      }
      else {
        this.caret_down = false;
      }
    })
  }
  toSubject() {
    this.router.navigate(['/bo-de'], { queryParams: { trang: 1 } });
  }
  // toggle frofile side bar
  onToggle() {
    this.show = !this.show;
  }
  // toggle submenu
  onToggleSubmenu() {
    this.submenu = !this.submenu;
  }
  onAddQuestion() {
    if (1) {
      this.router.navigate(['/chi-tiet/them-cau-hoi'], { queryParams: { bo_de: this.subject_id } });
    }
  }
  overviewTests() {
    if (1) {
      this.router.navigate(['chi-tiet/de-thi'], { queryParams: { bo_de: this.subject_id } });
    }
  }
  onDelSubject() {
    this.subjectService.removeSubject(this.subject_id);
    this._location.back();
    this.confirmBlock = !this.confirmBlock;
  } 
  openConfirmBlock() {
    if (1) {
      this.confirmBlock = !this.confirmBlock;
    }
  }
}
