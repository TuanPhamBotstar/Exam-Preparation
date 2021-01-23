import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { IntroduceComponent } from '../../components/introduce/introduce.component';
import { AccountComponent } from './components/account/account.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from '../../shared/Services/guard/auth-guard.guard';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { AppComponent } from '../../app.component';
import { SubjectComponent } from '../../modules/subject/components/subject/subject.component';


const routes: Routes = [
    {
      path:'',
      component:SubjectComponent,
      canActivate:[AuthGuard],
      // children:[
      //   {
      //     path:'tao-bo-de',
      //     component:CreateSubjectComponent,
      //   },
      //   {
      //     path:'them-cau-hoi',
      //     component: AddQuestionComponent
      //   }
      // ]
    },
    // {
    //   path:'',
    //   redirectTo:'gioi-thieu',
    //   pathMatch:'full'
    // },
    {
      path:'gioi-thieu',
      component:IntroduceComponent
    },
    {
      path:'tai-khoan',
      component:AccountComponent,
      children:[
        {
          path:'dang-nhap',
          component: SignInComponent
        },
        {
          path:'dang-ky',
          component: SignUpComponent,
        }
      ]
    }
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
