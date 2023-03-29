import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
// import * from '../../assets/'
// import * as world from './world-110m.json'
// import * as world from '../../assets/'


import { json } from 'd3-fetch';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { GeometryCollection } from 'geojson';

// https://observablehq.com/@jk979/week-11-intro-to-d3-js-mapping-data-with-d3
// https://gist.github.com/atanumallick/8d18989cd538c72ae1ead1c3b18d7b54
// https://stackoverflow.com/questions/62459342/compatibility-between-v4-and-v5-of-d3-js
// https://stackoverflow.com/questions/59260333/how-to-use-promise-all-instead-of-queue-in-d3
// https://stackoverflow.com/questions/49534470/d3-js-v5-promise-all-replaced-d3-queue


export interface RotateConfigModel {
  speed: number,
  verticalTilt: number,
  horizontalTilt: number
}      

@Component({
  selector: 'app-anim-ortho-map',
  templateUrl: './anim-ortho-map.component.html',
  styleUrls: ['./anim-ortho-map.component.scss']
})
export class AnimOrthoMapComponent implements OnInit {
   worldUrl: string = '../../assets/world-110m.json'
   worldData: any;
   locationsUrl: string = '../../assets/locations.json'
   locationsData: any;
   @ViewChild('globeSvg', {static: true}) globeSvgRef: ElementRef;
   private svg: any;
   width: number = 960;
   height: number = 500;

  markerGroup: any;
  // projection: d3.GeoProjection;
  projection: any;
  initialScale: number;
  path: d3.GeoPath; // formerly GeoProjection | any
  center: [number, number];

  rotateConfig: RotateConfigModel;
   locations: any = [];
    // files = ["world-110m.json", "./locations.json"];
    // files = [ world, "./locations.json"];
    promises = [];
  constructor(private http: HttpClient) { 

  }

  ngOnInit(): void {
    this.rotateConfig = {
      speed: 0.005,
      verticalTilt: -30,
      horizontalTilt: 0
    }
    forkJoin([this.http.get(this.worldUrl), this.http.get(this.locationsUrl)]).subscribe(res => {
      this.worldData = res[0];
      this.locationsData = res[1];
      this.createSvg();   
      this.drawGraticule();
      this.drawGlobe(); 


      }, err => {
        console.log('error', err);
      }
    ) 
    

  }

  private createSvg() {
    this.svg = d3.select("div#ortho-globe")
      .append("svg")
      .attr('width', this.width)
      .attr('height', this.height);
    this.svg.append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "salmon")
    
    this.markerGroup = this.svg.append('g');
    this.projection = d3.geoOrthographic();
    this.initialScale = this.projection.scale();
    this.path = d3.geoPath().projection(this.projection);
    this.enableRotation();
    this.center = [this.width/2, this.height/2];
  }

  private drawGlobe() {
    let worldDataFeatureCollection = topojson.feature(this.worldData, this.worldData.objects.countries) // converts geometry collection into featurecollections, may need to npm i geojson @types/geojson
    
    this.svg.selectAll(".segment")
      .data(worldDataFeatureCollection['features'])
      .enter()
      .append("path")
      .attr("class", "segment")
      .attr("d", this.path)
      .style("stroke", "#888")
      .style("stroke-width", "1px")
      .style("fill", (d, i) => '#e5e5e5')
      .style("opacity", ".6");
      // this.locations = this.locationsData;
      this.drawMarkers();

  }

  private drawMarkers() {  
    const markers = this.markerGroup.selectAll('circle')
    .data(this.locationsData);
    markers
      .enter()
      .append('circle')
      .merge(markers)
      .attr('cx', d => this.projection([d.longitude, d.latitude])[0])
      .attr('cy', d => this.projection([d.longitude, d.latitude])[1])
      .attr('fill', d => {
          const coordinate: [number, number] = [d.longitude, d.latitude];
          let gdistance = d3.geoDistance(coordinate, this.projection.invert(this.center));
          return gdistance > 1.57 ? 'none' : '#4682b4';
      })
      .attr('r', 4);

    this.markerGroup.each(function () {
      this.parentNode.appendChild(this);
    });
  }

  /**
   * Graticule are grid lines on map(lat, lng)
   */
  private drawGraticule() {
    const graticule = d3.geoGraticule()
    .step([10, 10]);

    this.svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", this.path)
        .style("fill", "#fff")
        .style("stroke", "#ccc");
  }

  private enableRotation() {
    // console.log('in enable rotation');
    let rotation = this.rotateConfig;
    // let roProjection = console.log(this.projection); // why is this projection undefined?
    // d3.timer(function (elapsed) {
    //   // console.log(elapsed);
    //   // console.log(rotation);
      
    //        this.roProjection.rotate([rotation.speed * elapsed - 120, rotation.verticalTilt, rotation.horizontalTilt]);   

      
      
      

      
    //     // this.projection.rotate([rotation.speed * elapsed - 120, rotation.verticalTilt, rotation.horizontalTilt]);
    //     // this.projection.rotate([0.005 * elapsed - 120, -30, 0]);
    //     // this.svg.selectAll("path").attr("d", this.path);
    //     // this.drawMarkers();
    // });
  }
  // }

  rotate() {
    // console.log('rotate');
    this.projection.rotate([5, 5, 5])
    // console.log(this.path);
    // console.log(this.projection);
    
    
    this.drawGlobe();
    
  }

}


