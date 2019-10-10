import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: '[circle]',
  template: `<svg:circle
    [attr.cx]="cx"
    [attr.cy]="cy"
    [attr.r]="r"
    [attr.stroke]="stroke"
    [attr.stroke-width]="strokeWidth"
    [attr.fill]="fill"
    [attr.filter]="filter"
    xmlns:svg="http://www.w3.org/1999/html"/><svg:text
    [attr.x]="cx-15"
    [attr.y]="cy-15"
    [attr.stroke]="'#000'"
    [innerHTML]="'x'"
    [attr.fill]="'#fff'"
    [attr.stroke-width]="1"
    [attr.r]="10"
    (click)="deleted.emit(true)"
    xmlns:svg="http://www.w3.org/1999/html"/><svg:text
    [attr.x]="cx - 5"
    [attr.y]="cy + 3"
    [innerHTML]="label"
    class="white"
    [attr.font-size]="15"
    [attr.font-weight]="600"
    fill="white" xmlns:svg="http://www.w3.org/1999/html"/>`
})
export class MapCircleComponent {
  @Input() cx = 0;
  @Input() cy = 0;
  @Input() r = 0;
  @Input() stroke = '';
  @Input() strokeWidth = 0;
  @Input() fill = '';
  @Input() filter = '';
  @Input() label = '';
  @Output() deleted = new EventEmitter();
  pos = 5;
}
