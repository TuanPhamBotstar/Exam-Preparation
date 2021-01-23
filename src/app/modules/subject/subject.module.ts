import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './components/subject/subject.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectOveriewComponent } from './components/subject-overiew/subject-overiew.component';


@NgModule({
  declarations: [
    SubjectComponent,
    CreateSubjectComponent,
    AddQuestionComponent,
    ProfileSidebarComponent,
    SubjectDetailComponent,
    SubjectOveriewComponent,
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
