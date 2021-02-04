import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
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
    public router: Router,
  ) { }

  ngOnInit(): void {
    if (this.subject_id) {
      this.testService.loadTests(this.subject_id);
      this.testService.getTests()
        .subscribe(data => {
          console.log(data)
          this.tests = data.test.list;
        })
    }
  }
  getSubject_id(id: string, subjectname: string) {
      this.subject_id = id;
      this.subjectname = subjectname;
      console.log(this.subject_id)
  }
  getDetailTest(i: number) {
    this.router.navigate(['/chi-tiet/de-thi/noi-dung-de-thi'], { queryParams: {bo_de: this.subject_id, de_thi: this.tests[i]._id, trang: 1 } });
  }
  onCreateTest() {
    this.router.navigate(['/chi-tiet/de-thi/tao-de-thi'], { queryParams: { bo_de: this.subject_id}});
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
