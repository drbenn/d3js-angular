import { Component, OnInit } from '@angular/core';
import { simpleMapData } from './simple-map-feature';

@Component({
  selector: 'app-simple-map',
  templateUrl: './simple-map.component.html',
  styleUrls: ['./simple-map.component.scss']
})
export class SimpleMapComponent implements OnInit {
  // https://mappingwithd3.com/examples/getting-started/simple-geojson-map/
  constructor() { }

  ngOnInit(): void {
  }

}
