import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarTooltipComponent } from './bar-tooltip.component';
import { BarTooltipDirective } from './bar-tooltip.directive';



@NgModule({
  declarations: [
    BarTooltipComponent,
    BarTooltipDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    [BarTooltipDirective]
  ]
})
export class BarTooltipModule { }
