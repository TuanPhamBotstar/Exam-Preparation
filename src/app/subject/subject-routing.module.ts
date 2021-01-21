import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInComponent } from '../auth/components/logged-in/logged-in.component';
import { SignInComponent } from '../auth/components/sign-in/sign-in.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { SubjectComponent } from './components/subject/subject.component';

const routes: Routes = [
  {
    path:'',
    component:SubjectComponent,
    children:[
      {
        path:'tao-bo-de',
        component:CreateSubjectComponent,
      },
      {
        path:'them-cau-hoi',
        component: AddQuestionComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
