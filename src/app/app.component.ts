import { Component } from '@angular/core';
import {NbMenuItem, NbSidebarService} from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nebular';

  // estos iconos los trae de eva-icons qe en la documentación se instala 
  // y estos items son los items son los items del sidebar
  // https://akveo.github.io/nebular/docs/components/menu/overview#nbmenuitem

  items: NbMenuItem[] = [
    {
      title: 'Home',
      icon: 'home-outline',
      link: '/home',
      home: true
    },
    {
      title: 'Maestros',
      expanded: true,
      children: [
        {
          title: 'Productos',
          icon: 'archive',
          link: '/productos', // goes into angular `routerLink`
        },        
        {
          title: 'Paises',
          icon: 'globe-3',          
          link: '/paises', // goes into angular `routerLink`
        },
        {
          title: 'Ciudades',
          icon: 'globe',
          link: '/ciudades', // goes into angular `routerLink`
        }, 
        {
          title: 'Clientes',
          icon: 'person-outline',
          link: '/clientes'
        },
        {
          title: 'Proveedores',
          icon: 'car-outline',
          link: '/proveedores'
        },                
      ],
    },    
    {
      title: 'Usuarios',
      icon: 'people-outline',
      link: '/users'
    },
    {
      title: 'Pedidos',
      icon: 'car-outline',
      link: '/pedidos'
    },
    {
      title: 'Menu link with parameters',
      expanded: true,
      children: [
        {
          title: 'Goes into angular `routerLink`',
          link: '', // goes into angular `routerLink`
        },
        {
          title: 'Goes directly into `href` attribute',
          url: '/example/menu/menu-link-params.component#some-location', // goes directly into `href` attribute
        },
        {
          title: 'Menu item path match `prefix`',
          link: '/example/menu/menu-link-params.component',
          queryParams: {someUrlParam: 'true'},
          pathMatch: 'prefix',
        },
        {
          title: 'Will be opened in new window (target=`_blank`)',
          url: 'https://github.com/akveo/nebular',
          target: '_blank',
        },
        {
          title: 'Menu item with icon',
          link: '/example/menu/menu-link-params.component',
          icon: 'search-outline',
        },
        {
          title: 'Hidden menu item',
          link: '',
          hidden: true,
        },
      ],
    },
    {
      title: 'Profile',
      expanded: true,
      children: [
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
      ],
    },
    {
      title: 'Shopping Bag',
    },
    {
      title: 'Orders',
    },
  ];

  constructor(private readonly sidebarService: NbSidebarService) {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;
  }
}
