import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Sort } from '../util/sort';

// sort se explica a detalle en
// https://sankhadip.medium.com/how-to-sort-table-rows-according-column-in-angular-9-b04fdafb4140
@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any> = [];
  
  constructor(private renderer: Renderer2, private targetElem: ElementRef) { }

  // Si realiza click
  @HostListener("click")
  sortData() {
    //console.log("sortData en directive")  
    // Crea el objeto de Sort Class que esta dentro de util/sort
    const sort = new Sort();
    // Obtener referencia del elemento actual en el que se hizo clic, target es el elemento que dispara un evento
    const elem = this.targetElem.nativeElement;
    //console.log("elem", elem)
    // Obtener en qué orden la lista debe ordenarse de forma predeterminada, debe configurarse para desc en el atributo del elemento
    const order = elem.getAttribute("data-order");
    //console.log("order", order)
    // Obtenga el tipo de propiedad especialmente configurado [tipo de datos = fecha] si es un campo de fecha
    const type = elem.getAttribute("data-type");
    //console.log("type", type)
    // Obtenga el nombre de la propiedad del atributo del elemento
    const property = elem.getAttribute("data-name");
    //console.log("property", property)
    if (order === "desc") {
      this.appSort.sort(sort.startSort(property, order, type));
      // Establece un valor de un atributo en un elemento específico
      elem.setAttribute("data-order", "asc");
    }
    else {
      this.appSort.sort(sort.startSort(property, order, type));
      // Establece un valor de un atributo en un elemento específico      
      elem.setAttribute("data-order", "desc");
    }
  }
  
}