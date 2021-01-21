import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './components/subject/subject.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';


@NgModule({
  declarations: [
    SubjectComponent,
    CreateSubjectComponent,
    AddQuestionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SubjectRoutingModule,
  ],
  exports:[
    SubjectComponent,
  ]
})
export class SubjectModule { }
