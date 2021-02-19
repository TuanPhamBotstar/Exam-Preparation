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
@NgModule({
  declarations: [
    TestComponent,
    OverviewTestComponent,
    TestingComponent,
    ResultComponent,
    AnalyticComponent,
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
