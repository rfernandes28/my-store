import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef) {
    // this.element.nativeElement.style.backgroundColor = 'red';
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }
}


/*
Angular utiliza el concepto de directiva para cambiar la apariencia o el comportamiento de un elemento en el HTML. Acá estaremos conociendo las directivas.
*/
