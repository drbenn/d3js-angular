import { Component, OnInit, Input, ElementRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as d3 from 'd3';


interface StackedChart {
  one: number,
  two: number,
  three: number,
  date: string,
  type: string
}

interface LineChart {
  date: string,
  value: number
}

@Component({
  selector: 'app-stacked-bar-tooltip',
  templateUrl: './stacked-bar-tooltip.component.html',
  styleUrls: ['./stacked-bar-tooltip.component.scss']
})
export class StackedBarTooltipComponent implements OnInit {
  @Input() data: StackedChart[];
  @Input() lineData: LineChart[]

  private w: number = 600;
  private h: number = 400;
  private divH: number = 375;
  private halfLength: number;
  private margin = { top: 10, right: 50, bottom: 80, left: 50 };
  private width = this.w - this.margin.left - this.margin.right;
  private height = this.h - this.margin.top - this.margin.bottom;

  private x0: any;
  private x1: any;
  private y0: any;
  private y1: any;
  private svg: any;
  private g: any;
  private stack: any;
  private chart: any;
  private layersBarArea: any;
  private layersBar: any;
  private x0Axis: any;
  private x1Axis: any;
  private y0Axis: any;
  private y1Axis: any;
  private legend: any;
  private legendItems: any;
  private tooltip: any;
  private stackedSeries: any;
  private layersDivs: any;
  private layersBlockArea: any;
  private valueline: any;
  private lineArea: any;
  private pageX: any;
  private pageY: any;

  private colors = ['yellow', 'green', 'blue'];

  constructor(private container: ElementRef) {

  }

  ngOnInit() {
    this.stack = d3.stack()
      .keys(['one', 'two', 'three', 'four'])

    this.initScales();
    this.initSvg();
    this.drawAxis();
    this.createStack(this.data);
  }

/////////////// initScales

  private initScales() {
    this.x0 = d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.05);

    this.y0 = d3.scaleLinear()
      .range([this.height, 0])

    this.x1 = d3.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.05);

    this.y1 = d3.scaleLinear()
      .range([this.height, 0])
  }

/////////////// initSvg

  private initSvg() {

    this.tooltip = d3.select('body').append("div")
      .classed('chart-tooltip', true)
      .style('display', 'none');

    this.svg = d3.select(this.container.nativeElement)
      .select('.chart-container')
      .append('svg')
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr('class', 'chart')
      .attr("viewBox", "0 0 600 400");

    this.chart = this.svg.append('g')
      .classed('chart-contents', true)
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.layersBarArea = this.chart.append('g')
      .classed('layers', true);

  }


/////////////// drawAxis


  private drawAxis() {
    this.x0Axis = this.chart.append('g')
      .classed('x-axis', true)
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x0))

    this.y0Axis = this.chart.append('g')
      .classed('y0-axis', true)
  }

/////////////// createStack

  private createStack(stackData: any) {
    this.stackedSeries = this.stack(stackData);
    this.drawChart(this.stackedSeries)
  }

/////////////// drawChart

  private drawChart(data: any) {
    this.layersBar = this.layersBarArea.selectAll('.layer')
      .append('rect')
      .data(data)
      .enter()
      .append('g')
      .classed('layer', true)
      .style('fill', (d: any, i: any) => {
        return this.colors[i]
      });

    this.x0.domain(this.data.map((d: any) => {
      return d.date
    }));

    this.chart.select('.x-axis').call(d3.axisBottom(this.x0))

    this.y0.domain([0, +d3.max(this.stackedSeries, function (d: any) {
      return d3.max(d, (d: any) => {
        return d[1]
      })
    })]);
    this.chart.select('.y0-axis').call(d3.axisLeft(this.y0))

    let bars = this.layersBar.selectAll('rect')
      .data((d: any) => {
        return d;
      })
      .enter()
      .append('rect')

      .attr('y', (d: any) => {
        //return this.y0(d[1])
        return this.y0(0)
      })

      .attr('width', this.x0.bandwidth() * 0.95 * 0.5)

      .attr('x', (d: any, i: any) => {
        return (this.x0(d.data.date) + (i % 2) * 0.525 * this.x0.bandwidth());
      })

      .attr('height', 0);

    bars.transition()
      .ease(d3.easeCubic)
      .duration(1000)
      .attr('height', (d: any, i: any) => {
        return this.y0(d[0]) - this.y0(d[1]);
      })
      .attr('y', (d: any) => {
        return this.y0(d[1])
      })

    // bars.on("mouseover", ()=>{
		// 	d3.select('.chart-tooltip').style("display", null)
		// 	})
		// 	.on("mouseout", ()=>{
		// 		d3.select('.chart-tooltip').style("display", "none")
		// 	})
		// 	.on("mousemove", (d:any)=>{
		// 		d3.select('.chart-tooltip')
		// 			.style("left", d3.event.pageX + 15 + "px")
		// 			.style("top", d3.event.pageY - 25 + "px")
		// 			.text(d[1] - d[0]);

		// 	});
  }

}
