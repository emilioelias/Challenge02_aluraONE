let palabras = ['JAVA', 'JAVASCRIPT', 'HTML', 'ALURA', 'MYSQL', 'SPRINT'];
let palabra;
let cantErrores = 0;
let cantAciertos = 0;
let $divIniciarJuego = document.querySelector("#div-iniciar-juego");
let $divIngresarPalabra = document.querySelector("#div-ingresar-palabra");
let $divJugarAhorcado = document.querySelector("#div-jugar-ahorcado");
const botonLetras = document.querySelectorAll("#botonLetras button");

mostrarPantallaIniciarJuego();

for (let i = 0; i < botonLetras.length; i++) {
    botonLetras[i].addEventListener('click', clickLetras);
}

function obtenerPalabraSecreta() {

    borrarDibujoEnCanvas();
    //agregarPalabra();
    dibujarHorca();

    id('mensajeGP').innerHTML = "";
    let cantErrores = 0;
    let cantAciertos = 0;

    let $palabraAdivinar = document.querySelector("#palabraAdivinar");
    $palabraAdivinar.innerHTML = '';

    botonObtenerPalabra.disabled = true;
    botonAbandonarJuego.disabled = false;

    for (let i = 0; i < botonLetras.length; i++) {
        botonLetras[i].disabled = false;
    }

    const valorAzar = valorIndiceAleatorio();
    palabra = palabras[valorAzar];
    const cantidadLetras = palabra.length;

    for (let i = 0; i < cantidadLetras; i++) {
        const $span = document.createElement("span");
        $palabraAdivinar.appendChild($span);
    }
}

function clickLetras(event) {
    const spans = document.querySelectorAll('#palabraAdivinar span');

    const teclaPulsada = event.target; //cual de todas las letras llamo a la funcion
    teclaPulsada.disabled = true;

    const teclaPulsadaEnMayuscula = teclaPulsada.innerHTML.toUpperCase();
    const palabraEnMayuscula = palabra.toUpperCase();

    let hayAcierto = false; //asumo ue el jugador no adivino la letra

    for (let i = 0; i < palabraEnMayuscula.length; i++) {
        if (teclaPulsadaEnMayuscula == palabraEnMayuscula[i]) {
            hayAcierto = true;
            cantAciertos++;
            spans[i].innerHTML = teclaPulsadaEnMayuscula;
        }
    }

    if (cantAciertos == palabraEnMayuscula.length) {

        id('mensajeGP').innerHTML = "Felicitaciones, ganaste!!!";

        botonAbandonarJuego.disabled = false;
        botonObtenerPalabra.disabled = false;

        cantAciertos = 0;

        bloquearBotones();
    }

    if (hayAcierto == false) {

        cantErrores++;

        if (cantErrores == 1) {
            dibujarCabeza();
            id('mensajeGP').innerHTML = "Error 1!";
        }
        if (cantErrores == 2) {
            dibujarCabeza();
            dibujarCuerpo();
            id('mensajeGP').innerHTML = "Error 2!";
        }
        if (cantErrores == 3) {
            dibujarCabeza();
            dibujarCuerpo();
            dibujarPiernaIzquierda();
            id('mensajeGP').innerHTML = "Error 3!";
        }
        if (cantErrores == 4) {
            dibujarCabeza();
            dibujarCuerpo();
            dibujarPiernaIzquierda();
            dibujarPiernaDerecha();
            id('mensajeGP').innerHTML = "Error 4!";
        }
        if (cantErrores == 5) {
            dibujarCabeza();
            dibujarCuerpo();
            dibujarPiernaIzquierda();
            dibujarPiernaDerecha();
            dibujarBrazoIzquierdo();
            id('mensajeGP').innerHTML = "Error 5!";
        }
        if (cantErrores == 6) {
            dibujarCabeza();
            dibujarCuerpo();
            dibujarPiernaIzquierda();
            dibujarPiernaDerecha();
            dibujarBrazoIzquierdo();
            dibujarBrazoDerecho();
            id('mensajeGP').innerHTML = "Error 6!";
        }
        if (cantErrores == 7) {
            id('mensajeGP').innerHTML = "Lo siento, perdiste!";
            cantErrores = 0;
            botonAbandonarJuego.disabled = false;
            botonObtenerPalabra.disabled = false;
            bloquearBotones();
            let $palabraAdivinar = document.querySelector("#palabraAdivinar");
            $palabraAdivinar.innerHTML = '';
        }
    }
}

bloquearBotones();

//---------------------------------------------------------------------------------
// --------------------------------- FUNCIONES ------------------------------------

function id(str) {
    return document.getElementById(str);
}

function ocultarElemento(elemento) {
    elemento.classList.add("oculto");
}

function mostrarElemento(elemento) {
    elemento.classList.remove("oculto");
}

