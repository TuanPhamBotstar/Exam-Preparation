import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { ResApiService } from '../../services/res-api.service';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import { ResultChartComponent } from '../result-chart/result-chart.component';
//  BehaviorSubject 
import { BehaviorSubject } from 'rxjs';

const setData = new BehaviorSubject(123);
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit, AfterViewInit {
  setData: any = null;
  time: string;
  rangeTimes = ['day', 'week', 'month', 'all'];
  public startDate: any;
  public endDate: any;
  public active: number;
  public user_id: string;
  public results: any;
  public test: any;
  public chosenAnswers: any;
  public correctAnswer: any;
  public alphaArr = ['A', 'B', 'C', 'D', 'E', 'F'];
  constructor(
    private resApi: ResApiService,
    private testApi: TestApiService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }
  @ViewChild(ResultChartComponent) child: ResultChartComponent;
  ngAfterViewInit(){
    if(this.setData){
      this.setData.subscribe(data => {
        this.child.setResults(data)
      })
    }
  }
  ngOnInit(): void {
    
    this.setData = new BehaviorSubject([]);
    const user = JSON.parse(localStorage.getItem('user'));
    this.activatedRouter.queryParams.subscribe(data => {
      this.time = data.time;
      if (user) {
        this.user_id = user.user_id;
        this.resApi.getResults(this.user_id, this.time).subscribe(data => {
          console.log(data)
          this.startDate = data.startDate;
          this.endDate = data.endDate;
          this.setData.next(data.results);
        })
        this.setData.subscribe(data => {
          this.results = data;
          this.results.sort((a, b) => {
            if (a.point === b.point) {
              return a.time > b.time ? 1 : -1;
            }
            return b.point > a.point ? 1 : -1
          })
        })
      }
    })
    
  }
  viewChosenAnswer(test_id, chosenAnswers, correctAnswer, i) {
    this.active = i;
    this.chosenAnswers = chosenAnswers;
    console.log(this.correctAnswer)
    this.correctAnswer = correctAnswer;
    this.testApi.getTesting(test_id).subscribe(data => {
      this.test = data;
    })
  }
  closeDetailRes() {
    this.test = null;
    this.active = null;
  }
  toTimes(times){
    this.router.navigate(['/activity-logs'], {queryParams: {time: times}})
  }
}
