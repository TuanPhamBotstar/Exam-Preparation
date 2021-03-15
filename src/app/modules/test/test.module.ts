import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './components/test/test.component';
import { OverviewTestComponent } from './components/overview-test/overview-test.component';
import { TestingComponent } from './components/testing/testing.component';
import { ResultComponent } from './components/result/result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnalyticComponent } from './components/analytic/analytic.component';
// ng2 chart
import { ChartsModule } from 'ng2-charts';
import { ConfigMenuComponent } from './components/config-menu/config-menu.component';
import { ResultChartComponent } from './components/result-chart/result-chart.component';
import { ScoreChartComponent } from './components/testChart/score-chart/score-chart.component';
import { LineTimeComponent } from './components/testChart/line-time/line-time.component';
import { ScoreBarChartComponent } from './components/testChart/score-bar-chart/score-bar-chart.component';
import { QuestionsAnalyticsComponent } from './components/testChart/questions-analytics/questions-analytics.component';
import { ViewAnswerComponent } from './components/view-answer/view-answer.component';
import { UserActivityComponent } from './components/user-activity/user-activity.component';
@NgModule({
  declarations: [
    TestComponent,
    OverviewTestComponent,
    TestingComponent,
    ResultComponent,
    AnalyticComponent,
    ConfigMenuComponent,
    ResultChartComponent,
    ScoreChartComponent,
    LineTimeComponent,
    ScoreBarChartComponent,
    QuestionsAnalyticsComponent,
    ViewAnswerComponent,
    UserActivityComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    TestComponent,
  ]
})
export class TestModule { }
