import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightExpensive]',
})
export class HighlightExpensive implements OnChanges {
  @Input() appHighlightExpensive = 0;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appHighlightExpensive > 1000) {
      this.el.nativeElement.style.backgroundColor = '#ffe0b2';
      this.el.nativeElement.style.fontWeight = 'bold';
    } else {
      this.el.nativeElement.style.backgroundColor = '';
      this.el.nativeElement.style.fontWeight = '';
    }
  }
}
