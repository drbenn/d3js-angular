import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-basic-tween-anim',
  templateUrl: './basic-tween-anim.component.html',
  styleUrls: ['./basic-tween-anim.component.scss']
})
export class BasicTweenAnimComponent implements OnInit, AfterViewInit {
  @ViewChild('svg') svgRef: ElementRef<SVGElement>;

  private width = 400;
  private height = 400;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const svg = d3.select(this.svgRef.nativeElement)
    .attr("width", this.width )
    .attr("height", this.height)

    const pathData = 'M 100 100 L 300 100 L 200 300 Z';
    const path = svg.append('path')
    .attr('d', pathData)
    .style('fill', 'none')
    .style('stroke', 'black');

    const circle = svg.append('circle')
    .attr('r', 20)
    .style('fill', 'blue')
    .attr('transform', 'translate(100, 100)');

    circle.transition()
      .duration(3000)
      .attrTween('transform', tween);


    function tween() {
      console.log(path);
      console.log(path.node());


      const pathNode = path.node()
      const pathLength = pathNode.getTotalLength();
      return function (t: number) {
        const point = pathNode.getPointAtLength(t * pathLength);
        return `translate(${point.x}, ${point.y})`;
      }
    }
  }




}