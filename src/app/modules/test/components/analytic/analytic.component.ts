import { Component, OnInit } from '@angular/core';
import { ResApiService } from '../../services/res-api.service';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { flatten } from '@angular/compiler';
@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css']
})
export class AnalyticComponent implements OnInit {
  author: string;
  results: any;
  testsArr: any = [];
  dataAnalytic: any = [];
  constructor(
    private resApi: ResApiService,
  ) { }
  // ng2 chart
  public barChartOptions: ChartOptions = {
    // scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      labels:false,
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    scales: {
      yAxes: [  
        {
        position:'left',
        id:'yAxes1',
        scaleLabel: {
          display: true,
          labelString: "Điểm Thi Trung Bình",
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
        position:'right',
        id:'yAxes2',
        scaleLabel: {
          display: true,
          labelString: "Số Người Thi",
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
    xAxes : [ {
      scaleLabel: {
        display: true,
        labelString: "Đề Thi",
        fontSize: 16,
       },
      gridLines : {
          display : false
      }
      } ]
    }
  };
  public barChartPlugins: any =[pluginDataLabels];
  public barChartLabels = [];
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Điểm Thi Trung Bình', yAxisID: 'yAxes1'},
    { data: [], label: 'Số Người Thi', yAxisID: 'yAxes2'}
    // {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  ngOnInit(): void {
    this.author = JSON.parse(localStorage.getItem('user')).user_id;
    // console.log(localStorage.getItem('user'))
    if (this.author) {
      this.resApi.getResultByAuthor(this.author).subscribe(data => {
        console.log(data)
        this.results = data;
        data.forEach(element => {
          if (!this.testsArr.includes(element.test_id)) {
            this.testsArr.push(element.test_id)
            this.dataAnalytic.push({ nameTest: element.nameTest, count: 1, point: element.point })
          }
          else {
            let idx = this.testsArr.indexOf(element.test_id);
            this.dataAnalytic[idx].count++;
          }
        });
        console.log(this.testsArr)
        console.log(this.dataAnalytic)
        this.dataAnalytic.forEach((item) => {
          this.barChartLabels.push(item.nameTest.toUpperCase())
          this.barChartData[0].data.push((item.point / item.count).toFixed(2));
          this.barChartData[1].data.push(item.count);
        })
        console.log(this.barChartData)
        // this.results.sort((a, b) => {
        //   if (a.point === b.point) {
        //     return a.time > b.time ? 1 : -1;
        //   }
        //   return b.point > a.point ? 1 : -1
        // })
      })
    }
  }

}
