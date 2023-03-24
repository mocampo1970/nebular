import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ConfigService } from 'src/app/services/config.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  public titulo: string = "Lista de productos";
  // definimos la vble productos que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  productos: Producto[] = [];

  // propiedad que se utiliza en el producto.html en el filtro
  filterProducto = '';    

  // este va a traer en el constructor lo que tenga configurado el config en el 
  // campo itemsCategoriesPage y page que configuran las paginas por pantalla
  public page: number;
  public itemsPage: number;    

  // es es donde tendremos todas las propiedades de todos los campos que van a componer 
  // ese formulario como aspectos de si son obligatorios, longitud mínima, tipo de campo
  registerForm: FormGroup;

  // Añadimos una propiedad submitted para hacer un control de si se ha pulsado o no el botón de enviar, 
  // para gestionar esta información.
  submitted = false;

  // inyectamos la clase FormBuilder, que será la encargada de construir agrupando un formulario 
  // con sus datos por defecto, si son obligatorios, validaciones y otras opciones que vemos 
  // a continuación. Una vez construido todo, lo asignamos en FormGroup que hemos definido 
  // en registerForm, para añadirlo en el template de este componente.
  // tambien se inyecta la configuración de la paginación
  constructor(private formBuilder: FormBuilder, private productoService: ProductoService, 
    private config: ConfigService) { 

    // se inician las vbles de paginación
    this.page = 1;
    this.itemsPage = this.config.itemsCategoriesPage;

    // Filtro
    const filterProducto = '';

    this.registerForm = new FormGroup({
      codigo: new FormControl(''),
      costo: new FormControl(''),      
      fecha_ingreso: new FormControl(''),
      nombre: new FormControl(''),
      precio: new FormControl(''),
      iva: new FormControl(0)
    });

  }

  // Cuando hace el ngOnInit se crea el formulario
  ngOnInit(): void {
    //this.createForm();
    this.productoService.getAll().subscribe(
      p => this.productos = p
    );
    
    // Obtengo los productos, ese listproductos es una vble como un alias.
    //=======================================================================================================
    // Nota importante:  ESTO SE puede hacer asi como sigue en estas 3 lineas o como las de abajo que muestra 
    //                   tambien el console.error("Error al recuperar las categorias: " + error);
    //=======================================================================================================
    //this.productoService.getAll().subscribe(
    //  listProductos => this.productos = listProductos
    //);
    console.log("ngOnInit de productos.component.ts");   

    this.productoService.getAll().subscribe(listProductos => {
      this.productos = listProductos;
      console.log("recupero los productos: " , listProductos);      
    }, error => {
      console.error("Error al recuperar los productos: " , error);
    })    
    
  }

  // Crea la forma
  createForm(){
    this.registerForm = this.formBuilder.group(
      {
        codigo:["", Validators.required],
        costo:["", Validators.required],
        existencia:["", Validators.required],
        iva:[0, Validators.required],        
        fecha_ingreso:["", Validators.required],
        nombre: ["", Validators.required],
        precio:["", Validators.required],        
      },
      {

      }
    );
  }

  // captador de conveniencia para un fácil acceso a los campos de formulario
  get form() {
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onReset(){
    this.submitted = false;
    this.registerForm?.reset();
  }

  delete(producto: Producto){

    // Tema de sweetalert2
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      text: "El registro del producto: " + producto.codigo + ' ' + producto.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // Si confirman que eliminan 
      if (result.isConfirmed) {
        // Vamos a ingresar aqui el codigo de eliminar
        this.productoService.delete(producto.id).subscribe(
          res => this.productoService.getAll().subscribe(
          response => this.productos = response  
          )
        ) 
        Swal.fire(
          'Eliminado!',
          'Tu registro fue eliminado.',
          'success'
        )
      }
    })
    
  }

  editarProducto(producto: Producto){
    console.log("producto aqui en editarProducto", producto)
  }


}
