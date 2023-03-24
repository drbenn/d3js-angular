import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-gpt-circle-tween',
  templateUrl: './gpt-circle-tween.component.html',
  styleUrls: ['./gpt-circle-tween.component.scss']
})
export class GptCircleTweenComponent implements OnInit, AfterViewInit {
  @ViewChild('svg') svgRef: ElementRef<SVGElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const svg = d3.select(this.svgRef.nativeElement);

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
