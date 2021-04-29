import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoOutlineComponent } from './pages/demo-outline/demo-outline.page';
import { DemoDetailComponent } from './pages/demo-detail/demo-detail.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'outline',
    pathMatch: 'full'
  },
  {
    path: 'outline',
    component: DemoOutlineComponent,
  },
  {
    path: 'detail',
    component: DemoDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
