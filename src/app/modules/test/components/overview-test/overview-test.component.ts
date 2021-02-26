import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from 'src/app/modules/subject/services/test.service';

@Component({
  selector: 'app-overview-test',
  templateUrl: './overview-test.component.html',
  styleUrls: ['./overview-test.component.css']
})
export class OverviewTestComponent implements OnInit {
  public show:boolean = true;
  public tests: any = [];
  public subject_id: string;
  public subjectname: string;
  constructor(
    private _location: Location,
    private testService: TestService,
    private activatedRouter: ActivatedRoute,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe(data => {
      this.subject_id = data.subject;
      if (this.subject_id) {
        this.testService.loadTests(this.subject_id);
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
}
