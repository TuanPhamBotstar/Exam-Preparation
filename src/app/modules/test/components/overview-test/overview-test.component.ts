import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';

@Component({
  selector: 'app-overview-test',
  templateUrl: './overview-test.component.html',
  styleUrls: ['./overview-test.component.css']
})
export class OverviewTestComponent implements OnInit {
  public tests:any;
  public subject_id:string;
  constructor(
    private _location:Location,
    private testApi: TestApiService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    if(this.subject_id){
      this.testApi.getTestsBySubject_id(this.subject_id).subscribe(data =>{
        console.log(data)
        this.tests = data;
      })
    }
  }
  getSubject_id(id:string){
    this.subject_id = id;
    console.log(this.subject_id)
  }
  getDetailTest(){
    this.router.navigate(['/chi-tiet/de-thi/noi-dung']);
  }
  onCreateTest(){
    this.router.navigate(['/chi-tiet/de-thi/tao-de-thi']);
  }
  onBack(){
    this._location.back();
  }
  onActive(childCpn){
    
  }
}
