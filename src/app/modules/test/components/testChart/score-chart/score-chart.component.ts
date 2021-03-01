import { Component, OnInit, Input } from '@angular/core';
import { ResApiService } from '../../../services/res-api.service';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
@Component({
  selector: 'app-score-chart',
  templateUrl: './score-chart.component.html',
  styleUrls: ['./score-chart.component.css']
})
export class ScoreChartComponent implements OnInit {
  @Input() test_id: string;
  @Input() subject_id: string;
  @Input() time: string;
  emit: any;
  rangeTimes = ['day', 'week', 'month', 'all'];
  startDate: any;
  endDate: any;
  evaluate: any;
  results: any = null;
  avgScore: number = 0;
  public pieChartLabels: Label[] = ['Weak', 'Below Average', 'Average', 'Good', 'Excellent']
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
      datalabels: {
        display: false
      }
    },
  };
  pieChartLegend: boolean;
  pieChartPlugins = [pluginLabels];
  levelPoint = {
    weak: 0,
    below_average: 0,
    average: 0,
    good: 0,
    excellent: 0
  };
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.emit = new BehaviorSubject([]);
    if (this.emit) {
      this.emit.subscribe(data => {
        console.log('score chart', data)
        this.results = data;
        this.levelPoint = {
          weak: 0,
          below_average: 0,
          average: 0,
          good: 0,
          excellent: 0
        };
      })
    }
  }
  setResults(results: any) {
    this.emit.next(results);
  }
  setEvaluate(evaluate: any, avgScore: any){
    this.evaluate = evaluate;
    this.avgScore = avgScore;
    if(this.evaluate){
      this.pieChartData = [];
      for(const property in evaluate){
        this.pieChartData.push(evaluate[property]);
      }
    }
  }
  toTimes(times){
    this.router.navigate(['/subject/tests/content-test'],
     {queryParams: {subject: this.subject_id, test: this.test_id, page: 1, time: times}})
  }
}