function mostrarPantallaIniciarJuego() {
    cantErrores = 0;
    cantAciertos = 0;
    id('mensajeGP').innerHTML = "";
    mostrarElemento($divIniciarJuego);
    ocultarElemento($divIngresarPalabra);
    ocultarElemento($divJugarAhorcado);
    borrarDibujoEnCanvas();
}

function mostrarPantallaIngresarPalabra() {
    ocultarElemento($divIniciarJuego);
    mostrarElemento($divIngresarPalabra);
    ocultarElemento($divJugarAhorcado);
}

function mostrarPantallaJugarAhorcado(){
    ocultarElemento($divIniciarJuego);
    ocultarElemento($divIngresarPalabra);
    mostrarElemento($divJugarAhorcado);
    dibujarHorca();
    cantAciertos = 0;
    cantErrores = 0;
    botonAbandonarJuego.disabled = false;
    botonObtenerPalabra.disabled = false;
    bloquearBotones();
    let $palabraAdivinar = document.querySelector("#palabraAdivinar");
    $palabraAdivinar.innerHTML = '';
}

function guardarPalabraMostrarPantallaJugarAhorcado() {
    if(validarPalabraIngresada()==true){
    agregarPalabra();
    ocultarElemento($divIniciarJuego);
    ocultarElemento($divIngresarPalabra);
    mostrarElemento($divJugarAhorcado);
    dibujarHorca();
    cantAciertos = 0;
    cantErrores = 0;
    botonAbandonarJuego.disabled = false;
    botonObtenerPalabra.disabled = false;
    bloquearBotones();
    let $palabraAdivinar = document.querySelector("#palabraAdivinar");
    $palabraAdivinar.innerHTML = '';
    }else{
        validarPalabraIngresada();
        mostrarPantallaIngresarPalabra();
    }
}

function valorIndiceAleatorio() {
    const valorIndiceAzar = Math.floor(Math.random() * palabras.length);
    return valorIndiceAzar;
}

function agregarPalabra() {
   
    //mostrarPantallaJugarAhorcado();
    const $ingresarPalabra = document.querySelector("#ingresarPalabra").value;
    if ($ingresarPalabra == "") {
        palabras = ['EMILIO', 'AGUSTIN', 'NADIA'];
    } else {
        palabras = ['EMILIO', 'AGUSTIN', 'NADIA'];
        palabras.push($ingresarPalabra);
        localStorage.setItem('myArray', JSON.stringify(palabras));
        palabras = localStorage.getItem('myArray');
        palabras = JSON.parse(palabras);
        console.log(palabras);
    }
}

function dibujarHorca() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#0A3871";
    ctx.lineCap = "round";
    ctx.moveTo(2, 390);
    ctx.lineTo(293, 390);
    ctx.moveTo(82, 390);
    ctx.lineTo(82, 38);
    ctx.moveTo(82, 38);
    ctx.lineTo(260, 38);
    ctx.moveTo(260, 38);
    ctx.lineTo(260, 87);
    ctx.closePath();
    ctx.stroke();
}

function dibujarCabeza() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#0A3871";
    ctx.lineCap = "round";
    ctx.moveTo(260, 87);
    ctx.arc(260, 118.5, 31.5, 1.5 * Math.PI, 1.49 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
}

function dibujarCuerpo() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#0A3871";
    ctx.lineCap = "round";
    ctx.moveTo(260, 150);
    ctx.lineTo(260, 285);
    ctx.closePath();
    ctx.stroke();
}

function dibujarPiernaIzquierda() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#0A3871";
    ctx.lineCap = "round";
    ctx.moveTo(260, 285);
    ctx.lineTo(224, 347);
    ctx.closePath();
    ctx.stroke();
}

function dibujarPiernaDerecha() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#0A3871";
    ctx.lineCap = "round";
    ctx.moveTo(260, 285);
    ctx.lineTo(296, 347);
    ctx.closePath();
    ctx.stroke();
}

function dibujarBrazoIzquierdo() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#0A3871";
    ctx.lineCap = "round";
    ctx.moveTo(260, 175);
    ctx.lineTo(224, 237);
    ctx.closePath();
    ctx.stroke();
}

function dibujarBrazoDerecho() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#0A3871";
    ctx.lineCap = "round";
    ctx.moveTo(260, 175);
    ctx.lineTo(296, 237);
    ctx.closePath();
    ctx.stroke();
}

function borrarDibujoEnCanvas() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function bloquearBotones() {
    for (let i = 0; i < botonLetras.length; i++) {
        botonLetras[i].disabled = true;
    }
}

function validarPalabraIngresada() {
    const input = document.getElementById("ingresarPalabra");
    if (!input.checkValidity()) {
        alert('El campo no es válido.');
        return false;
    } else {
        alert('El campo es válido.');
        return true;
    }
}