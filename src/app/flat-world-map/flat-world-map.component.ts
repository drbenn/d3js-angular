import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

@Component({
  selector: 'app-flat-world-map',
  templateUrl: './flat-world-map.component.html',
  styleUrls: ['./flat-world-map.component.scss']
})

// https://observablehq.com/collection/@d3/d3-geo-projection
// https://observablehq.com/@d3/programmatic-zoom?collection=@d3/d3-zoom
// https://stackoverflow.com/questions/69971491/d3-events-in-new-versions
// https://stackoverflow.com/questions/69109270/updating-d3-zoom-behavior-from-v3
export class FlatWorldMapComponent implements OnInit {
  worldUrl: string = '../../assets/world-110m.json'
  worldData: any;
  locationsUrl: string = '../../assets/nordic-locations-cluster.json'
  locationsData: any;
  @ViewChild('flatMap', {static: true}) mapRef: ElementRef;
  private svg: any;
  width: number = 960;
  height: number = 500;

  locations: any = [];

  markerGroup: any;
  // projection: d3.GeoProjection;
  projection: any;
  initialScale: number;
  path: d3.GeoPath; // formerly GeoProjection | any
  center: [number, number];

  zoom:any;
  zoomBehavior: any;
  zoomGroup: any;
  minZoom: number = 1;
  maxZoom: number = 10;



  constructor(private http:HttpClient) { }

  ngOnInit(): void {


    forkJoin([this.http.get(this.worldUrl), this.http.get(this.locationsUrl)]).subscribe(res => {
      this.worldData = res[0];
      this.locationsData = res[1];
      this.createSvg();
      this.createZoomControls();
      // this.drawGraticule();
      this.drawMap();
      this.addPng();
      }, err => {
        console.log('error', err);
      }
    )
  }

  //https://www.geeksforgeeks.org/d3-js-zoomidentity-function/
  private createZoomControls() {
    // 1. Creates group to append svg elements that are included in zoom
    this.zoomGroup = this.svg.append("g").attr("id", "mapZoomables")
    // 2. Creates zoom Behavior that when attached to element that calls listens and triggers the zoom event then performs the zoom handler with {tranform} values
    this.zoomBehavior = d3.zoom().scaleExtent([this.minZoom, this.maxZoom]).on('zoom', ({transform}) => {
      console.log(transform);

                      // Basic Map Bounds to be refactored
                      // let north: number = 100;
                      // let south: number = -100;
                      // let east: number = -100;
                      // let west: number = 100;
                      // if (transform.y > 0 && transform.y >= 100) {
                      //   transform.y = north;
                      // }
                      // if (transform.y < 0 && transform.y <= -100) {
                      //   transform.y = south;
                      // }
                      // if (transform.x < 0 && transform.x <= -100) {
                      //   transform.x = east;
                      // }
                      // if (transform.x > 0 && transform.x >= 100) {
                      //   transform.x = west;
                      // }
      this.svg.select("#mapZoomables").attr("transform", transform)
    })
    // 3. Attaches zoomBehavior onto svg element
    this.svg.call(this.zoomBehavior)
  }


  private createSvg() {
    this.svg = d3.select(this.mapRef.nativeElement)
      .attr("viewBox", [0, 0, this.width, this.height])
      .append("svg")
      .attr('width', this.width)
      .attr('height', this.height);
    this.svg.append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#4c4c4c")

    this.projection = d3.geoNaturalEarth1(); // d3.geoMercator() | d3.geoEquirectangular() | d3.geoNaturalEarth1()
    this.initialScale = this.projection.scale();
    this.path = d3.geoPath().projection(this.projection);
    this.center = [this.width/2, this.height/2];
  }


  private drawMap() {
    let worldDataFeatureCollection = topojson.feature(this.worldData, this.worldData.objects.countries) // converts geometry collection into featurecollections, may need to npm i geojson @types/geojson
    this.zoomGroup.selectAll(".segment")
      .data(worldDataFeatureCollection['features'])
      .enter()
      .append("path")
      .attr("class", "segment")
      .attr("d", this.path)
      .style("stroke", "#2a352a") // country border colors
      .style("stroke-width", "1px")
      .style("fill", (d, i) => '#8b9a8b') // land color
      .style("opacity", ".6")
      this.locations = this.locationsData;
      this.drawMarkers();
  }

  private drawGraticule() {
    const graticule = d3.geoGraticule()
    .step([10, 10]);

    this.zoomGroup.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", this.path)
        .style("fill", "none")
        .style("stroke", "#000");
  }

  private drawMarkers() {
    this.markerGroup = this.zoomGroup.append('g').attr("id", "mapMarkersGroup");
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
          return gdistance > 1.57 ? 'none' : '#e35d4e';
      })
      .attr('r', 2.5)
      .style("stroke", "#00000080");

    this.markerGroup.each(function () {
      this.parentNode.appendChild(this);
    });
  }


  nordicZoomIn() {
    const clickZoomIdNordic = d3.zoomIdentity.translate(-2909.299, -213.304).scale(6.241);
    this.svg.select("#mapZoomables").transition().duration(2000).call(this.zoomBehavior.transform, clickZoomIdNordic)
  }

  worldZoomOut() {
    const worldView = d3.zoomIdentity.translate(0, 0).scale(1);
    this.svg.select("#mapZoomables").transition().duration(2000).call(this.zoomBehavior.transform, worldView)
  }

  panEast() {
    const panEastView = d3.zoomIdentity.translate(-3100, -213.304).scale(6.241);
    this.svg.select("#mapZoomables").transition().duration(2000).call(this.zoomBehavior.transform, panEastView)
  }

  addPng() {
    this.zoomGroup.append('image')
      .attr("xlink:href", '../../assets/image/air-force.png')
      .attr("width", "25px")
      .attr("height", "25px")
      .attr("x", "22")
      .attr("y", "99")
    }


}
