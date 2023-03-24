import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

// se explica esta directiva en:
// https://medium.com/angular-in-depth/accessing-dom-elements-in-angular-directives-event-target-vs-elementref-9dd606b17840
// y lo que hace es poner cuando le den click a un objeto ponerlo en azul
@Directive({
  selector: '[appBlueOnClick]'
})
export class BlueOnClickDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  // Cuando le den click cambia el background skyblue
  @HostListener('click', ['$event'])
  changeBackground(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background', 'skyblue');
  }


}
