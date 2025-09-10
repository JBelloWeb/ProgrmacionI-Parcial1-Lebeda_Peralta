'use strict';

/*
 * PERALTA, JUAN IGNACIO | LEBEDA, LUCA
 */

// Ejemplo de la estructura de un disco:
// let disco = {
//     Nombre: 'El lado oscuro de la Programación',
//     Autor: 'Los Programadores Anónimos',
//     Codigo: 1,
//     Pistas: [
//         {
//             Nombre: 'Esa cajita loca llamada variablecita',
//             Duracion: 200,
//         },
//         {
//             Nombre: 'Nunca quise ser un NaN',
//             Duracion: 180,
//         },
//         {
//             Nombre: 'No quiero programar',
//             Duracion: 90,
//         },
//         {
//             Nombre: 'Bajo presión',
//             Duracion: 240,
//         },
//         {
//             Nombre: 'La odisea de las variables privadas',
//             Duracion: 120,
//         },
//         {
//             Nombre: 'Sr. Programador',
//             Duracion: 720,
//         },
//     ],
// };

// Discos:
let discos = [];

// Función Cargar:
const Cargar = () => {
    // Cositas:
    let confirmar;
    do{
        let disco, nombreDisco, nombreAutor, codigoUnico, pista, confirmarPistas, acumPista = 1;
        
        disco = {
            Nombre: '',
            Autor: '',
            Codigo: '',
            Pistas: []
        }    

        //Validación de "Nombre:"
        do {
            nombreDisco = prompt(`¿Cual es el nombre del disco?`);
            if (nombreDisco==null || nombreDisco=='') {
                alert('Por favor, ingresá al menos un caracter');
            }
        } while (nombreDisco==null || nombreDisco=='');
        disco.Nombre = nombreDisco;    // Luego de validar el nombre del disco, lo ingreso a "Nombre:";


        //Validación de "Autor:"
        do {
            nombreAutor = prompt(`¿Quien es el autor o banda del disco "${nombreDisco}"?`);
            if (nombreAutor==null || nombreAutor=='') {
                alert('Por favor, ingresá al menos un caracter');
            }
        } while (nombreAutor==null || nombreAutor=='');
        disco.Autor = nombreAutor;    // Luego de validar el autor del disco, lo ingreso a "Autor:";

        //Validación de "Codigo:"
        do {
            codigoUnico = parseInt(prompt(`Introduce el código numérico único del disco "${nombreDisco}"`));
            if (isNaN(codigoUnico) || codigoUnico < 1 || codigoUnico > 999) {
                alert('El código debe ser un número entre 1 y 999.');
            }
            if (discos.some(disco => disco.Codigo === codigoUnico)){      //Busco si en el array "discos[]" hay algun disco.Codigo igual al que ingresó el usuario;
                alert('El código que ingresaste ya está en uso. Intentá otra vez');
            }
        } while (isNaN(codigoUnico) || codigoUnico < 1 || codigoUnico > 999 || discos.some(disco => disco.Codigo === codigoUnico));
        disco.Codigo = codigoUnico;       // Luego de validar el codigo unico del disco, lo ingreso a "Codigo:";


        //Validación de "Pistas[]"
        do{
            let nombrePista, duracionPista; 

            pista = {
                Nombre: '',
                Duracion: ''
            }


            //Validación de "Nombre:" en "pista{}";
            do {
                nombrePista = prompt(`¿Cual es el nombre de la pista ${acumPista}° del disco "${nombreDisco}"?`);
                if (nombrePista==null || nombrePista=='') {
                    alert('Por favor, ingresá al menos un caracter');
                }
            } while (nombrePista==null || nombrePista=='');
            pista.Nombre = nombrePista;    // Luego de validar el nombre de la pista, lo ingreso a "Nombre:" en "pista{}";


            //Validación de "Duracion:" en "pista{}";
            do {
                duracionPista = parseInt(prompt(`¿Cual es la duracion de la pista ${acumPista}° (en segundos) del disco "${nombreDisco}"?`));
                if (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200) {
                    alert('La duracion debe ser un numero entre 0 y 7200 segundos');
                }
            } while (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200);
            pista.Duracion = duracionPista;    // Luego de validar la duracion de la pista, lo ingreso a "Duracion:" en "pista{}";

            disco.Pistas.push(pista);

            confirmarPistas = confirm('¿Queres ingresar otra pista?');

            acumPista++

        }while(confirmarPistas)
        
        discos.push(disco);    // Ingreso el objeto "disco{Nombre,Autor,etc}" al array "discos[]";

        confirmar = confirm('¿Queres Ingresár otro disco?');
    }while(confirmar)

        console.table(discos);
};

// Función Mostrar:
const Mostrar = () => {
    // Variable para ir armando la cadena:
    let html = '';
    // Cositas:
    for(let disco of discos) {
        html += "<ul>";
        html += `<li><strong>Disco: </strong>${disco.Nombre}</li>
        <li><strong>Autor: </strong>${disco.Autor}</li>
        <li><strong>Codigo Único: </strong>${disco.Codigo}</li>`;

        for(let pista of disco.Pistas) {
            html += `<li><strong>Pista: </strong>${pista.Nombre}</li>`;
            if(parseInt(pista.Duracion) > 180) {
                html += `<li><strong>Duración: </strong><span class="redColor">${pista.Duracion}</span>`;
            } else {
                html += `<li><strong>Duración: </strong>${pista.Duracion}`;
            }
        }
        html += "</ul>";
    }

    // Si modificaste el nombre de la variable para ir armando la cadena, también hacelo acá:
    document.getElementById('info').innerHTML = html; // <--- ahí es acá
};

// Todas las funciones que necesites:
