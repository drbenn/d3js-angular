import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BasicBarComponent } from './basic-bar/basic-bar.component';
import { BasicPieComponent } from './basic-pie/basic-pie.component';
import { BasicScatterComponent } from './basic-scatter/basic-scatter.component';
import { ResponsiveBarComponent } from './responsive-bar/responsive-bar.component';
import { BasicMapComponent } from './basic-map/basic-map.component';
import { BasicLineComponent } from './basic-line/basic-line.component';
import { StackedBarTooltipComponent } from './stacked-bar-tooltip/stacked-bar-tooltip.component';
import { BarChartTwoComponent } from './bar-chart-two/bar-chart-two.component';
import { DonutOneComponent } from './donut-one/donut-one.component';
import { BarChartTooltipComponent } from './bar-chart-tooltip/bar-chart-tooltip.component';
import { BarTooltipModule } from './common/ui/bar-tooltip/bar-tooltip.module';
import { SvgTransitionComponent } from './svg-transition/svg-transition.component';
import { AmericasMapComponent } from './americas-map/americas-map.component';
import { SimpleMapComponent } from './simple-map/simple-map.component';
import { SimpleMapWAnimComponent } from './simple-map-w-anim/simple-map-w-anim.component';
import { RedrawOnResizeComponent } from './redraw-on-resize/redraw-on-resize.component';
import { BasicTweenAnimComponent } from './basic-tween-anim/basic-tween-anim.component';
import { AnimOrthoMapComponent } from './anim-ortho-map/anim-ortho-map.component';
import { HttpClientModule } from '@angular/common/http';
import { FlatWorldMapComponent } from './flat-world-map/flat-world-map.component';
import { NordicAirForceDemoComponent } from './nordic-air-force-demo/nordic-air-force-demo.component';
import { ObserveElementDirective } from './nordic-air-force-demo/observe-element.directive';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BasicBarComponent,
    BasicPieComponent,
    BasicScatterComponent,
    ResponsiveBarComponent,
    BasicMapComponent,
    BasicLineComponent,
    StackedBarTooltipComponent,
    BarChartTwoComponent,
    DonutOneComponent,
    BarChartTooltipComponent,
    SvgTransitionComponent,
    AmericasMapComponent,
    SimpleMapComponent,
    SimpleMapWAnimComponent,
    RedrawOnResizeComponent,
    BasicTweenAnimComponent,
    AnimOrthoMapComponent,
    FlatWorldMapComponent,
    NordicAirForceDemoComponent,
    ObserveElementDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarTooltipModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
