import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/Services/guard/auth-guard.guard';
import { pathToFileURL } from 'url';
import { NotFoundComponent } from '../auth/components/page-not-found/not-found.component';
import { AnalyticComponent } from '../test/components/analytic/analytic.component';
import { OverviewTestComponent } from '../test/components/overview-test/overview-test.component';
import { ResultComponent } from '../test/components/result/result.component';
import { TestComponent } from '../test/components/test/test.component';
import { TestingComponent } from '../test/components/testing/testing.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectOveriewComponent } from './components/subject-overiew/subject-overiew.component';
import { SubjectComponent } from './components/subject/subject.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'subjects',
        component: SubjectOveriewComponent,
        children: [
          {
            path: 'create-subject',
            component: CreateSubjectComponent
          },

        ]
      },
      {
        path: 'subject',
        component: SubjectDetailComponent,
        children: [
          // {
          //   path: 'add-question',
          //   component: AddQuestionComponent
          // },
          // {
          //   path: 'edit-question',
          //   component: AddQuestionComponent
          // },
          {
            path: 'tests',
            component: OverviewTestComponent,
            children: [
              {
                path: 'create-test',
                component: CreateTestComponent,
              },
              {
                path: 'content-test',
                component: TestComponent
              }
            ]
          },
          {
            path: 'questions',
            component: QuestionsComponent,
            children:[
              {
                path: 'add-question',
                component: AddQuestionComponent
              },
              {
                path: 'edit-question',
                component: AddQuestionComponent
              },
            ]
          },
          {
            path: 'dashboard',
            component: DashboardComponent
          },
          // {
          //   path:'noi-dung-de-thi',
          //   component:TestComponent
          // }  
        ]
      },
      {
        path: 'testing',
        component: TestingComponent,
        // children: [
        //   {
        //     path: 'ket-qua',
        //     component: ResultComponent,
        //   },
        // ]
      },
      {
        path: 'activity-logs',
        component: ResultComponent,
      },
      {
        path: 'overviews',
        component: AnalyticComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
