import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
// import * from '../../assets/'
// import * as world from './world-110m.json'
// import * as world from '../../assets/'


import { json } from 'd3-fetch';
import { HttpClient } from '@angular/common/http';

// https://gist.github.com/atanumallick/8d18989cd538c72ae1ead1c3b18d7b54
// https://stackoverflow.com/questions/62459342/compatibility-between-v4-and-v5-of-d3-js
// https://stackoverflow.com/questions/59260333/how-to-use-promise-all-instead-of-queue-in-d3
// https://stackoverflow.com/questions/49534470/d3-js-v5-promise-all-replaced-d3-queue

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
    // files = ["world-110m.json", "./locations.json"];
    // files = [ world, "./locations.json"];
    promises = [];

    locations: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.worldUrl).subscribe(res => {
      this.worldData = res;
      console.log(this.worldData);
      
    });
    this.http.get(this.locationsUrl).subscribe(res => {
      this.locationsData = res;
      console.log(this.locationsData);
      
      
    });
  //   this.files.forEach(function(url) {
  //     this.promises.push(d3.json(url))
  // });

  // Promise.all(this.promises).then(function(values) {
  //   console.log(values)
  //   });
    // this.drawGlobe();
  }

}
//   private drawGlobe(): void {
//     Promise.all([
//       d3.json('https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json'),
//       d3.json('locations.json')
//     ]).then(([worldData, locationData]) => {
//       const svg = d3.select('svg');
//       const path = d3.geoPath();
//       svg.selectAll('.segment')
//         .data((topojson.feature(worldData as any, worldData['objects'].countries) as any).features)
//         .enter()
//         .append('path')
//         .attr('class', 'segment')
//         .attr('d', path)
//         .style('stroke', '#888')
//         .style('stroke-width', '1px')
//         .style('fill', (d, i) => '#e5e5e5')
//         .style('opacity', '.6');
//       this.locations = locationData;
//       this.drawMarkers();
//     })
//     .catch(error => console.log(error));
//   }

//   private drawMarkers(): void {
//     // Function to draw markers on the globe based on the location data
//   }

// }














  // @ViewChild('globeSvg', {static: true}) globeSvgRef: ElementRef;

  // svg: any;
  // width:number = 960;
  // height:number = 500;
  // config = {
  //   speed: 0.005,
  //   verticalTilt: -30,
  //   horizontalTilt: 0
  // }
  // locations: any = [];
  // // svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  // // markerGroup: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  // // projection: d3.GeoProjection;
  // // initialScale: number;
  // // path: d3.GeoPath<any, d3.GeoPermissibleObjects>;
  // // center: [number, number];
  // markerGroup: any | d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  // projection: any | d3.GeoProjection;
  // initialScale: any | number;
  // path: any | d3.GeoPath<any, d3.GeoPermissibleObjects>;
  // center: any | [number, number];

  // constructor() { }

  // ngOnInit(): void {
  //   this.svg = d3.select(this.globeSvgRef.nativeElement)
  //               .attr('width', this.width)
  //               .attr('height', this.height);

  //   this.markerGroup = this.svg.append('g');
  //   this.projection = d3.geoOrthographic();
  //   this.initialScale = this.projection.scale();
  //   this.path = d3.geoPath().projection(this.projection);
  //   this.center = [this.width / 2, this.height / 2];

  //   this.drawGlobe();
  //   this.drawGraticule();
  //   this.enableRotation();
  // }

  // private drawGlobe(): void {
  //   Promise.all([d3.json('https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json'),
  //                d3.json('./locations.json')])
  //          .then(([worldData, locationData]) => {
  //             this.svg.selectAll('.segment')
  //                   .data(d3.geoJson(worldData).features)
  //                   .enter().append('path')
  //                   .attr('class', 'segment')
  //                   .attr('d', this.path)
  //                   .style('stroke', '#888')
  //                   .style('stroke-width', '1px')
  //                   .style('fill', (d, i) => '#e5e5e5')
  //                   .style('opacity', '.6');

  //             this.locations = locationData;
  //             this.drawMarkers();
  //          })
  //          .catch(error => {
  //            console.log(error);
  //          });
  // }

  // // private drawMarkers(): void {
  // //   const markers = this.markerGroup.selectAll('circle')
  // //                   .data(this.locations);

  // //   markers.enter()
  // //           .append('circle')
  // //           .merge(markers)
  // //           .attr('cx', d => this.projection([d.longitude, d.latitude])[0])
  // //           .attr('cy', d => this.projection([d.longitude, d.latitude])[1])
  // //           .attr('fill', d => {
  // //             const coordinate: any | [number,number] = [d.longitude, d.latitude];
  // //             const gdistance = d3.geoDistance(coordinate, this.projection.invert(this.center));
  // //             return gdistance > 1.57 ? 'none' : 'steelblue';
  // //           })
  // //           .attr('r', 7);

  // //   this.markerGroup.each(function () {
  // //     this.parentNode.appendChild(this);
  // //   });
  // // }

  // // private drawGraticule() {
  // //   const graticule = d3.geoGraticule()
  // //     .step([10, 10]);
  
  // //   this.svg.append('path')
  // //     .datum(graticule())
  // //     .attr('class', 'graticule')
  // //     .attr('d', this.path)
  // //     .style('fill', '#fff')
  // //     .style('stroke', '#ccc');
  // // }

  // // private enableRotation(): void {
  // //   d3.timer((elapsed) => {
  // //     this.projection.rotate([this.config.speed * elapsed - 120, this.config.verticalTilt, this.config.horizontalTilt]);
  // //     this.svg.selectAll('path').attr('d', this.path);
  // //     this.drawMarkers();
  // //   });
  // // }

