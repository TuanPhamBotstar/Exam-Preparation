import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { flatten } from '@angular/compiler';
@Component({
  selector: 'app-questions-analytics',
  templateUrl: './questions-analytics.component.html',
  styleUrls: ['./questions-analytics.component.css']
})
export class QuestionsAnalyticsComponent implements OnInit {

  emit: any;
  results: any = null;
  userScores: any = null;
  constructor() { }
  // ng2 chart
  public barChartOptions: ChartOptions = {
    // scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      labels: false,
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    scales: {
      yAxes: [
        {
          position: 'left',
          id: 'yAxes1',
          scaleLabel: {
            display: true,
            labelString: "Users",
            fontSize: 16,
          },
          ticks: {
            // steps: 10,
            // stepValue: 10,
            max: 10,
            min: 0
          }
        },
      ],
      xAxes: [{
        scaleLabel: {
          display: true,
          // labelString: "Score",
          fontSize: 16,
        },
        gridLines: {
          display: false
        }
      }]
    }
  };
  public barChartPlugins: any = [pluginDataLabels];
  public barChartLabels = [];
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Correct'},
    { data: [], label: 'InCorrect'},
  ];
  ngOnInit(): void {
    this.emit = new BehaviorSubject([]);
    if (this.emit) {
      this.emit.subscribe(data => {
        console.log('score bar chart',data)
        this.results = data;
      });
    }
  }
  setResults(results: any) {
    this.emit.next(results);
  }
  setCorrectQty(staticQuestions: any){
    if(staticQuestions){
      
      this.barChartLabels = Array.from({length: staticQuestions.totalQs}, (_, i) => `Question ${i + 1}`);
      this.barChartData[0].data = staticQuestions.correctQty;
      this.barChartData[1].data = staticQuestions.inCorrectQty;
    }
  }

}