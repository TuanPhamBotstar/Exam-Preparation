import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { SubjectOveriewComponent } from './components/subject-overiew/subject-overiew.component';
import { SubjectComponent } from './components/subject/subject.component';

const routes: Routes = [
  {
    path:'',
    component:SubjectComponent,
    children:[
      {
        path:'bo-de',
        component:SubjectOveriewComponent,
        children:[
          {
            path:'tao-bo-de',
            component: CreateSubjectComponent
          }
        ]
      },
      {
        path:'tao-cau-hoi',
        component:AddQuestionComponent
      },
    ],
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
