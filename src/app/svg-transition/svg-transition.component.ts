import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-svg-transition',
  templateUrl: './svg-transition.component.html',
  styleUrls: ['./svg-transition.component.scss']
})
export class SvgTransitionComponent implements OnInit {

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawSvg();
  }
   
  /**
   * Selects the element in the DOM and inserts a new SVG
   */
  private createSvg(): void {
    this.svg = d3.select("div#svg-animation")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  // https://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
  // https://itnext.io/add-interactivity-to-your-charts-in-angular-2-applications-with-d3-js-78fd3718e6fb
  private drawSvg(): void {
    this.svg.append("circle")
    .attr("r", 40)
      .attr("cx", 140)
      .attr("cy", 70)
      .style("fill", "orange")
      .attr("id", "moving-circle");
  }
    
  animateSvg() {
    d3.select("#moving-circle").transition().duration(2000)
    .attr("r", 60)
    .attr("cy", 170)
    .attr("cx", 380)
    .style("fill", "hotpink")
    .ease(d3.easeBackIn)
    // on "end" allows chained transition..also with a brief delay built-in
    .on("end", () => {
      d3.select("#moving-circle").transition().duration(1500)
      .attr("r", 20)
      .attr("cy", 100)
      .attr("cx", 500)
      .style("fill", "cornflowerblue")
      .ease(d3.easeBounceOut)
    } )
    

  }


}
