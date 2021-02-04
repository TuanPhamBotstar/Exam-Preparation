import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { Question } from 'src/app/modules/subject/models/question.model';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { Location } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TestService } from 'src/app/modules/subject/services/test.service';
import { TestEffects } from '../../../subject/store/effects/test.effects'
import { ofType } from "@ngrx/effects";
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  totalPage: number;
  total: number;
  page: number;
  perPage: number = 5;
  subcription: Subscription;
  isShareSuccess: boolean = false;
  public shareBox: boolean = false;
  public confirmBlock: boolean = false;
  public test_id: string;
  public subject_id: string;
  public test: any;
  public questions: Question[] = [];
  public qsOnePage: Question[] = [];
  public shareForm: FormGroup;
  constructor(
    private testApi: TestApiService,
    private testService: TestService,
    private router: Router,
    private _location: Location,
    public activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      console.log(data.de_thi)
      this.test_id = data.de_thi;
      this.subject_id = data.bo_de;
      this.page = data.trang;
      if (this.test_id && this.subject_id) {
        this.testService.loadDetaitTest(this.subject_id, this.test_id);
      }
    })
    this.subcription = this.testService.getTests().subscribe(data => {
      console.log(data.test)
      if (data.test.testing && !data.test.loading) {
        this.test = data.test.testing;
        this.questions = this.test.questions;
        this.total = this.questions.length;
        console.log(this.total)
        this.totalPage = Math.ceil(this.total/this.perPage);
        let limit = this.page * this.perPage
        let start = this.perPage * (this.page - 1)
        this.qsOnePage = [];
        for (let i = start; i < limit; i++) {
          if (i < this.total) {
            this.qsOnePage.push(this.questions[i])
          }
          else {
            break;
          }
        }
        console.log(this.qsOnePage)
      }
    })
  }
  ngOnDestroy(): void {
    if (this.subcription) {
      console.log('detail test is destroyed')
      this.subcription.unsubscribe();
    }
  }
  openConfirm() {
    this.confirmBlock = !this.confirmBlock;
    console.log('open confirm')
  }
  openShareBox() {
    this.createShareForm();
    this.shareBox = !this.shareBox;
    this.isShareSuccess = false;
  }
  onDelTest() {
    // this.testApi.delTest(this.test_id).subscribe(data => console.log(data));
    this.testService.deleteTest(this.test_id);

    this.onBack();
  }
  onShareTest() {
    this.shareForm.value.test_id = this.test_id;
    console.log(this.shareForm.value)
    this.testService.putTypeCode(this.shareForm.value);
    this.testService.getTests().subscribe(data => {
      console.log(data.test)
      this.isShareSuccess = data.test.isShareSuccess;
    })
    // this.testApi.putTypeCode(this.shareForm.value).subscribe(data => {
    //   console.log(data)
    // });
  }
  copyToClipboard(link) {
    link.select();
    document.execCommand('copy');
  }
  onBack() {
    this._location.back();
  }
  getSubject_id(id) {
    console.log('not required', id)
  }
  createShareForm() {
    this.shareForm = this.formBuilder.group({
      link: [`http://localhost:4200/lam-bai-thi/?de_thi=${this.test_id}`],
      listEmail: [''],
      haveCode: [false]
    })
  }
  //pagination
  arrayV() {
    return Array(this.totalPage);
  }
  onPrevious() {
    if (this.page > 1) {
      this.page--;
    }
    this.router.navigate(['/chi-tiet/de-thi/noi-dung-de-thi'],
      { queryParams: { bo_de: this.subject_id, de_thi: this.test_id, trang: this.page } });
  }
  onNext() {
    if (this.page < this.totalPage) {
      this.page++;
    }
    this.router.navigate(['/chi-tiet/de-thi/noi-dung-de-thi'],
      { queryParams: { bo_de: this.subject_id, de_thi: this.test_id, trang: this.page } });
  }
}
