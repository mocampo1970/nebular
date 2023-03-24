import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCiudadesComponent } from './components/ciudades/add-ciudades/add-ciudades.component';
import { CiudadesComponent } from './components/ciudades/ciudades/ciudades.component';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { AddPaisesComponent } from './components/paises/add-paises/add-paises.component';
import { PaisesComponent } from './components/paises/paises/paises.component';
import { AddPedidosComponent } from './components/pedidos/add-pedidos/add-pedidos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AddProductosComponent } from './components/productos/add-productos/add-productos.component';
import { ProductosComponent } from './components/productos/productos.component';

/* Creamos las rutas de navegación de la aplicación*/

const routes: Routes = [
  { path: 'clientes', component: ClientesComponent},
  { path: 'productos', component: ProductosComponent}, 
  { path: 'add-productos', component: AddProductosComponent},
  { path: 'add-productos/:id', component: AddProductosComponent},  // Se va utilizar para update 1 prod
  { path: 'paises', component: PaisesComponent},  
  { path: 'add-paises', component: AddPaisesComponent},
  { path: 'add-paises/:id', component: AddPaisesComponent},  // Se va utilizar para update 1 pais
  { path: 'ciudades', component: CiudadesComponent},
  { path: 'add-ciudades', component: AddCiudadesComponent},
  { path: 'add-ciudades/:id', component: AddCiudadesComponent},  // Se va utilizar para update 1 ciudad
  { path: 'pedidos', component: PedidosComponent},
  { path: 'add-pedidos', component: AddPedidosComponent},  
  { path: '**', pathMatch: 'full', redirectTo: 'app-components'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
