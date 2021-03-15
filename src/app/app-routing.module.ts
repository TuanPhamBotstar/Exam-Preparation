import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SubjectComponent } from './modules/subject/components/subject/subject.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./modules/subject/subject.module').then(m => m.SubjectModule)
  //   // component: SubjectComponent
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      // { 
      //   preloadingStrategy: PreloadAllModules 
      // }
      ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
