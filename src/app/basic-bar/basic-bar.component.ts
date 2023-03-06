import { Component, ContentChild, Directive, OnInit, TemplateRef } from '@angular/core';
import * as d3 from 'd3';


export interface IPoint {
  x: number;
  xLabel?: string;
  y: number;
  yLabel?: string;
}

@Directive({
  selector: "[chart-tooltip]"
})
export class ChartTooltipDirective {
  constructor(public tmp: TemplateRef<any>) {}
}
@Component({
  selector: 'app-basic-bar',
  templateUrl: './basic-bar.component.html',
  styleUrls: ['./basic-bar.component.scss']
})

// https://blog.logrocket.com/data-visualization-angular-d3-js/
// https://stackblitz.com/edit/angular-ivy-vrq5p6?file=src%2Fapp%2Fchart.component.ts
// https://stackblitz.com/edit/d3-angular?file=src%2Fapp%2Fapp.component.css,src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.module.ts
export class BasicBarComponent<T extends IPoint> implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  @ContentChild(ChartTooltipDirective)
  toolTipTmp: ChartTooltipDirective

  hovered?: T
  ttPos = {
    "left.px": 0,
    "top.px": 0
  }

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawBars(this.data);
  }

  /**
   * Selects the element in the DOM and inserts a new SVG
   */
  private createSvg(): void {
    this.svg = d3.select("div#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  /**
   * Adds the bars using the svg property
   * @param data 
   */
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));


    // tooltip mouseover event handler
        const tipMouseover = (d) => {
          this.hovered = d;
          console.log('this.hovered');
          console.log(d);
          console.log(d3.pointer(event));
          
          this.ttPos["left.px"] = d.pageX + 15;
          this.ttPos["top.px"] = d.pageY - 28;
          // this.ttPos["left.px"] = d3.event.pageX + 15;
          // this.ttPos["top.px"] = d3.event.pageY - 28;
        
      };
      // tooltip mouseout event handler
      var tipMouseout = (d) => {
          this.hovered = undefined;
      };

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.Framework))
    .attr("y", (d: any) => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => this.height - y(d.Stars))
    .attr("fill", "#d04a35")
    .on("mouseover", tipMouseover)
    .on("mouseout", tipMouseout);
  }

}
