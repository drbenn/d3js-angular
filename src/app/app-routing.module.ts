import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicBarComponent } from './basic-bar/basic-bar.component';
import { BasicPieComponent } from './basic-pie/basic-pie.component';
import { BasicScatterComponent } from './basic-scatter/basic-scatter.component';
import { ResponsiveBarComponent } from './responsive-bar/responsive-bar.component';

const routes: Routes = [
  {path:'basic-bar', component: BasicBarComponent},
  {path:'basic-pie', component: BasicPieComponent},
  {path:'basic-scatter', component: BasicScatterComponent},
  {path:'responsive-bar', component: ResponsiveBarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
