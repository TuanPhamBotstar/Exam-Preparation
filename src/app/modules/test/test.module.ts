import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './components/test/test.component';
import { OverviewTestComponent } from './components/overview-test/overview-test.component';
import { TestingComponent } from './components/testing/testing.component';
import { ResultComponent } from './components/result/result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalyticComponent } from './components/analytic/analytic.component';
// ng2 chart
import { ChartsModule } from 'ng2-charts';
import { AnalyticsChartComponent } from './components/analytics-chart/analytics-chart.component';
import { ResultChartComponent } from './components/result-chart/result-chart.component';
import { ScoreChartComponent } from './components/testChart/score-chart/score-chart.component';
import { LineTimeComponent } from './components/testChart/line-time/line-time.component';
@NgModule({
  declarations: [
    TestComponent,
    OverviewTestComponent,
    TestingComponent,
    ResultComponent,
    AnalyticComponent,
    AnalyticsChartComponent,
    ResultChartComponent,
    ScoreChartComponent,
    LineTimeComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TestComponent,
  ]
})
export class TestModule { }
