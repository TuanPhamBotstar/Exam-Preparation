import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, Subscription, SubscriptionLike } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { SubjectApiService } from '../../services/subject-api.service ';
import { SubjectService } from '../../services/subject.service';
import { CreateSubjectComponent } from '../create-subject/create-subject.component';
// search
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { debounce } from 'lodash';
@Component({
  selector: 'app-subject-overiew',
  templateUrl: './subject-overiew.component.html',
  styleUrls: ['./subject-overiew.component.css']
})
export class SubjectOveriewComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  page: number;
  totalPage: number;
  perPage: number = 14;
  total: number;
  user_id: string;
  searching: boolean = false;
  resSearchEmpty: boolean = false;
  public subjects: any;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private subjectApi: SubjectApiService,
    private subjectService: SubjectService,

  ) {
    this.onSearch = debounce(this.onSearch, 500)
   }

  ngOnInit(): void {
    this.user_id = JSON.parse(localStorage.getItem('user')).user_id;
    this.activatedRoute.queryParams.subscribe(data => {
      this.page = data.page;
      this.subjectService.loadSubjects(this.user_id, this.page);
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
  onSearch(value){
    const txtSearch = value.trim();
    if(txtSearch){
      this.searching = true;
      this.subjectApi.getSubjectsByName(this.user_id, txtSearch).subscribe(data => {
        if(data.length === 0){ 
          this.resSearchEmpty = true;
        }
        else{
          this.resSearchEmpty = false;
        }
        console.log('res get subject by name',data)
        this.subjects = data;
        this.total = data.length;
        this.totalPage = Math.ceil(this.total/ this.perPage);
      })
    }
    else{
      this.subscription = this.subjectService.getSubject().subscribe(data => {
        this.searching = false;
        this.resSearchEmpty = false;
        this.subjects = data.subject.list;
        this.total = data.subject.total;
        this.totalPage = Math.ceil(this.total/ this.perPage);
      });
    }
  }

  onCreateSubject() {
    console.log('create subject test')
    this.router.navigate(['/subjects/create-subject'], {queryParams: {page: this.page}});
  }
  detailSubject(subject_id) {
    this.router.navigate(['/subject/dashboard'], { queryParams: { subject: subject_id } });
  }
  //
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
