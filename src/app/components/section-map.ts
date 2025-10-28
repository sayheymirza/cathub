import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, PLATFORM_ID, Renderer2, viewChild } from '@angular/core';

@Component({
  selector: 'app-section-map',
  imports: [],
  templateUrl: './section-map.svg',
  host: {
    class: 'w-full h-full rounded-xl overflow-scroll relative'
  }
})
export class SectionMap {
  private svg = viewChild<ElementRef<SVGAElement>>('svg');
  private _countries: string[] = [];

  @Input()
  public set countries(value: string[]) {
    this._countries = value;
    if (isPlatformBrowser(this.platformId)) {
      this.ngOnInit();
    }
  }

  // on resize rengonInit
  @HostListener('window:resize', [])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngOnInit();
    }
  }

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this._countries.map((item) => this.svg()?.nativeElement.querySelector(item)).forEach((item) => {
        if (item) {
          this.renderRadar(item)
        }
      });
    }
  }

  private renderRadar(element: Element) {
    // Create a unique identifier for this country's radar
    const countryId = element.id || element.getAttribute('class') || 'unknown';
    const radarClass = `radar-${countryId}`;
    
    // Remove any existing radar elements for this specific country only
    const existingRadar = element.parentElement?.parentElement?.querySelector(`.${radarClass}`);
    if (existingRadar) {
      this.renderer.removeChild(existingRadar.parentElement, existingRadar);
    }

    // Use Renderer2 instead of document.createElement
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'radar');
    this.renderer.addClass(div, radarClass);

    // Get the SVG element and its dimensions
    const svgElement = this.svg()?.nativeElement;
    if (!svgElement) return;

    // Find the root SVG element for coordinate transformation
    const rootSvg = svgElement.ownerSVGElement || (svgElement as any);
    if (!rootSvg || typeof rootSvg.createSVGPoint !== 'function') {
      // Fallback method if SVG transformation is not available
      this.fallbackPositioning(element, div);
      return;
    }

    // Get the bounding box of the path in SVG coordinate system
    const bbox = (element as SVGPathElement).getBBox();
    const svgCenterX = bbox.x + bbox.width / 2;
    const svgCenterY = bbox.y + bbox.height / 2;

    // Create an SVG point and transform it to screen coordinates
    const svgPoint = rootSvg.createSVGPoint();
    svgPoint.x = svgCenterX;
    svgPoint.y = svgCenterY;

    // Transform SVG coordinates to screen coordinates
    const matrix = (element as SVGPathElement).getScreenCTM();
    if (!matrix) {
      this.fallbackPositioning(element, div);
      return;
    }

    const screenPoint = svgPoint.matrixTransform(matrix);

    // Get the container's bounding rect to adjust for positioning
    const containerRect = svgElement.parentElement?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate position relative to the container
    const centerX = screenPoint.x - containerRect.left;
    const centerY = screenPoint.y - containerRect.top;

    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'left', `${centerX}px`);
    this.renderer.setStyle(div, 'top', `${centerY}px`);
    this.renderer.setStyle(div, 'transform', 'translate(-50%, -50%)');

    this.renderer.appendChild(element.parentElement?.parentElement, div);
  }

  private fallbackPositioning(element: Element, div: HTMLElement) {
    // Fallback method using getBoundingClientRect for positioning
    const elementRect = element.getBoundingClientRect();
    const containerRect = element.parentElement?.parentElement?.getBoundingClientRect();

    if (!containerRect) return;

    const centerX = elementRect.left + elementRect.width / 2 - containerRect.left;
    const centerY = elementRect.top + elementRect.height / 2 - containerRect.top;

    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'left', `${centerX}px`);
    this.renderer.setStyle(div, 'top', `${centerY}px`);
    this.renderer.setStyle(div, 'transform', 'translate(-50%, -50%)');

    this.renderer.appendChild(element.parentElement?.parentElement, div);
  }
}
