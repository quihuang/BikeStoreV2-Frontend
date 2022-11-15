// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
$().ready(function() {

    // validacion para Bodeguero
    if ($('#containerRol').text() == "3") {
        $('#core').attr('hidden', true);
        $('#btn-reporte-gerencial').attr('hidden', true);
        $('.btn-gestion-user').attr('hidden', true);
        $('.btn-gestion-user-icon').attr('hidden', true);
        $('#btn-ventas').attr('hidden', true);
    }
    // validacion para Comercial
    if ($('#containerRol').text() == "1") {
        $('#core').attr('hidden', true);
        $('#btn-reporte-gerencial').attr('hidden', true);
        $('.btn-trabajador').attr('hidden', true);
        $('#btn-productos').attr('hidden', true);
        $('#btn-inventario').attr('hidden', true);
    }

    var valoresPesos = $("td#formatPesos");
    var valoresDecimal = $("td#formatDecimal");
    var numValue;
    var num;

    valoresPesos.each(function() {
        numValue = this.data;
        num = numValue.replace(/\./g, '');
        if (!isNaN(num)) {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            $(this).text("$ " + num);
        }
    });

    valoresDecimal.each(function() {
        numValue = this.data;
        num = numValue.replace(/\./g, '');
        if (!isNaN(num)) {
            num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
            num = num.split('').reverse().join('').replace(/^[\.]/, '');
            $(this).text(num);
        }
    });

    //Funcion para aplicar validacion con bootstrap
    (function() {
        'use strict'

        // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
        var forms = document.querySelectorAll('.needs-validation')

        // Pase por encima de ellos y evite la sumisión.
        Array.prototype.slice.call(forms)
            .forEach(function(form) {
                form.addEventListener('submit', function(event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

});


function editar(text) {
    document.getElementById("titleModal").innerHTML = "Actualizar " + text;
    document.getElementById("btn-create-modal").innerHTML = "Actualizar";
}

function imprimir(nombre) {
    var ficha = document.getElementById(nombre);
    var ventimp = window.open(' ', 'popimpr');
    ventimp.document.write(ficha.innerHTML);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();
}

/*
TEMA DE REGEX
solo números: 
/^[0-9]+$/
Recomendado para nombres y Apellidos (letras en mayúsculas y minúsculas; con tilde. También incluye espacios, apostrofes.)
/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/
Recomendado para Nombre de usuario (con letras minúsculas, números, guion bajo y guion medio. Los nombres de usuarios deben tener entre 3 y 16 caracteres)
/^[a-z0-9_-]{3,16}$/
Recomendado para email hay muchas formas, algunas son: 
/^[^\s@]+@[^\s@]+\.[^\s@]+$/
/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]{2,4}$/

https://platzi.com/tutoriales/1339-fundamentos-javascript/1770-expresiones-regulares-te-enseno-todo-lo-basico-con-un-solo-ejemplo/
https://codepen.io/jjyepez/details/qpqrgV/
http://estilow3b.com/ejemplos-comunes-de-expresiones-regulares-javascript/#codesyntax_1
*/

// funcion de validacion para solo texto
function Solo_Texto(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex = /^[A-ZÑa-zñáéíóúÁÉÍÓÚ'"°#. ]+$/;
    if (AllowRegex.test(character)) return true;
    return false;
}

function Solo_TextoYnumeros(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex = /^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ'"°#. ]+$/;
    if (AllowRegex.test(character)) return true;
    return false;
}

function Solo_Password(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex = /^[a-zA-Z0-9]{3,}$/;
    if (AllowRegex.test(character)) return true;
    return false;
}

function Solo_Numeros(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex = /^[0-9]+$/;
    if (AllowRegex.test(character)) return true;
    return false;
}

// funcion de validacion para solo email
function Solo_Email(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var character = String.fromCharCode(code);
    var AllowRegex = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]{2,4}$/;
    if (AllowRegex.test(character)) return true;
    return false;
}