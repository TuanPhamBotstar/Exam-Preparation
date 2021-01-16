import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { IntroduceComponent} from './components/introduce/introduce.component'

import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
const routes:Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full',
  },
  {
    path:'tai-khoan',
    children:[
      {
        path:'dang-nhap',
        component: SignInComponent
      },
      {
        path:'dang-ky',
        component: SignInComponent
      }
    ]
  }

];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    IntroduceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
