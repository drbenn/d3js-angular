import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-basic-pie',
  templateUrl: './basic-pie.component.html',
  styleUrls: ['./basic-pie.component.scss']
})

/**
 * https://blog.logrocket.com/data-visualization-angular-d3-js/
 * 
 * The big difference between bar and pie is the addition of the radius and colors properties. 
 * Because pie charts use a circle instead of a rectangle to display data, that radius 
 * property ensures that the chart fits within the defined figure’s bounds. 
 */
export class BasicPieComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg: any;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  /**
  * Selects the element in the DOM and inserts a new SVG
  */
  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  /**
   *  n this pie chart, you’ll use an ordinal scale to create a discrete color for each section of the chart.
   */
  private createColors(): void {
    this.colors = d3.scaleOrdinal()
    .domain(this.data.map(d => d.Stars.toString()))
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  /**
   * Create a method to draw the chart and add labels. This method uses <path> elements to create arcs for 
   * each framework and fill them with the colors defined in the createColors method above
   */
  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));
  
    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");
  
    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);
  
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('text')
    .text((d: any)=> d.data.Framework)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }

}
