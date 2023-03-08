import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-tooltip',
  templateUrl: './bar-tooltip.component.html',
  styleUrls: ['./bar-tooltip.component.scss']
})
export class BarTooltipComponent implements OnInit {

  tooltip: string = '';
  left: number = 0;
  top: number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.tooltip, this.left);

  }

}
