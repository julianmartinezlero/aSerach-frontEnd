import {Component, Input} from '@angular/core';

@Component({
  selector: '[line]',
  template: `<svg:line
    [attr.x1]="x1"
    [attr.y1]="y1"
    [attr.x2]="x2"
    [attr.y2]="y2"
    [attr.stroke]="stroke"
    [attr.stroke-width]="strokeWidth" xmlns:svg="http://www.w3.org/1999/html"/>
  <svg:text
    [attr.x]="getX()"
    [attr.y]="getY()"
    [innerHTML]="label"
    [attr.font-size]="12"
    [attr.font-weight]="600"
    fill="black" xmlns:svg="http://www.w3.org/1999/html"/>`
})
export class MapLineComponent {
  @Input() x1 = 0;
  @Input() y1 = 0;
  @Input() x2 = 0;
  @Input() y2 = 0;
  @Input() stroke: string;
  @Input() strokeWidth = 0;
  @Input() label = '';
  getX() {
    return (this.x2 + this.x1) / 2;
  }
  getY() {
    return (this.y1 + this.y2) / 2;
  }
}
