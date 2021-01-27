import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewTestComponent } from './components/overview-test/overview-test.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
