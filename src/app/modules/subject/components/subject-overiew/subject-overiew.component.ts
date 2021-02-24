import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, SubscriptionLike } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { Subject } from '../../models/subject.model';
import { SubjectApiService } from '../../services/subject-api.service ';
import { SubjectService } from '../../services/subject.service';
import { CreateSubjectComponent } from '../create-subject/create-subject.component';

@Component({
  selector: 'app-subject-overiew',
  templateUrl: './subject-overiew.component.html',
  styleUrls: ['./subject-overiew.component.css']
})
export class SubjectOveriewComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  page: number;
  totalPage: number;
  perPage: number = 15;
  total: number;
  public subjects: any;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi: SubjectApiService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    const user_id = JSON.parse(localStorage.getItem('user')).user_id;
    this.activatedRoute.queryParams.subscribe(data => {
      this.page = data.page;
      this.subjectService.loadSubjects(user_id, this.page);
    });
    this.subscription = this.subjectService.getSubject().subscribe(data => {
      console.log(data)
      this.subjects = data.subject.list;
      this.total = data.subject.total;
      this.totalPage = Math.ceil(this.total/ this.perPage);
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      console.log('overview subject is destroyed')
      this.subscription.unsubscribe();
    }
  }
  onCreateSubject() {
    console.log('create subject test')
    this.router.navigate(['/subjects/create-subject'], {queryParams: {page: this.page}});
  }
  detailSubject(subject_id) {
    this.router.navigate(['/detail/dashboard'], { queryParams: { subject: subject_id } });
  }
  ///
  onActive(cpnRef) {
    cpnRef.testViewChild(12)
  }
  //pagination
  arrayV() {
    return Array(this.totalPage);
  }
  onBack() {
    if (this.page > 1) {
      this.page--;
    }
    this.router.navigate(['/subjects'], { queryParams: { page: this.page } });
  }
  onPrevious() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    this.router.navigate(['/subjects'], { queryParams: { page: this.page } });
  }
}
