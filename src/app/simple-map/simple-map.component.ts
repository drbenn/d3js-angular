import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { simpleMapData } from './simple-map-feature';

@Component({
  selector: 'app-simple-map',
  templateUrl: './simple-map.component.html',
  styleUrls: ['./simple-map.component.scss']
})
export class SimpleMapComponent implements OnInit {
  // https://mappingwithd3.com/examples/getting-started/simple-geojson-map/

  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  projection;
  geoGenerator;

  constructor() { }

  ngOnInit(): void {
    this.projection = d3.geoEqualEarth();
    this.projection.fitExtent([[20, 20], [this.width, this.height]], simpleMapData);
    this.geoGenerator = d3.geoPath().projection(this.projection);
    this.createSvg();
    this.addGeoMapFeatures();
  }

   /**
   * Selects the element in the DOM and inserts a new SVG
   */
   private createSvg(): void {
    this.svg = d3.select("div#simple-map")
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
      .attr('fill', 'goldenrod')
      .attr('stroke', '#000')
  }
}
