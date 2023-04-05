import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { style, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-nordic-air-force-demo',
  templateUrl: './nordic-air-force-demo.component.html',
  styleUrls: ['./nordic-air-force-demo.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0, transform: 'translate(20rem, 0rem)'  }),
            animate('800ms ease-out',
                    style({ opacity: 1, transform: 'translate(0rem, 0rem)' }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1, transform: 'translate(0rem, 0rem)' }),
            animate('800ms ease-in',
                    style({ opacity: 0, transform: 'translate(0rem, -20rem)' }))
          ]
        )
      ]
    )
  ]
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
  // height: number = this.width * 0.5;
  height: number = 800;
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
  maxZoom: number = 50;

  // INTERSECTION OBSERVER
  items: number[] = [1,2,3,4,5,6, 7,8,9,10,11,12,13,14,15,16,17,18, 19]
  infoView:string = '';


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
      this.drawSupplyPath()
      this.drawMarkers();
      this.addLocationNames()
      this.addJets();
      
      this.nordicZoomIn()
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

  }

  addJets() {
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
    // .style("transform", d => `rotate(45deg) translate(-125px,-375px)`)
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
          return gdistance > 1.57 ? d.fillColor : d.fillColor;
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
      // .attr(  'shape-rendering', 'crispEdges')
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
    if (index === 1 && status === true) {
      // this.nordicZoomIn()
      this.zoomToLocation(8.33972, -3909.9983869, -242.8596992555, 1000)
    }
    if (index === 2 && status === true) {
      this.infoView = 'nordic-force'
    }
    if (index === 3 && status === true) {
      this.infoView = ''
      //zoom/action
      this.zoomToLocation(27.47, -13803.027, -1456.5896, 1000)
    }
    if (index === 4 && status === true) {
      this.infoView = 'sweden'
    }
    if (index === 5 && status === true) {
      this.infoView = ''
      this.zoomToLocation(27.47, -13307.0276, -1372.5896, 1000)
      //zoom/action
    }
    if (index === 6 && status === true) {
      this.infoView = 'norway'
    }
    if (index === 7 && status === true) {
      this.infoView = ''
      this.zoomToLocation(27.47, -13467.0276, -1765.5896, 1000)
      //zoom/action
    }
    if (index === 8 && status === true) {
      this.infoView = 'denmark'
    }
    if (index === 9 && status === true) {
      this.infoView = ''
      this.zoomToLocation(27.47, -14196.0276, -1387.5895, 1000)
      //zoom/action
    }
    if (index === 10 && status === true) {
      this.infoView = 'finland'
    }
    if (index === 11 && status === true) {
      this.infoView = ''
      this.zoomToLocation(11.4716, -5635.1502, -277.58304, 1000)
      //zoom/action
    }
    if (index === 12 && status === true) {
      this.infoView = 'joint-force'
    }
    if (index === 13 && status === true) {
      this.infoView = ''
      this.zoomToLocation(25.49248, -13498.79323, -710.6898, 1000)
      // move to formation
      this.planesToFormation()
    }
    if (index === 14 && status === true) {
      this.infoView = 'mumansk'
    }
    if (index === 15 && status === true) {
      this.infoView = ''
      this.zoomToLocation(11.7289, -5949.15438, -185.162105, 1000)
      //zoom/action
    }
    if (index === 16 && status === true) {
      this.infoView = 'supply-route'
      //draw path
    }
    if (index === 17 && status === true) {
      this.infoView = ''
      this.zoomToLocation(24.9332, -13186.42135, -944.848266, 1000)
      //zoom/action
    }
    if (index === 18 && status === true) {
      this.infoView = 'supply-disruption'
    }
    if (index === 19 && status === true) {
      this.infoView = ''
    }
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

  zoomIdentities: any = [
    {
      desc: 'Zoom to nordic region',
      k: 8.33972,
      x: -3909.9983869,
      y: -242.8596992555
    },
    {
      desc: 'Zoom to jet1',
      k: 8.33972,
      x: -3909.9983869,
      y: -242.8596992555
    },
    {
      desc: 'Zoom to jet2',
      k: 8.33972,
      x: -3909.9983869,
      y: -242.8596992555
    },
    {
      desc: 'Zoom to jet3',
      k: 8.33972,
      x: -3909.9983869,
      y: -242.8596992555
    },
    {
      desc: 'Zoom to jet4',
      k: 8.33972,
      x: -3909.9983869,
      y: -242.8596992555
    }

  ]

  nordicZoomIn() {
    const clickZoomIdNordic = d3.zoomIdentity.translate(
      this.zoomIdentities[0].x,
      this.zoomIdentities[0].y)
      .scale(this.zoomIdentities[0].k);
    this.svg.select("#mapZoomables").transition().duration(500).call(this.zoomBehavior.transform, clickZoomIdNordic)
  }

  zoomToLocation(k:number,x:number, y:number, duration:number) {
    const zoomId: any = d3.zoomIdentity.translate(x, y).scale(k);
    this.svg.select("#mapZoomables").transition().duration(duration).call(this.zoomBehavior.transform, zoomId)
  }

  planesToFormation() {
    // console.log(d3.select("#jetId-finland-jet"));
    // d3.select("#jetId-finland-jet").transition().duration(0)
    //   .attr("transform", "translate(0,0) rotate(45 538 60)")
    // d3.select("#jetId-sweden-jet").transition().duration(0)
    //   .attr("transform", "translate(0,0) rotate(45 512 63)")
    // d3.select("#jetId-norway-jet").transition().duration(0)
    //   .attr("transform", "translate(0,0) rotate(45 499 59)")
    // d3.select("#jetId-denmark-jet").transition().duration(0)
    //   .attr("transform", "translate(0,0) rotate(45 497 76)")
    // .attr("x", 538)
    // .attr("y", 60)
    d3.select("#jetId-sweden-jet")
      .transition().duration(1000)
      .attr("x", 540)
      .attr("y", 10)
      .ease(d3.easeCubic)
    // })
    .on("end", () => {
      d3.select("#jetId-finland-jet").transition().duration(2000)
      .attr("x", 540)
      .attr("y", 62)
      .ease(d3.easeBackIn)
    } )
  }
  supplyPath:any;
  curve = d3.line().curve(d3.curveNatural);
  drawSupplyPath(): void {
    const points: [number, number][] = [[547, 44], [547, 46], [548, 50] , [550, 60] ,[547, 66]];
    this.supplyPath = this.zoomGroup.append('g').attr("id", "supplyPath");
    this.supplyPath.append('path')
    // const path = this.svg.append('path')
      .attr('d', this.curve(points))
      .style('fill', 'none')
      .style('stroke', 'purple')
      .style('stoke-width', 15)
      .attr("id", "supply-path-line");
  }
}
