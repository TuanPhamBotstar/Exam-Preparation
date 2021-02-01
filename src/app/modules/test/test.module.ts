import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './components/test/test.component';
import { OverviewTestComponent } from './components/overview-test/overview-test.component';
import { TestingComponent } from './components/testing/testing.component';
import { ResultComponent } from './components/result/result.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TestComponent,
    OverviewTestComponent,
    TestingComponent,
    ResultComponent,
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    TestComponent,
  ]
})
export class TestModule { }
