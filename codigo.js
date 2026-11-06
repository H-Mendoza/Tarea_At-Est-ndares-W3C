/*
Hugo Enrique Mendoza Coello
Edgar Samuel Tandazo Briones
Componentes interactivos del sitio. Los eventos se registran con addEventListener
y el estado se comunica a las tecnologías de apoyo con atributos ARIA.
*/
"use strict";

function multiplicar(p1, p2) {
    return p1 * p2;
}

/* Componente desplegable: botón con aria-expanded (index.html) */
function iniciarDesplegable() {
    const boton = document.getElementById("boton-saludo");
    const panel = document.getElementById("panel-saludo");
    if (!boton || !panel) {
        return;
    }

    boton.addEventListener("click", function () {
        const abierto = boton.getAttribute("aria-expanded") === "true";
        boton.setAttribute("aria-expanded", String(!abierto));
        panel.hidden = abierto;
        boton.textContent = abierto ? "Mostrar mensaje de bienvenida" : "Ocultar mensaje de bienvenida";
    });

    boton.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
            boton.click();
        }
    });
}

/* Calculadora sencilla que reutiliza multiplicar() (index.html) */
function iniciarMultiplicacion() {
    const formulario = document.getElementById("form-multiplicar");
    const resultado = document.getElementById("resultado-multiplicar");
    if (!formulario || !resultado) {
        return;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        const a = Number(document.getElementById("factor-a").value);
        const b = Number(document.getElementById("factor-b").value);
        resultado.textContent = "Resultado: " + a + " × " + b + " = " + multiplicar(a, b);
    });
}

/* Validación del formulario con mensajes de texto (formulario.html) */
function iniciarFormulario() {
    const formulario = document.getElementById("form-datos");
    if (!formulario) {
        return;
    }

    formulario.noValidate = true;
    const resumen = document.getElementById("resumen");
    const estado = document.getElementById("estado");

    const reglas = [
        { id: "numero", mensaje: "Ingrese un número entero entre 0 y 9." },
        { id: "correo", mensaje: "Ingrese un correo electrónico válido, por ejemplo nombre@dominio.com." },
        { id: "nombre", mensaje: "Ingrese su nombre." },
        { id: "apellido", mensaje: "Ingrese su apellido." },
        { id: "fecha", mensaje: "Seleccione una fecha válida." }
    ];

    function mostrarError(campo, mensaje) {
        const error = document.getElementById(campo.id + "-error");
        error.textContent = mensaje;
        campo.setAttribute("aria-invalid", "true");
    }

    function limpiarError(campo) {
        const error = document.getElementById(campo.id + "-error");
        error.textContent = "";
        campo.removeAttribute("aria-invalid");
    }

    reglas.forEach(function (regla) {
        const campo = document.getElementById(regla.id);
        campo.addEventListener("input", function () {
            if (campo.checkValidity()) {
                limpiarError(campo);
            }
        });
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        estado.textContent = "";
        estado.className = "";
        const invalidos = [];

        reglas.forEach(function (regla) {
            const campo = document.getElementById(regla.id);
            if (campo.checkValidity()) {
                limpiarError(campo);
            } else {
                mostrarError(campo, regla.mensaje);
                invalidos.push(campo);
            }
        });

        if (invalidos.length > 0) {
            resumen.hidden = false;
            resumen.textContent = "El formulario tiene " + invalidos.length +
                (invalidos.length === 1 ? " error. Corríjalo para continuar." : " errores. Corríjalos para continuar.");
            invalidos[0].focus();
        } else {
            resumen.hidden = true;
            resumen.textContent = "";
            estado.className = "exito";
            estado.textContent = "Información enviada correctamente. ¡Gracias!";
            formulario.reset();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    iniciarDesplegable();
    iniciarMultiplicacion();
    iniciarFormulario();
});
