import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// ng2-chart
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-time',
  templateUrl: './line-time.component.html',
  styleUrls: ['./line-time.component.css']
})
export class LineTimeComponent implements OnInit {
  @Input() test_id: string;
  emit: any;
  results: any;
  dateArr: any = [];
  // line-chart
  public lineChartData: ChartDataSets[] = [
    { data: [5, 2, 1, 0, 2, 3, 1], label: 'Users' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType:any  = 'line';
  public lineChartPlugins = [];
  constructor() { }

  ngOnInit(): void {
    this.emit = new BehaviorSubject([]);
    if (this.emit) {
      this.emit.subscribe(data => {
        console.log(data)
        if(data){
          this.results = data;
          this.results.forEach((result, idx) => {
            if(this.dateArr.includes(result.date)){
              this.dateArr[this.dateArr.indexOf(result.date)]++;
            }
            else{
              this.dateArr[idx] = 1;
            }
          });
          console.log(this.dateArr)
        }
      });
    }
  }
  setResults(results: any) {
    this.emit.next(results)
  }
}
