import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { path } from 'd3';
import { simpleMapData } from './simple-map-feature';

@Component({
  selector: 'app-simple-map-w-anim',
  templateUrl: './simple-map-w-anim.component.html',
  styleUrls: ['./simple-map-w-anim.component.scss']
})
export class SimpleMapWAnimComponent implements OnInit {
  // https://mappingwithd3.com/examples/getting-started/simple-geojson-map/

  private svg: any;
  private margin = 50;
  private width = 850 - (this.margin * 2);
  private height = 450 - (this.margin * 2);
  projection;
  geoGenerator;
  curve = d3.line().curve(d3.curveNatural);

  constructor() { }

  ngOnInit(): void {
    this.projection = d3.geoEqualEarth();
    this.projection.fitExtent([[20, 20], [this.width, this.height]], simpleMapData);
    this.geoGenerator = d3.geoPath().projection(this.projection);
    this.createSvg();
    this.addGeoMapFeatures();
    this.drawCurve();
    this.drawCircle();

  }

   /**
   * Selects the element in the DOM and inserts a new SVG
   */
   private createSvg(): void {
    this.svg = d3.select("div#simple-map-anim")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  addGeoMapFeatures() {
    this.svg.append('g').selectAll('path')
    .data(simpleMapData.features)
    .enter()
      .append('path')
      .attr('d', this.geoGenerator)
      .attr('fill', 'tomato')
      .attr('stroke', '#000')
  }

  animateSvg() {
    let pathElBeingFollowed = d3.select("#moving-path")
    let point  = -2*Math.PI;
    const nextPoint = (-2 + 4*Math.random()) * Math.PI;
    const points: [number, number][] = [[350, 100], [480, 140] ,[520,250]];
    //animate circle
    //in tween t is time of animation from 0 to 1
    d3.select("#moving-circle").transition().duration(2000)
    .attrTween("transform", this.translateFn());

    
    // .tween('r', function() {
    //   return function(t) { 
    //     console.log(t);
        
    //     return t * 3}
    // })
    // .attr("r", 10)
    // .attr("cy", 250)
    // .attr("cx", 520)
    // .style("fill", "black")
    // .ease(d3.easeSin)

    //animate path

    d3.select("#moving-path").transition().duration(2000)
    .attr('d', this.curve(points))
    .attr('stroke', 'lightseagreen')
    .attr('fill', 'none')
    .attr('stroke-width', 6)
    .ease(d3.easeSin)
  }

  translateFn() {

    // We only use 'd', but list d,i,a as params just to show can have them as params.
    // Code only really uses d and t.
    return function(d, i, a) {
      return function(t) {
  
    // 't': what's t? T is the fraction of time (between 0 and 1) since the
    // transition began. Handy. 
    var t_offset = d.get('offset');
    var t_x, t_y;
  
    // If the data says the element should follow a circular path, do that.
    if (d.get('rtype') == 'circle')	{
      var rotation_radius = d.get('rotr');
      var t_angle = (2 * Math.PI) * t;
      var t_x = rotation_radius * Math.cos(t_angle);
      var t_y = rotation_radius * Math.sin(t_angle);
    }
  
    // Likewise for an ellipse:
    if (d.get('rtype') == 'ellipse')	{
      var rotation_radius_x = d.get('rotrx');
      var rotation_radius_y = d.get('rotry');
      var t_angle = (2 * Math.PI) * t;
      var t_x = rotation_radius_x * Math.cos(t_angle);
      var t_y = rotation_radius_y * Math.sin(t_angle);
    }
  
    return "translate(" + ((width/2) + t_offset + t_x) + "," + (height/2 + t_offset + t_y) + ")";
      };
    };
  }


    // https://stackoverflow.com/questions/31381129/assign-new-id-attribute-to-each-element-created
  // https://itnext.io/add-interactivity-to-your-charts-in-angular-2-applications-with-d3-js-78fd3718e6fb
  private drawCircle(): void {
    this.svg.append("circle")
    .attr("r", 10)
      .attr("cx", 350)
      .attr("cy", 100)
      .style("fill", "yellow")
      .attr("id", "moving-circle");
  }



  private drawCurve(): void {

    // const points: [number, number][] = [[100, 60], [40, 90], [200, 80], [300, 150]];
    const points: [number, number][] = [[350, 100], [350, 100],[350, 100]];
    this.svg.append('path')
      .attr('d', this.curve(points))
      .attr('stroke', 'lightseagreen')
      .attr('fill', 'none')
      .attr('stroke-width', 6)
      .attr("id", "moving-path");
  }
}
