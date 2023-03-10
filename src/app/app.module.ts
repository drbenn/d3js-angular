import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    BarChartTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BarTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
