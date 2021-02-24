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
  page: number;
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
      if (data.subject) {
        this.subject_id = data.subject;
        this.page = data.page;
        this.caret_down = true;
        this.submenu = true;
      }
      else {
        this.caret_down = false;
        this.submenu = false;
      }
    })
  }
  toSubject() {
    this.router.navigate(['/subjects'], { queryParams: { page: 1 } });
  }
  // toggle frofile side bar
  onToggle() {
    this.show = !this.show;
  }
  // toggle submenu
  onToggleSubmenu() {
    this.submenu = !this.submenu;
  }
  onDashboard() {
    this.router.navigate(['detail/dashboard'], { queryParams: { subject: this.subject_id } });
  }
  onAddQuestion() {
    this.router.navigate(['/detail/add-question'], { queryParams: { subject: this.subject_id, page: this.page } });
  }
  overviewTests() {
    this.router.navigate(['detail/tests'], { queryParams: { subject: this.subject_id } });
  }
  allQuestions() {
    this.router.navigate(['detail/questions'], { queryParams: { subject: this.subject_id, page: 1 } });
  }
  onDelSubject() {
    this.subjectService.removeSubject(this.subject_id);
    this.router.navigate(['/subjects'], { queryParams: { page: this.page } });
    this.confirmBlock = !this.confirmBlock;
  }
  openConfirmBlock() {
    this.confirmBlock = !this.confirmBlock;
  }
}
