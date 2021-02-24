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
      data.forEach(item => {
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
  }

}
