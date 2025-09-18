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
let discos = [], discoMayor = 0, cantDiscos = 0;

// Función Cargar:
const Cargar = () => {
    // Cositas:
    let confirmar, acumDisco = 1;
    do{
        let disco, nombreDisco, nombreAutor, codigoUnico, pista, confirmarPistas, acumPista = 1;
        
        disco = {
            Nombre: '',
            Autor: '',
            Codigo: '',
            Pistas: [],
            CantidadPistas: 0,
            DuracionTotal: 0,
            NumeroDisco: 0,
            MayorDuracion: false,
            Seleccionado: false,
        }    

        //Validación de "Nombre:"
        do {
            nombreDisco = prompt(`¿Cual es el nombre del disco ${acumDisco}°?`);
            if (nombreDisco==null || nombreDisco=='') {
                alert('Por favor, ingresá al menos un caracter');
            }
        } while (nombreDisco==null || nombreDisco=='');
        disco.Nombre = nombreDisco;    // Luego de validar el nombre del disco, lo ingreso a "Nombre:";
        cantDiscos ++;

        //Validación de "Autor:"
        do {
            nombreAutor = prompt(`¿Quien es el autor o banda del disco ${acumDisco}° ("${nombreDisco}")?`);
            if (nombreAutor==null || nombreAutor=='') {
                alert('Por favor, ingresá al menos un caracter');
            }
        } while (nombreAutor==null || nombreAutor=='');
        disco.Autor = nombreAutor;    // Luego de validar el autor del disco, lo ingreso a "Autor:";

        //Validación de "Codigo:"
        do {
            codigoUnico = parseInt(prompt(`Introduce el código numérico único del disco ${acumDisco}° ("${nombreDisco}")`));
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
                nombrePista = prompt(`¿Cual es el nombre de la pista ${acumPista}° del disco ${acumDisco}° ("${nombreDisco}")?`);
                if (nombrePista==null || nombrePista=='') {
                    alert('Por favor, ingresá al menos un caracter');
                }
            } while (nombrePista==null || nombrePista=='');
            pista.Nombre = nombrePista;    // Luego de validar el nombre de la pista, lo ingreso a "Nombre:" en "pista{}";


            //Validación de "Duracion:" en "pista{}";
            do {
                duracionPista = parseInt(prompt(`¿Cual es la duracion de la pista ${acumPista}° (en segundos) del disco ${acumDisco}° ("${nombreDisco}")?`));
                if (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200) {
                    alert('La duracion debe ser un numero entre 0 y 7200 segundos');
                }
            } while (isNaN(duracionPista) || duracionPista < 0 || duracionPista > 7200);
            pista.Duracion = duracionPista;    // Luego de validar la duracion de la pista, lo ingreso a "Duracion:" en "pista{}";

            disco.Pistas.push(pista);

            disco.DuracionTotal += pista.Duracion;
            disco.CantidadPistas++;

            confirmarPistas = confirm('¿Queres ingresar la pista numero ' + (acumPista+1) + '°?');

            acumPista++;

        }while(confirmarPistas)
        
        disco.NumeroDisco = cantDiscos;
        discos.push(disco);    // Ingreso el objeto "disco{Nombre,Autor,etc}" al array "discos[]";

        confirmar = confirm('¿Queres Ingresár el disco numero ' + (acumDisco+1) + '°?');

        acumDisco++;

    }while(confirmar)

        console.table(discos);
};


