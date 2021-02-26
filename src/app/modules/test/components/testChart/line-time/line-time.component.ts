import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// ng2-chart
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-line-time',
  templateUrl: './line-time.component.html',
  styleUrls: ['./line-time.component.css']
})
export class LineTimeComponent implements OnInit {
  // @Input() startDate: any;
  // @Input() endDate: any;
  emit: any;
  results: any;
  dateArr: any;
  dayArr: any;
  userArr: any;
  startDate: any;
  endDate: any;
  // line-chart
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Users',lineTension: 0, },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
    scales: {
      yAxes: [
        {        
          ticks: {
            // steps: 10,
            // stepValue: 10,
            max: 10,
            min: 0
          }
        },
      ],
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: any = 'line';
  public lineChartPlugins = [];
  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.emit = new BehaviorSubject([]);
    if (this.emit) {
      this.emit.subscribe(data => {
        if (data) {
          console.log(data)
          this.results = data;
        }
      });
    }
  }
  setResults(results: any) {
    this.emit.next(results)
  }
  setDate(dateArr, userArr) {
    this.dateArr = dateArr;
    this.userArr = userArr;
    this.lineChartData[0].data = [];
    this.lineChartLabels = [];
    if (this.dateArr) {
      this.lineChartData[0].data = userArr;
      this.lineChartLabels = dateArr;
    }
  }
}
