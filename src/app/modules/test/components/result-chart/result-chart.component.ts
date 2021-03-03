import { Component, OnInit, ViewChild } from '@angular/core';
//  BehaviorSubject 
import { BehaviorSubject } from 'rxjs';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
@Component({
  selector: 'app-result-chart',
  templateUrl: './result-chart.component.html',
  styleUrls: ['./result-chart.component.css']
})
export class ResultChartComponent implements OnInit {
  emit: any;
  results: any;
  total: number = 0;
  highestScore: number;
  lowestScore: number;
  avgScore: number = 0;
  totalScore: number = 0;
  public pieChartLabels: Label[]= ['Weak','Below Average', 'Average', 'Good', 'Excellent'];
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
  public chartColors: any[] = [
    { 
      backgroundColor:["#FF7360", "#e7eca3", "#bca9e1", "#a4c5ea", "#9de19a"] 
    }];
  pieChartPlugins = [pluginLabels];
  levelPoint = { 
    weak: 0,
    below_average: 0,
    average: 0 ,
    good: 0 ,
    excellent: 0 
  };
  constructor() { }

  ngOnInit(): void {
    console.log(this.pieChartData)
    this.emit = new BehaviorSubject([]);
    this.emit.subscribe(data => {
      this.results = data;
      this.levelPoint = { 
        weak: 0,
        below_average: 0,
        average: 0 ,
        good: 0 ,
        excellent: 0 
      };
    if(data){
      this.totalScore = 0;
      this.total = 0;
      data.forEach(item => {
        this.totalScore += item.point;
        this.total++;
        if(item.point >= 85){
          this.levelPoint.excellent ++;
        }
        else if(item.point >= 70){
          this.levelPoint.good ++;
        }
        else if(item.point >= 55){
          this.levelPoint.average ++;
        }
        else if(item.point >= 40){
          this.levelPoint.below_average ++;
        }
        else{
          this.levelPoint.weak ++;
        }
      })
      console.log(this.totalScore, this.total)
      this.avgScore = +(this.totalScore/this.total).toFixed(2);
      // this.total = data.length;
      this.pieChartData = [
        this.levelPoint.weak,
        this.levelPoint.below_average,
        this.levelPoint.average, 
        this.levelPoint.good, 
        this.levelPoint.excellent,
      ];
    }
    })
  }
  setResults(results: any){
    this.emit.next(results)
    if(results.length > 0){
      this.total = results.length;
      this.highestScore = results[0].point;
      this.lowestScore = results[this.total-1].point;
    } 
  }

}
