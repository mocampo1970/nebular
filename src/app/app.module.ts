// Angular
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

// Services
import { TranslateService } from './services/translate.service';
import { ConfigService } from './services/config.service';

// Componentes
import { AppComponent } from './app.component';

// componentes nebular
import { NbIconModule, NbButtonModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ClientesComponent } from './components/clientes/clientes/clientes.component';
import { PaisesComponent } from './components/paises/paises/paises.component';
import { CiudadesComponent } from './components/ciudades/ciudades/ciudades.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AddProductosComponent } from './components/productos/add-productos/add-productos.component';

// Pipes
import { FilterproductoPipe } from './pipes/filterproducto.pipe';
import { TranslatePipe } from './pipes/translate.pipe';

// Directives
import { SortDirective } from './directives/sort.directive';
import { AddPaisesComponent } from './components/paises/add-paises/add-paises.component';
import { AddCiudadesComponent } from './components/ciudades/add-ciudades/add-ciudades.component';
import { FilterpaisPipe } from './pipes/filterpais.pipe';
import { FilterciudadPipe } from './pipes/filterciudad.pipe';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { AddPedidosComponent } from './components/pedidos/add-pedidos/add-pedidos.component';
import { BlueOnClickDirective } from './directives/blue-on-click.directive';

// Creamos funcion de translate y abajo de config
// esta de translate me va a ayudar a traduccir
export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

// Funcion de config
// esta funcion me va a ayudar a configurar
export function configFactory(provider: ConfigService) {
  return () => provider.getData();
}

// Nota: cuando uno crea un componente dentro de la carpeta shared que es como una carpeta compartida, 
//       que esta arriba, los componentes que se creen alla no se crean aqui. aqui solo se 
//       crean el resto de componentes que no se crearon dentro de esa carpeta. si creamos cualquier
//       componente fuera de ese shared si lo coloca aqui, obviamente como todos los que he hecho.
//       aqui solo se crean el resto de componentes que estan por fuera del shared y tambien 
//       solo el shared de esa carpeta.
//       HttpClientModule es muy IMPORTANTE para todo el tema de http incluso para el translate 
@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    ClientesComponent,
    PaisesComponent,
    CiudadesComponent,
    ProductosComponent,
    AddProductosComponent,
    FilterproductoPipe,
    SortDirective,
    AddPaisesComponent,
    AddCiudadesComponent,
    FilterpaisPipe,
    FilterciudadPipe,
    PedidosComponent,
    AddPedidosComponent,
    BlueOnClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NbLayoutModule,
    NbButtonModule,
    BrowserAnimationsModule,
    NbIconModule,               // <---------
    NbThemeModule.forRoot({ name: 'default' }),
    NbSidebarModule.forRoot(),  // <---------
    NbMenuModule.forRoot(),     // <---------
    NbEvaIconsModule,
    NbSidebarModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [ TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
