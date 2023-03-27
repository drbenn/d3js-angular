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
    this.drawCirclePath();

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
    const pathPoints: [number, number][] = [[350, 100], [480, 140] ,[520,250]];
    const coordsAsSvgPath = this.createSvgPathElementFromPointsArray(pathPoints)
    console.log('In animateSVGG');



    //animate circle
    //in tween t is time of animation from 0 to 1
    // tween can be called anytime after transition and the function gets called for each element in the selection and must return a tween function which is called at each step of the transition
    let path = <SVGGeometryElement>d3.select('#circle-path').node();
    console.log(path);

    d3.select("#moving-circle").transition().duration(2000)
      .attrTween('transform', tween)
      console.log('in moving circle tween');

      function tween() {

        // const pathNode =
        const pathLength = path.getTotalLength();
        return function (t: number) {
          const point = path.getPointAtLength(t * pathLength);
          console.log(this.width);
          
          return `translate(${point.x - (350)}, ${point.y - 100})`;
        }


      }
    //animate path

    d3.select("#moving-path").transition().duration(2000).delay(200)
    .attr('d', this.curve(pathPoints))
    .attr('stroke', 'lightseagreen')
    .attr('fill', 'none')
    .attr('stroke-width', 6)
    .ease(d3.easeQuadInOut)
  }

  createSvgPathElementFromPointsArray(pointsArray: number[][]): SVGPathElement {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let pathData = '';

    for (let i = 0; i < pointsArray.length; i++) {
      const point = pointsArray[i];
      if (i === 0) {
        pathData += `M ${point[0]} ${point[1]}`;
      } else {
        pathData += ` L ${point[0]} ${point[1]}`;
      }
    }
    path.setAttribute('d', pathData);
    return path;
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

  private drawCirclePath(): void {
    const points: [number, number][] = [[350, 100], [480, 140] ,[520,250]];
    this.svg.append('path')
    // const path = this.svg.append('path')
      .attr('d', this.curve(points))
      .style('fill', 'none')
      .style('stroke', 'purple')
      .attr("id", "circle-path");
  }
}
