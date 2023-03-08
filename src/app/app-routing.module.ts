import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarChartTooltipComponent } from './bar-chart-tooltip/bar-chart-tooltip.component';
import { BarChartTwoComponent } from './bar-chart-two/bar-chart-two.component';
import { BasicBarComponent } from './basic-bar/basic-bar.component';
import { BasicLineComponent } from './basic-line/basic-line.component';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { BasicPieComponent } from './basic-pie/basic-pie.component';
import { BasicScatterComponent } from './basic-scatter/basic-scatter.component';
import { DonutOneComponent } from './donut-one/donut-one.component';
import { ResponsiveBarComponent } from './responsive-bar/responsive-bar.component';
import { StackedBarTooltipComponent } from './stacked-bar-tooltip/stacked-bar-tooltip.component';

// https://observablehq.com/@d3/gallery
const routes: Routes = [
  {path:'basic-bar', component: BasicBarComponent},
  {path:'bar-chart-two', component: BarChartTwoComponent},
  {path:'basic-pie', component: BasicPieComponent},
  {path:'basic-scatter', component: BasicScatterComponent},
  {path:'responsive-bar', component: ResponsiveBarComponent},
  {path:'basic-map', component: BasicMapComponent},
  {path:'basic-line', component: BasicLineComponent},
  {path:'stacked-bar-tooltip', component: StackedBarTooltipComponent},
  {path:'donut-one', component: DonutOneComponent},
  {path:'bar-chart-tooltip', component: BarChartTooltipComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
