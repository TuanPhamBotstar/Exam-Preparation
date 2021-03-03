import { Component, OnInit } from '@angular/core';
import { ResApiService } from '../../services/res-api.service';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { flatten } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css']
})
export class AnalyticComponent implements OnInit {
  author: string;
  time: string;
  results: any;
  userArr: any;
  rangeTimes = ['day', 'week', 'month', 'all'];
  constructor(
    private resApi: ResApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
            labelString: "Users",
            fontSize: 16,
          },
          ticks: {
            // steps: 10,
            // stepValue: 10,
            // max: 30,
            min: 0
          }
        },
      ],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Date",
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
    { data: [], label: 'Users'},
  ];
  ngOnInit(): void {
    this.author = JSON.parse(localStorage.getItem('user')).user_id;
    this.activatedRoute.queryParams.subscribe(data => {
      this.time =data.time ? data.time: '';
      if(data.time){
        this.resApi.getResultByAuthor(this.author, data.time).subscribe(data => {
          console.log('get results by author',data)
          this.results = data.results;
          this.barChartLabels = [];
            this.barChartData[0].data = [];
          if(this.results){
            this.userArr = data.userArr;
            this.barChartLabels = data.dateArr;
            this.barChartData[0].data = data.userArr;
          }
          console.log(this.barChartData)
  
        })
      }
    })
 
  }
  toTimes(times){
    this.router.navigate(['/overviews'],
     {queryParams: {time: times}})
  }

}
