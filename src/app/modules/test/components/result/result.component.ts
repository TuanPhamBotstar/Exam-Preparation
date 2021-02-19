import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { TestApiService } from 'src/app/modules/subject/services/test-api.service';
import { ResApiService } from '../../services/res-api.service';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public active: number;
  public user_id: string;
  public results: any;
  public test: any;
  public chosenAnswers: any;
  public correctAnswer: any;
  public alphaArr = ['A', 'B', 'C', 'D', 'E', 'F'];
  // your res chart
  public pieChartLabels: Label[]= ['Not Good', 'Good', 'Excellent'];
  public pieChartData = [];
  public pieChartType: any = 'pie';
  pieChartOptions: ChartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
        labels: {
        render: 'percentage',
        // fontColor: ['green', 'white', 'red'],
        fontSize: 16,
        precision: 0
        },
        datalabels:{
          display: false
        }
      },
  };
  pieChartLegend: boolean;
  pieChartPlugins = [pluginLabels];
  levelPoint = { 
    bad: 0 ,
    good: 0 ,
    excellent: 0 
  };
  total: number = 0;
  constructor(
    private resApi: ResApiService,
    private testApi: TestApiService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.user_id = user.user_id;
      this.resApi.getResults(this.user_id).subscribe(data => {
        console.log(data)
        this.results = data;
        this.results.sort((a, b) => {
          if (a.point === b.point) {
            return a.time > b.time ? 1 : -1;
          }
          return b.point > a.point ? 1 : -1
        })
        data.forEach(item => {
          if(item.point > 80){
            this.levelPoint.excellent ++;
          }
          else if(item.point > 50){
            this.levelPoint.good ++;
          }
          else{
            this.levelPoint.bad ++;
          }
        })
        this.total = data.length;
        this.pieChartData = [
          this.levelPoint.bad, 
          this.levelPoint.good, 
          this.levelPoint.excellent,
        ];
        console.log(this.levelPoint)
      })
    }
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

}
