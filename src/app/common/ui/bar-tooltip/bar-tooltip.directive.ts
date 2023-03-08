import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, ElementRef, EmbeddedViewRef, HostListener, Injector, Input } from '@angular/core';
import { BarTooltipComponent } from './bar-tooltip.component';

@Directive({
  selector: '[barTooltip]'
})
export class BarTooltipDirective {


  @Input() barTooltip = 'MUNKLE';

  private componentRef: ComponentRef<any> = null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    console.log('mouseenter');

    if (this.componentRef === null) {
        const componentFactory =
              this.componentFactoryResolver.resolveComponentFactory(
              BarTooltipComponent);
        this.componentRef = componentFactory.create(this.injector);
        this.appRef.attachView(this.componentRef.hostView);
        const domElem =
              (this.componentRef.hostView as EmbeddedViewRef<any>)
              .rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
        this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.barTooltip;
      const {left, right, bottom} =
            this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.top = bottom;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }


}
