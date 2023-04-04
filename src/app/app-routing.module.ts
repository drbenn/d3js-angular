import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmericasMapComponent } from './americas-map/americas-map.component';
import { AnimOrthoMapComponent } from './anim-ortho-map/anim-ortho-map.component';
import { BarChartTooltipComponent } from './bar-chart-tooltip/bar-chart-tooltip.component';
import { BarChartTwoComponent } from './bar-chart-two/bar-chart-two.component';
import { BasicBarComponent } from './basic-bar/basic-bar.component';
import { BasicLineComponent } from './basic-line/basic-line.component';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { BasicPieComponent } from './basic-pie/basic-pie.component';
import { BasicScatterComponent } from './basic-scatter/basic-scatter.component';
import { BasicTweenAnimComponent } from './basic-tween-anim/basic-tween-anim.component';
import { DonutOneComponent } from './donut-one/donut-one.component';
import { FlatWorldMapComponent } from './flat-world-map/flat-world-map.component';
import { ResponsiveBarComponent } from './responsive-bar/responsive-bar.component';
import { SimpleMapWAnimComponent } from './simple-map-w-anim/simple-map-w-anim.component';
import { SimpleMapComponent } from './simple-map/simple-map.component';
import { StackedBarTooltipComponent } from './stacked-bar-tooltip/stacked-bar-tooltip.component';
import { SvgShapesComponent } from './svg-shapes/svg-shapes.component';
import { SvgTransitionComponent } from './svg-transition/svg-transition.component';
import { NordicAirForceDemoComponent } from './nordic-air-force-demo/nordic-air-force-demo.component';


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
  {path:'svg-transition', component: SvgTransitionComponent},
  {path:'svg-shapes', component: SvgShapesComponent},
  {path:'americas-map', component: AmericasMapComponent},
  {path:'simple-map', component: SimpleMapComponent},
  {path:'simple-map-w-anim', component: SimpleMapWAnimComponent},
  {path:'redraw-on-resize', component: SimpleMapWAnimComponent},
  {path:'basic-tween-anim', component: BasicTweenAnimComponent},
  {path:'anim-ortho-map', component: AnimOrthoMapComponent},
  {path:'flat-world-map', component: FlatWorldMapComponent},
  {path:'nordic-air-force-demo', component: NordicAirForceDemoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
