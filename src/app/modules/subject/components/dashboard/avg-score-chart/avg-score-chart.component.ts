import { Component, Input, OnInit } from '@angular/core';
import { ResApiService } from 'src/app/modules/test/services/res-api.service';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { flatten } from '@angular/compiler';
@Component({
  selector: 'app-avg-score-chart',
  templateUrl: './avg-score-chart.component.html',
  styleUrls: ['./avg-score-chart.component.css']
})
export class AvgScoreChartComponent implements OnInit {
  @Input() author: string;
  @Input() subject_id: string;
  results: any;
  testsArr: any = [];
  // dataAnalytic: any = [];
  constructor(
    private resApi: ResApiService,
  ) { }
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
            labelString: "Average score",
            fontSize: 16,
          },
          ticks: {
            // steps: 10,
            // stepValue: 10,
            max: 100,
            min: 0
          }
        },
        {
          position: 'right',
          id: 'yAxes2',
          scaleLabel: {
            display: true,
            labelString: "Quantity of users",
            fontSize: 16,
          },
          ticks: {
            // steps: 10,
            // stepValue: 10,
            max: 30,
            min: 0
          }
        },
      ],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Name test",
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
    { data: [], label: 'Average score', yAxisID: 'yAxes1' },
    { data: [], label: 'Quantity of users', yAxisID: 'yAxes2' }
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  ngOnInit(): void {
    if (this.author) {
      this.resApi.getResultBySubject(this.author, this.subject_id).subscribe(data => {
        console.log(data)
        this.results = data;
        if(this.results){
          this.results.forEach(result => {
            if(result.totalUsers > 0){
              this.barChartData[0].data.push(result.avgScore.toFixed(2));
              this.barChartData[1].data.push(result.totalUsers);
              this.barChartLabels.push(result._id.toUpperCase())
            }
          })
        }
        console.log(this.barChartData)
      })
    }
  }

}
