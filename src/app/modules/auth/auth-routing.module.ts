import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { IntroduceComponent } from '../../components/introduce/introduce.component';
import { AccountComponent } from './components/account/account.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from '../../shared/Services/guard/auth-guard.guard';
import { AppComponent } from '../../app.component';
import { SubjectComponent } from '../../modules/subject/components/subject/subject.component';


const routes: Routes = [
    {
      path:'',
      component:SubjectComponent,
      canActivate:[AuthGuard],
    },
    {
      path:'introduce',
      component:IntroduceComponent
    },
    {
      path:'account',
      component:AccountComponent,
      children:[
        {
          path:'log-in',
          component: SignInComponent
        },
        {
          path:'sign-up',
          component: SignUpComponent,
        },
      ]
    },
    // {
    //   path:'**',
    //   component:NotFoundComponent,
    // },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
