import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from '../subject/components/create-test/create-test.component';
import { OverviewTestComponent } from './components/overview-test/overview-test.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