// Función Mostrar:
const Mostrar = () => {
    // Variable para ir armando la cadena:
    let cant= '', pistaMayor;
    let html = '';
    
    // Cositas:
    
    cant += `Mis Discos (${cantDiscos})`;
    document.getElementById('discos').innerHTML = cant;

    for(let disco of discos) {
        let i = 0;
            while(i < 3) {
                disco.MayorDuracion = MarcarMayor(disco.DuracionTotal);
                i++;
            }
    }
    
    for(let disco of discos) {
        disco.MayorDuracion = MarcarMayor(disco.DuracionTotal);
        if(disco.MayorDuracion == true){
            if(disco.Seleccionado == true) {
                html += `<div class='discoMayor seleccionado'><img src="/media/vinilo-r.png" alt="Disco"><ul>`;
                html += `<li><strong>Disco: </strong>${disco.Nombre}</li>
                <li><strong>Autor: </strong>${disco.Autor}</li>
                <li><strong>Codigo Único: </strong>${disco.Codigo}</li>
                <li><strong>Pistas: </strong>${disco.CantidadPistas}</li>
                <li><strong>Duracion total: </strong>${disco.DuracionTotal}</li>
                <li><strong>Promedio de duracion: </strong>${disco.DuracionTotal/disco.CantidadPistas}</li>`;
            } else {
                html += `<div class='discoMayor'><img src="/media/vinilo-r.png" alt="Disco"><ul>`;
                html += `<li><strong>Disco: </strong>${disco.Nombre}</li>
                <li><strong>Autor: </strong>${disco.Autor}</li>
                <li><strong>Codigo Único: </strong>${disco.Codigo}</li>
                <li><strong>Pistas: </strong>${disco.CantidadPistas}</li>
                <li><strong>Duracion total: </strong>${disco.DuracionTotal}</li>
                <li><strong>Promedio de duracion: </strong>${disco.DuracionTotal/disco.CantidadPistas}</li>`;
            }
            
        } else {
            if(disco.Seleccionado == true){
                html += `<div class='disco seleccionado'><img src="/media/vinilo-v.png" alt="Disco"><ul>`;
            html += `<li><strong>Disco: </strong>${disco.Nombre}</li>
            <li><strong>Autor: </strong>${disco.Autor}</li>
            <li><strong>Codigo Único: </strong>${disco.Codigo}</li>
            <li><strong>Pistas: </strong>${disco.CantidadPistas}</li>
            <li><strong>Duracion total: </strong>${disco.DuracionTotal}</li>
            <li><strong>Promedio de duracion: </strong>${disco.DuracionTotal/disco.CantidadPistas}</li>`;
            } else {
                html += `<div class='disco'><img src="/media/vinilo-v.png" alt="Disco"><ul>`;
                html += `<li><strong>Disco: </strong>${disco.Nombre}</li>
                <li><strong>Autor: </strong>${disco.Autor}</li>
                <li><strong>Codigo Único: </strong>${disco.Codigo}</li>
                <li><strong>Pistas: </strong>${disco.CantidadPistas}</li>
                <li><strong>Duracion total: </strong>${disco.DuracionTotal}</li>
                <li><strong>Promedio de duracion: </strong>${disco.DuracionTotal/disco.CantidadPistas}</li>`;
            }
            
        }
        

        if(cantDiscos > 0) {
            pistaMayor = disco.Pistas[0];
        for (let i = 1; i<disco.Pistas.length; i++){
            if (pistaMayor.Duracion < disco.Pistas[i].Duracion){
                pistaMayor = disco.Pistas[i];
            }
        }
        }
        

        html += `<li><strong>Pista con mayor duración: </strong>${pistaMayor.Nombre} (${pistaMayor.Duracion} seg)</li>`;


        for(let pista of disco.Pistas) {
            if(disco.MayorDuracion == true) {
                html += '<div class="divPistasMayor ">';
                html += `<li><strong>Pista: </strong><span class="whiteColor">${pista.Nombre}</span></li>`;
                if(parseInt(pista.Duracion) > 180) {
                    html += `<li><strong>Duración: </strong><span class="redColor">${pista.Duracion}</span></li>`;
                } else {
                    html += `<li><strong>Duración: </strong><span class="whiteColor">${pista.Duracion}</span></li>`;
                }
            } else {
                html += '<div class="divPistas ">';
                html += `<li><strong>Pista: </strong><span class="whiteColor">${pista.Nombre}</span></li>`;
                if(parseInt(pista.Duracion) > 180) {
                    html += `<li><strong>Duración: </strong><span class="redColor">${pista.Duracion}</span></li>`;
                } else {
                    html += `<li><strong>Duración: </strong><span class="whiteColor">${pista.Duracion}</span></li>`;
                }
            }
            
            html += '</div>';
        }
        


        html += "</ul></div>";
    }

    // Si modificaste el nombre de la variable para ir armando la cadena, también hacelo acá:
    document.getElementById('info').innerHTML = html; // <--- ahí es acá
    
};

const CodigoNumerico = () => {
    let codigoBuscado = parseInt(prompt("Ingrese el código del disco YA INGRESADO que quiere ver:"));
    let encontrado = false;

    for (let disco of discos) {
        if (disco.Codigo === codigoBuscado) {
            disco.Seleccionado = true;
            encontrado = true;
        } else {
            disco.Seleccionado = false;
        }
        
    }
    
    if(encontrado) {
        alert("Se encontró una coincidencia, pulsa 'Mostrar discos' para verlo");
    }

    if (!encontrado) {
        alert("No se encontró ningún disco con ese código.");
    }
};

const MarcarMayor = (d) => {
    if(discoMayor <= parseInt(d)) {
        discoMayor = parseInt(d);
        return true;
    } else if(discoMayor > parseInt(d)) {
        return false;
    }
}

// Todas las funciones que necesites:
