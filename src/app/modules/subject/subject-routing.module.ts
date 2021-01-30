import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/Services/guard/auth-guard.guard';
import { NotFoundComponent } from '../auth/components/page-not-found/not-found.component';
import { OverviewTestComponent } from '../test/components/overview-test/overview-test.component';
import { ResultComponent } from '../test/components/result/result.component';
import { TestComponent } from '../test/components/test/test.component';
import { TestingComponent } from '../test/components/testing/testing.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
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
        path: 'bo-de',
        component: SubjectOveriewComponent,
        children: [
          {
            path: 'tao-bo-de',
            component: CreateSubjectComponent
          },

        ]
      },
      {
        path: 'chi-tiet',
        component: SubjectDetailComponent,
        children: [
          {
            path: 'them-cau-hoi',
            component: AddQuestionComponent
          },
          {
            path: 'de-thi',
            component: OverviewTestComponent,
            children: [
              {
                path: 'tao-de-thi',
                component: CreateTestComponent,
              },
              {
                path: 'noi-dung-de-thi',
                component: TestComponent
              }
            ]
          },
          // {
          //   path:'noi-dung-de-thi',
          //   component:TestComponent
          // }  
        ]
      },
      {
        path: 'lam-bai-thi',
        component: TestingComponent,
        children: [
          {
            path: 'ket-qua',
            component: ResultComponent,
          },
        ]
      }
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
