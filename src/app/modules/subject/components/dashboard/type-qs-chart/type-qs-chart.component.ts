import { Component, Input, OnInit } from '@angular/core';
import { SubjectApiService } from '../../../services/subject-api.service ';
// ng2-chart
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label } from 'ng2-charts';
import * as pluginLabels from 'chartjs-plugin-labels';
import { TestService } from '../../../services/test.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-type-qs-chart',
  templateUrl: './type-qs-chart.component.html',
  styleUrls: ['./type-qs-chart.component.css']
})
export class TypeQsChartComponent implements OnInit {
  @Input() author: string;
  @Input() subject_id: string;
  totalQs: number;
  totalTests: number;
  results: any;
  public pieChartLabels: Label[]= ['Esay','Normal', 'Hard'];
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

  constructor(
    private subjectApi: SubjectApiService,
    private testService: TestService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.testService.loadTests(this.subject_id);
    this.testService.getTests().subscribe(data => {
      if(!data.test.loading && data.test.list){
        this.totalTests = data.test.list.length;
      }
    })
    this.subjectApi.getQtyQs(this.subject_id).subscribe(data => {
      console.log(data)
      if(data){
        this.pieChartData = [
          data.easyQty,
          data.normalQty,
          data.hardQty, 
        ];
        this.totalQs = this.pieChartData.reduce((acc, curr) =>  acc + curr);
        console.log(this.pieChartData)
        }
      })
  }

  // overviewTests() {
  //   console.log('on overview tests')
  //   this.router.navigate(['subject/tests'], { queryParams: { subject: this.subject_id } });
  // }
  // allQuestions() {
  //   this.router.navigate(['subject/questions'], { queryParams: { subject: this.subject_id, page: 1 } });
  // }
}
