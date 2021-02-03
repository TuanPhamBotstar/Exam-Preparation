import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SubjectRoutingModule } from './subject-routing.module';
import { SubjectComponent } from './components/subject/subject.component';
import { CreateSubjectComponent } from './components/create-subject/create-subject.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';
import { SubjectOveriewComponent } from './components/subject-overiew/subject-overiew.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { SubjectEffects } from './store/effects/subject.effects';
import { QuestionEffects } from './store/effects/question.effects';
import { TestEffects } from './store/effects/test.effects';

@NgModule({
  declarations: [
    SubjectComponent,
    CreateSubjectComponent,
    AddQuestionComponent,
    ProfileSidebarComponent,
    SubjectDetailComponent,
    SubjectOveriewComponent,
    CreateTestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SubjectRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('subject', reducers),
    EffectsModule.forFeature(
      [
        SubjectEffects,
        QuestionEffects,
        TestEffects,
      ]
      ),
  ],
  exports:[
    SubjectComponent,
  ]
})
export class SubjectModule { }
