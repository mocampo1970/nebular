import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-add-productos',
  templateUrl: './add-productos.component.html',
  styleUrls: ['./add-productos.component.css']
})
export class AddProductosComponent implements OnInit {

  // Creamos el modelo y abajo le asignamos valores para cuando consuma el api
  producto: Producto = new Producto();

  public isAdd: boolean = true;

  private today = new Date().toISOString().substring(0, 10);

   //================= Otra forma de trabajar
  // Instanciamos cada campo que tiene el formulario pero dentro del FormGroup
  // Al constructor le enviamos un json con cada campo que hay en el formulario por eso
  // debe ser con : por ejm si coloco algo dentro del formControl el lo muestra en pantalla
  // Nota: Si queremos que este formulario edite y ADD debemos colocar el id de la entidad o tabla
  //       en esta pantalla cuando se crea el FormGroup, cuando se hace el get ID, cuando se 
  //       hace el submit y cuando se hace el patchValue
  //       casi que debe tener los mismos campos que el model
  formularioRegistro = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(4)]),    
    costo: new FormControl(0, [Validators.required, Validators.min(10)]),
    existencia: new FormControl(0,[Validators.required, Validators.min(1)]),
    iva: new FormControl(0, [Validators.required, Validators.min(0)]),
    precio: new FormControl(0, [Validators.required, Validators.min(10)]),    
    fechaIngreso: new FormControl('',[Validators.required])
  })

  // Inyectamos el servicio y mediante el cual nos vamos a conectar al api rest, adicional
  // declaramos router que nos va a permitir navegar entre la aplicación y devolvernos 
  // a la lista de productos, y 
  // ActivatedRoute Proporciona acceso a información sobre una ruta asociada con un componente
  constructor(private productosService: ProductoService, private router: Router,
    private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    // Cuando presione Editar en la  vista productos.components.html hace routerLink a 
    // esta vista addproducto con el parametro producto.id y aqui en addproducto
    // abre y ejecuta este metodo ngOnit que llama al cargar
    // hace el cargar que es el metodo que carga datos a esa pantalla. 
    console.log("producto.id", this.producto.id)
    this.cargar(); // apoyarme en estudintes de proyecto4
  }

  //============= podemos acceder al valor que tenga cada campo del formulario

  // vamos a poder acceder al valor que tenga el campo codigo
  get id(){
    return this.formularioRegistro.get('id');
  }  

  // vamos a poder acceder al valor que tenga el campo codigo
  get codigo(){
    return this.formularioRegistro.get('codigo');
  }

  // vamos a poder acceder al valor que tenga el campo nombre
  get nombre(){
    return this.formularioRegistro.get('nombre');
  } 

  // vamos a poder acceder al valor que tenga el campo nombre
  get costo(){
    return this.formularioRegistro.get('costo');
  } 

  // vamos a poder acceder al valor que tenga el campo existencia  
  get existencia(){
    return this.formularioRegistro.get('existencia');
  }

  get iva(){
    return this.formularioRegistro.get('iva');
  }

  // vamos a poder acceder al valor que tenga el campo precio  
  get precio(){
    return this.formularioRegistro.get('precio');
  }

  // vamos a poder acceder al valor que tenga el campo fecha ingreso  
  get fechaIngreso(){
    return this.formularioRegistro.get('fechaIngreso');
  }   

  // Obtiene el producto y lo muestra en pantalla vamos a utilizar funciones anonimas
  // subscribe para obtener el enlace e y lo asigna a la vble id, si el id es correcto(verdadero)
  // asigna al producto.
  // apoyarme en estudintes de proyecto4
  cargar(): void{
    this.activatedRoute.params.subscribe(
      e => {
        // Capturamos el id que venga en el enlace
        let id = e['id']; 
        let cod = e['codigo'];
        console.log("id en cargar", id);  

        // Si id es valido entra y es porque estan editando
        // marca la vble isAdd como false que significa que no es adicion sino que va a editar
        if (id) {
          this.isAdd = false;
          //==================================================================================
          // para recuperar varios parametros en un subscribe se hace con subscribe((value) => {
          // separados por punto y coma(;) como lo hacia abajo no funcionaba porque 
          // dentro del subscribe con ( no permite recuperar varios campos
          //==================================================================================            
          this.productosService.get(id).subscribe((producto) => {
//            console.log("value", value),
            // Con patchValue me permite en estos formularios reactivos asignar cada campo
            this.formularioRegistro.patchValue({id: producto.id});
            this.formularioRegistro.patchValue({codigo: producto.codigo});
            this.formularioRegistro.patchValue({nombre: producto.nombre});
            this.formularioRegistro.patchValue({costo: producto.costo});
            this.formularioRegistro.patchValue({existencia: producto.existencia});
            this.formularioRegistro.patchValue({iva: producto.iva});
            this.formularioRegistro.patchValue({precio: producto.precio});
            this.formularioRegistro.patchValue({fechaIngreso: producto.fechaIngreso});            
          })
          console.log("produ entro if", this.producto);
 
        }        

        // Si id es valido entra aqui. No funcionaba porque el subscribe que tenia sin { adentro le colocaba 
		    // this.formularioRegistro.patchValue({codigo: value.codigo}); salia error porque son varios campos para el caso
		    // de varios campos debe hacer con subscribe((value) => { ..... ])
        /*if (id) {
          this.productosService.get(id).subscribe(
           es=>this.producto = es
          )
          console.log("produ entro if", this.producto);

          this.formularioRegistro.patchValue({codigo: this.producto.codigo});
          this.formularioRegistro.patchValue({nombre: 'mao'});
          this.formularioRegistro.patchValue({costo: 126628});
 
        } // cierre el if*/
      }
    );
  }

  // Guardar
  onSubmit(){
    console.log("formulario", this.formularioRegistro.value);
    console.log("formulario valido: " , this.formularioRegistro.valid)

    // deténgase aquí si el formulario no es válido
    if (this.formularioRegistro.invalid) {
      return;
    }

    // Asignamos cada campo del formulario al modelo o entidad producto
    this.producto.id          = this.formularioRegistro.value.id;     
    this.producto.codigo      = this.formularioRegistro.value.codigo;
    this.producto.nombre      = this.formularioRegistro.value.nombre;
    this.producto.costo       = this.formularioRegistro.value.costo;   
    this.producto.precio      = this.formularioRegistro.value.precio;  
    this.producto.existencia  = this.formularioRegistro.value.existencia;
    this.producto.iva         = this.formularioRegistro.value.iva;
    this.producto.fechaIngreso= this.formularioRegistro.value.fechaIngreso;
    console.log("fecha ingreso antes de guardar", this.producto.fechaIngreso)

    // Si esta adicionando
    if (this.isAdd) {
      // Consumo el servicio que alla se hace el http.post del api
      this.productosService.addProducto(this.producto).subscribe(
        res =>this.router.navigate(['/productos'])
      )
    } else {
        this.producto.id      = this.formularioRegistro.value.id;      
        // Consumo el servicio que alla se hace el http.post del api
        this.productosService.update(this.producto).subscribe(
          res =>this.router.navigate(['/productos'])
        )
    }

    // Consumo el servicio que alla se hace el http.post del api
    //this.productosService.addProducto(this.producto).subscribe(
    //  res =>this.router.navigate(['/productos'])
    //)

    // mostrar valores de formulario en caso de éxito
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.formularioRegistro.value, null, 4)
    );

  }


}