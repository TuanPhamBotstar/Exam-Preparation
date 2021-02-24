import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResApiService } from 'src/app/modules/test/services/res-api.service';
import { AvgScoreChartComponent } from './avg-score-chart/avg-score-chart.component';
import { TypeQsChartComponent } from './type-qs-chart/type-qs-chart.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  setData: any = null;
  author: string;
  subject_id: string;
  constructor(
    private resultApi: ResApiService,
    private activatedRoute: ActivatedRoute,
  ) { }
 
  ngOnInit(): void {
    console.log('dashboard init')
    this.author = JSON.parse(localStorage.getItem('user')).user_id;
    this.activatedRoute.queryParams.subscribe(data => {
      if(data.subject){
        this.subject_id = data.subject;
      }
    })

  }

}
