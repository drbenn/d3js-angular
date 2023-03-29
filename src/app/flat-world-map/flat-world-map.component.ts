import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class FlatWorldMapComponent implements OnInit, AfterViewInit {
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

  minZoom;
  maxZoom;
  gX;
  gY;
  // Define map zoom behaviour
  zoom;

  constructor(private http:HttpClient) { }

  map1
  ngAfterViewInit(): void {


  }

  // zoomed() {
    
  //     this.map1.selectAll("g").attr("transform", d3.event.transform);
    
  // }

  ngOnInit(): void {

    // this.zoom = d3.zoom()
    //   .scaleExtent([1, 40])
    //   .on("zoom", this.zoomed);


    forkJoin([this.http.get(this.worldUrl), this.http.get(this.locationsUrl)]).subscribe(res => {
      this.worldData = res[0];
      this.locationsData = res[1];
      this.createSvg(); 
      // this.drawGraticule(); 
      this.drawMap(); 

      this.enableZoom();


      }, err => {
        console.log('error', err);
      }
    ) 
  }


private enableZoom() {
  this.svg = d3.select("svg").call(
    d3.zoom().scaleExtent([1,40]).on("zoom", ({transform}) => {
      console.log(transform);
      // d3.zoomIdentity.translate(this.width / 2, this.height / 2).scale(40).translate(-transform.x, -transform.y)



      // ENDED HERE/START HERE!

      // this.svg.attr("transform", transform);}) // Zoom but blows up & displaces entire SVG off screen

      // this.svg.selectAll('path').attr("transform", transform);}) // Allows zoom & pan map path only
      this.svg.selectAll('circle').attr("transform", transform);}) // Allows zoom & pan marker cirlces only

      // need to write select all for g...which should be appended on svg, where this svg group includes the map and markers
      // this.svg.selectAll('g').attr("transform", transform);})
  );
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
    this.svg.append("g"); // append grouping created to place all map and marker objects?
      // .attr("transform",
      // "translate(" + 200 + "," + 200 + ")")
      // .attr("transform",
      // "scale(0.5)")

    
    this.markerGroup = this.svg.append('g');
    this.projection = d3.geoNaturalEarth1(); // d3.geoMercator() | d3.geoEquirectangular() | d3.geoNaturalEarth1()
    this.initialScale = this.projection.scale();
    this.path = d3.geoPath().projection(this.projection);
    this.center = [this.width/2, this.height/2];
  }

  mapGroup;

  private drawMap() {
    let worldDataFeatureCollection = topojson.feature(this.worldData, this.worldData.objects.countries) // converts geometry collection into featurecollections, may need to npm i geojson @types/geojson

    console.log(this.svg);
    
    this.svg.selectAll(".segment")
      .data(worldDataFeatureCollection['features'])
      .enter()
      .append("path")
      .attr("class", "segment")
      .attr("d", this.path)
      .style("stroke", "#2a352a") // country border colors
      .style("stroke-width", "1px")
      .style("fill", (d, i) => '#8b9a8b') // land color
      .style("opacity", ".6")
      // .attr("transform",
      // "scale(0.5)")
      // .call(this.zoom)
      // .on("click", this.clicked);
      this.locations = this.locationsData;
      this.drawMarkers();
      // this.svg.call(this.zoom);
  }

  // clicked(event, [x, y]) {
  //   event.stopPropagation();
  //   this.svg.transition().duration(750).call(
  //     this.zoom.transform,
  //     d3.zoomIdentity.translate(this.width / 2, this.height / 2).scale(40).translate(-x, -y),
  //     d3.pointer(event)
  //   );
  // }

  private drawGraticule() {
    const graticule = d3.geoGraticule()
    .step([10, 10]);

    this.svg.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", this.path)
        .style("fill", "none")
        .style("stroke", "#000");
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
          return gdistance > 1.57 ? 'none' : '#e35d4e';
      })
      .attr('r', 2.5)
      .style("stroke", "#00000080");

    this.markerGroup.each(function () {
      this.parentNode.appendChild(this);
    });
  }


  nordicZoomIn() {
    console.log('zoom in');
    console.log(this.svg);
    // This works in activating a zoom when clicking on map
    // this.svg = d3.select("svg").call(
    //   d3.zoom().on("zoom", (event) => {
    //     console.log(event.transform);
        
    //     this.svg.attr("transform", event.transform);
    //   } )
    // );
 
  }

  worldZoomOut() {
    console.log('zoom out');
  }


}
