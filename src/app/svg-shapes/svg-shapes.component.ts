import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-svg-shapes',
  templateUrl: './svg-shapes.component.html',
  styleUrls: ['./svg-shapes.component.scss']
})
export class SvgShapesComponent implements OnInit {

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
    this.svg = d3.select("div#svg-shapes-div")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")")
    
  }

  // https://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
  private drawSvg(): void {
    // append rect at 100% height/width first for full svg background as later svg will be painted on top
    this.svg.append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "salmon")

    this.svg.append("circle")
      .attr("cx", 140).attr("cy", 70).attr("r", 40).style("fill", "orange").attr("id", "moving-circle");
  
    this.svg.append("line")
      .attr("x1", 100)
      .attr("x2", 600)
      .attr("y1", 300)
      .attr("y2", 200)
      .attr("stroke", "bisque")
      .attr("stroke-width", "5")
      .attr("stroke-opacity", "0.7")

    this.svg.append("ellipse")
      .attr("cx", 450)
      .attr("cy", 230)
      .attr("rx", 50)
      .attr("ry", 20)
      .attr("fill", "darkseagreen")
      .attr("fill-opacity", "0.9")


    this.svg.append("text")
    .attr("x", 350)
    .attr("y", 235)
    .attr("stroke", "#000")
    .attr("fill", "#FFF")
    .attr("font-size", "1.8rem")
    .text("This is an ellipse!");

    let poly = [
      {"x":20.0, "y":50},
      {"x":80.5,"y":200.4},
      {"x":130.0,"y":210.0},
      {"x":190.0,"y":150.5}];

    this.svg.append("polygon")
    .attr("points", "300,50 350,120 460,110")
    .attr("stroke", "bisque")
    .attr("stroke-width", "1px")
    .attr("fill", "midnightblue")

    this.svg.append("polygon")
    .data([poly])
    .attr("points", function(d) {
      let pointString = '';
      return d.map(function(d) {
        return pointString += d.x + ',' + d.y + ' '                
      })

    })
    .attr("stroke", "springgreen")
    .attr("stroke-width", "1px")
    .attr("fill", "white")
    .attr("fill-opacity", "0.5")


  }

}
