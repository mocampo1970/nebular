import { Ciudad } from "./ciudad";
import { Pais } from "./pais";



// Se puede crear por click derecho crear archivo o por comando ng g class Cliente
export class Cliente {
    idCliente: number = 0;
    nombre: string = '';
    primerApellido: string = '';
    segundoApellido: string = '';
    telefono: string = '';
    emailPersonal: string = '';
    emailLaboral: string = '';
    ciudadncto: Ciudad = {
        id: 0,
        nombre: '',
        pais: {
            id: 0,
            nombre: ''
        }
    };
    fechancto: Date = new Date();
    ciudadresidencia: Ciudad = {
        id: 0,
        nombre: '',
        pais: {
            id: 0,
            nombre: ''
        }
    };
    direccionResidencia: string = '';
    observaciones: string = '';
    
}