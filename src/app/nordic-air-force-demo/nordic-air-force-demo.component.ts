import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

@Component({
  selector: 'app-nordic-air-force-demo',
  templateUrl: './nordic-air-force-demo.component.html',
  styleUrls: ['./nordic-air-force-demo.component.scss']
})
export class NordicAirForceDemoComponent implements OnInit {
  // AUDIO PROPERTIES
  audio: any;
  musicPath: string = "./assets/nordic-demo/audio/dangerzone.mp3";
  isMusicPlaying: boolean = false;
  // MAP DATA PROPERTIES
  worldUrl: string = '../../assets/world-110m.json'
  worldData: any;
  locationsUrl: string = '../../assets/nordic-demo/data/nordic-static-locations.json'
  locationsData: any;
  jetsUrl: string = '../../assets/nordic-demo/data/nordic-jet-movements.json'
  jetsData: any;
  // MAP PROPERTIES - CREATE SVG
  @ViewChild('nordicMap', {static: true}) mapRef: ElementRef;
  private svg: any;
  width: number = 1000;
  height: number = this.width * 0.5;
    // projection: d3.GeoProjection;
  projection: any;
  initialScale: number;
  path: d3.GeoPath; // formerly GeoProjection | any
  center: [number, number];
  // MAP PROPERTIES - DRAW MAP
  locations: any = [];
  markerGroup: any;
  markerNameGroup: any;
  jetGroup: any;
  // MAP PROPERTIES - ZOOM
  zoom:any;
  zoomBehavior: any;
  zoomGroup: any;
  minZoom: number = 1;
  maxZoom: number = 20;

  // INTERSECTION OBSERVER
  items: number[] = [1,2,3,4,5]


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    forkJoin([this.http.get(this.worldUrl), this.http.get(this.locationsUrl), this.http.get(this.jetsUrl)]).subscribe(res => {
      this.worldData = res[0];
      this.locationsData = res[1];
      this.jetsData = res[2]
      this.createSvg();
      this.createZoomControls();
      this.drawGraticule();
      this.drawMap();
      this.addLocationNames()
      this.addPng();
      }, err => {
        console.log('error', err);
      }
    )
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
      .attr("fill", "#232323")

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
      .style("stroke", "#6a6a6a") // country border colors
      .style("stroke-width", "0.2px")
      .style("fill", (d, i) => '#242d2e') // land color
      .style("opacity", ".6")
      this.locations = this.locationsData;
      this.drawMarkers();
  }

  addPng() {
    this.jetGroup = this.zoomGroup.append('g').attr("id", "jetGroup");
    const jets = this.jetGroup.selectAll('images')
    .data(this.jetsData);
    jets
    .enter()
    .append('image')
    .merge(jets)
    .attr("xlink:href", d => d.imgRef)
    .attr("width", "3px")
    .attr("height", "3px")
    .attr('x', d => this.projection([d.longitude, d.latitude])[0])
    .attr('y', d => this.projection([d.longitude, d.latitude])[1])
    .attr('id', d => 'jetId-' + d.name)
    .style("transform", d => `rotate(45deg) translate(-125px,-375px)`)
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
          return gdistance > 1.57 ? 'none' : d.fillColor;
      })
      .attr('r', 0.5)
      .attr('id', d => `static-` + d.name )
      .style("stroke", "#00000080")
      // .append('text')
      //   .attr("x", d => d.longitude)
      //   .attr("y", d => d.latitude)
      //   .attr("font-size", 20)
      //   .attr("fill", "red")
      //   .text(d => d.name)

    this.markerGroup.each(function () {
      this.parentNode.appendChild(this);
    });

  }

  private addLocationNames() {
    this.markerNameGroup = this.zoomGroup.append('g').attr("id", "mapMarkersNameGroup");
    const markers = this.markerNameGroup.selectAll('text')
      .data(this.locationsData);
      markers
      .enter()
      .append('text')
      .merge(markers)
      .attr('x', d => this.projection([d.longitude, d.latitude])[0] - (d.name.length/2))
      .attr('y', d => this.projection([d.longitude, d.latitude])[1])
      .attr("font-size", 1.5)
      .attr('fill', '#c4c4c4')
      .text(d => d.name)
      // this.markerNameGroup.each(function () {
        //   this.parentNode.appendChild(this);
        // });

      }

      private createZoomControls() {
        // 1. Creates group to append svg elements that are included in zoom
        this.zoomGroup = this.svg.append("g").attr("id", "mapZoomables")
        // 2. Creates zoom Behavior that when attached to element that calls listens and triggers the zoom event then performs the zoom handler with {tranform} values
        this.zoomBehavior = d3.zoom().scaleExtent([this.minZoom, this.maxZoom]).on('zoom', ({transform}) => {
      console.log(transform);
      this.svg.select("#mapZoomables").attr("transform", transform)
    })
    // 3. Attaches zoomBehavior onto svg element
    this.svg.call(this.zoomBehavior)
  }

  private drawGraticule() {
    const graticule = d3.geoGraticule()
    .step([10, 10]);

    this.zoomGroup.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", this.path)
        .style("fill", "none")
        .style("stroke", "#e6e6e612")
        .style("stroke-width", "0.2px")
  }


  public isIntersecting (status: boolean, index: number) {
    console.log('Element #' + index + ' is intersecting ' + status)
  }

  public toggleMusic() {
    this.isMusicPlaying = !this.isMusicPlaying
    if (!this.audio) {
      this.audio = new Audio();
    }
    this.audio.src = this.musicPath;
    // switch audio on
    if (this.isMusicPlaying) {
      this.audio.load();
      this.audio.loop = true;
      this.audio.muted = false;
      this.audio.play();
    }
    // switch audio off
    if (!this.isMusicPlaying) {
      // this.audio.stopMusic()
      this.audio.muted = true;
    }
  }
}
