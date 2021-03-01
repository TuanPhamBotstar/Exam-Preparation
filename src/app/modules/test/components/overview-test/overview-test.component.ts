import { Component, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/modules/subject/services/test.service';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { debounce } from 'lodash';
@Component({
  selector: 'app-overview-test',
  templateUrl: './overview-test.component.html',
  styleUrls: ['./overview-test.component.css']
})

export class OverviewTestComponent implements OnInit {
  subscription: Subscription;
  searching: boolean = false;
  resSearchEmpty: boolean =false;
  show:boolean = true;
  tests: any = [];
  author: string;
  subject_id: string;
  subjectname: string;
  constructor(
    private _location: Location,
    private testService: TestService,
    private testApi: TestApiService,
    private activatedRouter: ActivatedRoute,
    public router: Router,
  ) { 
    this.onSearch = debounce(this.onSearch, 500);
  }

  ngOnInit(): void {
    this.author = JSON.parse(localStorage.getItem('user')).user_id;
    this.activatedRouter.queryParams.subscribe(data => {
      this.subject_id = data.subject;
      if (this.subject_id) {
        this.testService.loadTests(this.author, this.subject_id);
        this.testService.getTests()
          .subscribe(data => {
            if(!data.test.loading && data.test.list){
              console.log(data)
              this.tests = data.test.list;
            }
          })
      }
    })  
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  setSubject_id(id: string, subjectname: string) {
      // this.subject_id = id;
      this.subjectname = subjectname;
      console.log(this.subject_id)
  }
  
  getDetailTest(i: number) {
    this.router.navigate(['/subject/tests/content-test'], { queryParams: {subject: this.subject_id, test: this.tests[i]._id, page: 1, time: 'all' } });
  }
  onCreateTest() {
    this.router.navigate(['/subject/tests/create-test'], { queryParams: { subject: this.subject_id}});
  }
  onBack() {
    this._location.back();
  }
  onActive(childCpn) {
    this.show = false;
    console.log(childCpn)
    childCpn.getSubject_id(this.subject_id);
  }
  onDeactivate() {
    this.show = true;
  }
  onSearch(value){
    const txtSearch = value.trim();
    if(txtSearch){
      this.searching = true;
      this.testApi.getTestsByName(this.author, this.subject_id, txtSearch).subscribe(data => {
        if(data.length === 0){ 
          this.resSearchEmpty = true;
        }
        else{
          this.resSearchEmpty = false;
        }
        console.log('res get subject by name',data)
        this.tests = data;
      })
    }
    else{
      this.subscription = this.testService.getTests().subscribe(data => {
        this.searching = false;
        this.resSearchEmpty = false;
        this.tests = data.test.list;
      });
    }
  }
}
