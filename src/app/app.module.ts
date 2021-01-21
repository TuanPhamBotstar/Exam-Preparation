import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { IntroduceComponent} from './components/introduce/introduce.component'

import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
//auth module
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
//create subject test module


// NgRx store-devtool
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SubjectModule } from './subject/subject.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IntroduceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    SubjectModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
