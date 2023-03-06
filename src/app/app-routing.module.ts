import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicBarComponent } from './basic-bar/basic-bar.component';
import { BasicLineComponent } from './basic-line/basic-line.component';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { BasicPieComponent } from './basic-pie/basic-pie.component';
import { BasicScatterComponent } from './basic-scatter/basic-scatter.component';
import { ResponsiveBarComponent } from './responsive-bar/responsive-bar.component';
import { StackedBarTooltipComponent } from './stacked-bar-tooltip/stacked-bar-tooltip.component';

// https://observablehq.com/@d3/gallery
const routes: Routes = [
  {path:'basic-bar', component: BasicBarComponent},
  {path:'basic-pie', component: BasicPieComponent},
  {path:'basic-scatter', component: BasicScatterComponent},
  {path:'responsive-bar', component: ResponsiveBarComponent},
  {path:'basic-map', component: BasicMapComponent},
  {path:'basic-line', component: BasicLineComponent},
  {path:'stacked-bar-tooltip', component: StackedBarTooltipComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
