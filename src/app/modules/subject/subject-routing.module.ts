import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/Services/guard/auth-guard.guard';
import { OverviewTestComponent } from '../test/components/overview-test/overview-test.component';
import { TestComponent } from '../test/components/test/test.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectOveriewComponent } from './components/subject-overiew/subject-overiew.component';
import { SubjectComponent } from './components/subject/subject.component';

const routes: Routes = [
  {
    path:'',
    component:SubjectComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:'bo-de',
        component:SubjectOveriewComponent,
        children:[
          {
            path:'tao-bo-de',
            component: CreateSubjectComponent
          },
         
        ]
      },
      {
        path:'chi-tiet',
        component: SubjectDetailComponent,
        children:[
          {
            path:'them-cau-hoi',
            component:AddQuestionComponent
          },
          // {
          //   path:'tao-de-thi',
          //   component:CreateTestComponent,
          // },
          {
            path:'de-thi',
            component:OverviewTestComponent, 
            children:[
              {
                path:'tao-de-thi',
                component:CreateTestComponent,
              },
              {
                path:'noi-dung',
                component:TestComponent
              }
            ]
          },
        ]
      },
      // {
      //   path:'tao-de-thi',
      //   component:CreateTestComponent
      // },
    ],
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
