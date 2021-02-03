import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/shared/Services/auth/auth-api.service';
import { AuthService } from 'src/app/shared/Services/auth/auth.service';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {
  username: any;
  public show: boolean = true;
  constructor(
    public router: Router,
    public auth: AuthService,
    public authApi: AuthApiService,
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
  }
  toSubject() {
    this.router.navigate(['/bo-de'],{ queryParams: {trang: 1}});
  }
  onLogOut() {
    localStorage.clear();
    localStorage.removeItem('user');
    console.log('logout')
    this.router.navigate(['/gioi-thieu']);
  }
  onToggle() {
    this.show = !this.show;
  }
}
