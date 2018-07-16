"use strict";
//let servidor= "http://santiagolo902.atwebpages.com/server/";
//let servidor= "https://santiagolo902.000webhostapp.com/server/";
//let servidor = "http://santiagolo902.eshost.com.ar/server/";
var servidor = "http://127.0.0.1:8080/TP_comanda/server/";
var titulo;
var fotoTitulo;
var vehiculosFiltrados;
var arrayNombres;
var arrayMarcas;
var arrayColor;
var md;
var claveTemp;
var emailTemp;
var data = datosToken();
var tipo;
var idGlobal;
$(function () {
    $('.forgot-pass').click(function (event) {
        $(".pr-wrap").toggleClass("show-pass-reset");
    });
    $('.pass-reset-submit').click(function (event) {
        $(".pr-wrap").removeClass("show-pass-reset");
    });
    var btnTestAdmin = $("#TestAdmin");
    btnTestAdmin.click(manejadorAdmin);
    var TestCocinero = $("#TestCocinero");
    TestCocinero.click(manejadorCocinero);
    var TestBartender = $("#TestBartender");
    TestBartender.click(manejadorBartender);
    var TestCervecero = $("#TestCervecero");
    TestCervecero.click(manejadorCervecero);
    var TestMozo = $("#TestMozo");
    TestMozo.click(manejadorMozo);
    var btnLimpiar = $("#btnLimpiar"); //document.getElementByIdmismos selectors que css . o #
    btnLimpiar.click(function () {
        localStorage.clear();
        window.location.replace("./index.html");
    });
    var btnCerrarNav = $("#btnCerrarNav");
    btnCerrarNav.click(function () {
        $('.navbar-collapse').collapse('hide');
    });
    var btnABMempleados = $("#btnABMempleados");
    btnABMempleados.click(volverAdmin);
    var btnAgregar = $("#btnAgregar");
    btnAgregar.click(agregarEmpleado);
    var cbFilto = $("#cbFilto");
    cbFilto.change(filtrarAdmin);
    var btnMenuListado = $("#btnMenuListado");
    btnMenuListado.click(sosSocio);
});
function esconderNav() {
    $('.navbar-collapse').collapse('hide');
}
function manejadorAdmin() {
    $("#email").val("admin@comanda.com");
    $("#clave").val("abc123");
}
function manejadorCocinero() {
    $("#email").val("cocinero1@comanda.com");
    $("#clave").val("abc123");
}
function manejadorBartender() {
    $("#email").val("bartender1@comanda.com");
    $("#clave").val("abc123");
}
function manejadorCervecero() {
    $("#email").val("cervecero1@comanda.com");
    $("#clave").val("abc123");
}
function manejadorMozo() {
    $("#email").val("mozo1@comanda.com");
    $("#clave").val("abc123");
}
function sosSocio() {
    console.log("tipo en sosSocio: ", tipo);
    if (tipo != "socio") {
        //modalIngresar
        var modalIngresar = $("#modalIngresar").html("");
        modalIngresar.append("\n        <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                <h4 style=\"color: red\" class=\"modal-title\"><b>Error</b></h4>\n            </div>\n            <div class=\"modal-body\">\n                <h4 style=\"text-align: center\" id='errorLogin'><kbd class= label-danger>Acceso denegado</kbd></h2>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Salir</button>\n            </div>\n        </div>\n\n    </div>\n        \n        ");
        return modalIngresar = $('#modalIngresar').modal('show');
    }
}
function mostrarFormPedidos() {
    if (tipo == "cocinero" || tipo == "bartender" || tipo == "cervecero") {
        //modalIngresar
        var modalIngresar = $("#modalIngresar").html("");
        //let modalIngresar =  $('#modalIngresar').modal('show');
        //<h4 id='errorLogin'><kbd class= label-danger>Acceso denegado</kbd></h2>
        modalIngresar.append("\n        <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                <h4 style=\"color: red\" class=\"modal-title\"><b>Error</b></h4>\n            </div>\n            <div class=\"modal-body\">\n                <h4 style=\"text-align: center\" id='errorLogin'><kbd class= label-danger>Acceso denegado</kbd></h2>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Salir</button>\n            </div>\n        </div>\n\n    </div>\n        \n        ");
    }
    else {
        mesasDisponibles();
        var chBartender = $("#chBartender");
        chBartender.click(function mostarDetalleBar() {
            if (chBartender.is(':checked')) {
                $("#formBartender").show();
            }
            else {
                $("#formBartender").hide();
            }
        });
        var chCerveceria = $("#chCerveceria");
        chCerveceria.click(function mostarDetalleCer() {
            if (chCerveceria.is(':checked')) {
                $("#formCerveceria").show();
            }
            else {
                $("#formCerveceria").hide();
            }
        });
        var chCocina = $("#chCocina");
        chCocina.click(function mostarDetalleCoc() {
            if (chCocina.is(':checked')) {
                $("#formCocinas").show();
            }
            else {
                $("#formCocinas").hide();
            }
        });
    }
}
function Login() {
    console.log("ingresar");
    var datosLogin = { email: $("#email").val(), clave: $('#clave').val() };
    if (datosLogin.email == "") {
        //$("#email").addClass("error");
        var errorEmail = $("#errorEmail").html("<h4 id='errorEmail'><kbd class= label-warning>Debe ingresar email</kbd></h2>").fadeToggle('slow');
        return;
    }
    else {
        //$("#email").addClass("sinError");
        var errorEmail = $("#errorEmail").html("");
    }
    if (datosLogin.clave == "") {
        //$("#clave").addClass("error");
        var errorclave = $("#errorClave").html("<h4 id='errorClave'><kbd class= label-warning>Debe ingresar clave</kbd></h2>").fadeToggle('slow');
        return;
    }
    else {
        //$("#clave").addClass("sinError");
        var errorclave = $("#errorClave").html("").fadeToggle('slow');
    }
    $.ajax({
        type: "post",
        url: servidor + "Login/",
        data: datosLogin,
        dataType: 'json'
    })
        .then(function (retorno) {
        console.info("bien:", retorno);
        localStorage.setItem('token', retorno.Token);
        window.location.replace("./home.html");
    }, function (error) {
        console.info("error login", error.responseJSON);
        var errorLogin = $("#errorLogin").html("<h4 id='errorLogin'><kbd class= label-danger>" + error.responseJSON + "</kbd></h2>");
        var errorLoginModal = $('#modalerrorLogin').modal('show');
        // alert((error.responseJSON).error);
    });
}
function datosToken() {
    $.ajax({
        type: "POST",
        url: servidor + "datosToken/",
        headers: { "token": localStorage.getItem('token') }
    }).then(function (retorno) {
        console.log("datosToke: ", retorno.tipo);
        console.log("ID token: ", retorno.id);
        tipo = retorno.tipo;
        idGlobal = retorno.id;
        return retorno;
    }, function (error) {
        console.log(error.responseText);
        console.log(error);
    });
}
function holaToken() {
    $.ajax({
        type: "POST",
        url: servidor + "datosToken/",
        headers: { "token": localStorage.getItem('token') }
    }).then(function (retorno) {
        //let foto = servidor +"empleado/verImagen/"+retorno.email;
        //fotoTitulo = `<td><img src="${servidor +"empleado/verImagen/"+retorno.email}" id="tableBanner" width="50" height="50" /></td>`;
        //fotoTitulo = `<img src="${servidor+retorno.foto}" width="50" height="50" />`;
        titulo = retorno.nombre;
        fotoTitulo = servidor + retorno.foto;
        var msjHola = $("#msjHola").html("<h4 id='msjHola' align=center ><kbd>Bienvendio " + retorno.nombre + "</kbd></h4>"
        //`<img src="${servidor+retorno.foto}" class="img-responsive img-thumbnail" width="304" height="236" />
        );
        //let fotoHola = $("#msjHola").html(`<img src="${servidor+retorno.foto}" width="50" height="50" />`);
    }, function (error) {
        //alert("error en cargarDatos. Contacte al administrador.");
        console.log(error.responseText);
        console.log(error);
    });
}
//  function mostrarEmpleados(){
//      //$("#filtrosCochera").hide();
//      $("#Hola").fadeIn();
//      $("#ABMemplados").show()
//      $("#sTablaEmpleados").show();
//      $("#filtrosEmpleados").show();
//      filtrosEmpleado();
//      TSMostrarGrillaEmpleados();
//  }
function volverAdmin() {
    $('.navbar-collapse').collapse('hide');
    $("#filtrosPendientes").hide();
    $("#sTabla").show();
    $("#sTablaEmpleados").hide();
    $("#MinMaxOperaciones").hide();
    $("#filtrosLogin").hide();
    $("#filtrosOperaciones").hide();
    $("#filtrosNegativos").hide();
    $("#filtrosCancelados").hide();
    $("#filtrosMesas").hide();
    $("#usoMesas").hide();
    $("#bar-chart").hide();
    TSMostrarGrillaEmpleados();
    //let Hola = $("#Hola").hide();
    //let mostrarABM = $("#ABM").fadeIn();
}
function TSMostrarGrillaEmpleados() {
    $.ajax({
        url: servidor + "empleado/",
        type: 'GET',
        headers: { "token": localStorage.getItem('token') },
        beforeSend: function () {
            var tCuerpo = $("#tCuerpo");
            var tCabeza = $("#tCabeza");
            tCabeza.html("");
            tCuerpo.html("");
            $('#tCuerpo').html('<img src="IMG/5.gif">');
        }
    }).then(function (aux) {
        var empAux;
        var listaEmpleados = [];
        for (var index = 0; index < aux.length; index++) {
            //append agrega mas al html
            //let foto = servidor +"estacionamiento/verImagenAuto/"+aux[index].patente;
            empAux = new estacionamiento.empleado(aux[index].id, aux[index].nombre, aux[index].email, aux[index].clave, aux[index].tipo, aux[index].estado);
            listaEmpleados.push(empAux);
        }
        console.log("Clase: ", listaEmpleados);
        filtrosEmpleado();
        filtrarAdmin();
        var chIDUsuario = $("#chIDUsuario");
        var chNombre = $("#chNombre");
        var chEmail = $("#chEmail");
        var chTipo = $("#chTipo");
        var chEstado = $("#chEstado");
        chIDUsuario.click(filtrarAdmin);
        chNombre.click(filtrarAdmin);
        chEmail.click(filtrarAdmin);
        chTipo.click(filtrarAdmin);
        chEstado.click(filtrarAdmin);
        var cbFilto = $("#cbFilto");
        cbFilto.change(filtrarAdmin);
        var Hola = $("#Hola").hide();
        var ABMemplados = $("#ABMemplados").fadeIn();
        var tCuerpo = $("#tCuerpo");
        var tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        var msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd> Lista de Usuarios</kbd></h2>");
        tCabeza.append("<tr class='success'>" +
            "<th> ID</th>" +
            "<th> Nombre</th>" +
            "<th> Email</th>" +
            "<th> Tipo</th>" +
            "<th> Estado</th>" +
            "<th> <i class='fas fa-info-circle'></i></th>" +
            "<th> Borrar</th>" +
            "<th> Modificar</th>" +
            "</tr>");
        for (var index = 0; index < listaEmpleados.length; index++) {
            //append agrega mas al html
            //let foto = servidor +"estacionamiento/verImagenAuto/"+aux[index].patente;
            tCuerpo.append("\n                        <tr>\n                        <td> " + listaEmpleados[index].id + "</td>\n                        <td> " + listaEmpleados[index].nombre + "</td>\n                        <td>" + listaEmpleados[index].email + "</td>\n                        <td>" + listaEmpleados[index].tipo + "</td>\n                        <td>" + listaEmpleados[index].estado + "</td>\n                        <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + listaEmpleados[index].id + ") > <i class=\"fas fa-info-circle\"></i></button></td>\n                        <td><button id=btnEliminar class=\"btn btn-xs btn-danger\" onclick=eliminarEmpleado(" + listaEmpleados[index].id + ")> <i class=\"far fa-trash-alt\"></i> Borrar</button></td>\n                        <td><button id=btnModificar class=\"btn btn-xs btn-warning\" onclick=modificarEmpleado(" + listaEmpleados[index].id + ")><i class=\"fas fa-edit\"></i>Modificar</button></td>\n                        </tr>");
            //$("#tituloNav").html("<a class='navbar-brand' href=#>"+titulo+"</a>");
            //$("#fotoNav").html(fotoTitulo);
        }
    }, function (error) {
        console.info("error mostrar grilla", error);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
function TSMostrarGrillaEmpleadosFiltrada(auxEmpleados) {
    var chIDUsuario = $("#chIDUsuario");
    //let chNombre = $("#chNombre");
    var chEmail = $("#chEmail");
    var chTipo = $("#chTipo");
    var chEstado = $("#chEstado");
    var auxID;
    var auxEmail;
    var auxTipo;
    var auxEstado;
    //ID
    if (chIDUsuario.is(':checked')) {
        auxID = "<th> ID</th>";
    }
    else {
        auxID = "";
    }
    //color
    if (chEmail.is(':checked')) {
        auxEmail = "<th> Email</th>";
    }
    else {
        auxEmail = "";
    }
    //tipo
    if (chTipo.is(':checked')) {
        auxTipo = "<th>Tipo</th>";
    }
    else {
        auxTipo = "";
    }
    //
    if (chEstado.is(':checked')) {
        auxEstado = "<th> Estado</th>";
    }
    else {
        auxEstado = "";
    }
    //hacer aparte
    var tCuerpo = $("#tCuerpo");
    var tCabeza = $("#tCabeza");
    tCabeza.html("");
    tCuerpo.html("");
    tCabeza.append("<tr class='success'>" +
        auxID +
        "<th> Nombre</th>" +
        auxEmail +
        auxTipo +
        auxEstado +
        "<th> <span class='glyphicon glyphicon-info-sign'></th>" +
        "<th> Borrar</th>" +
        "<th> Modificar</th>" +
        "</tr>");
    for (var index = 0; index < auxEmpleados.length; index++) {
        var mapID = TSidEmpleado(auxEmpleados);
        var mapEmail = TSemailEmpleado(auxEmpleados);
        var mapTipo = TStipoEmpleado(auxEmpleados);
        var mapEstado = TSestadoEmpleado(auxEmpleados);
        //append agrega mas al html
        tCuerpo.append("<tr>" +
            mapID[index] +
            ("<td>" + auxEmpleados[index].nombre + "</td>") +
            mapEmail[index] +
            mapTipo[index] +
            mapEstado[index] +
            ("<td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + auxEmpleados[index].id + ") > <i class=\"fas fa-info-circle\"></i> </button></td>\n            <td><button id=btnEliminar class=\"btn btn-xs btn-danger\" onclick=eliminarEmpleado(" + auxEmpleados[index].id + ")><i class=\"far fa-trash-alt\"></i> Borrar</button></td>\n            <td><button id=btnModificar class=\"btn btn-xs btn-warning\" onclick=modificarEmpleado(" + auxEmpleados[index].id + ")><i class=\"fas fa-edit\"></i>Modificar</button></td>\n            </tr>"));
    }
}
function TSidEmpleado(auxEstacionados) {
    var chIDUsuario = $("#chIDUsuario");
    var lID;
    return auxEstacionados.map(function (elemento) {
        if (chIDUsuario.is(':checked')) {
            return lID = "<td>" + elemento.id + "</td>";
        }
        else {
            return lID = "";
        }
    });
}
function TSemailEmpleado(auxEstacionados) {
    var chEmail = $("#chEmail");
    var lColor;
    return auxEstacionados.map(function (elemento) {
        if (chEmail.is(':checked')) {
            return lColor = "<td>" + elemento.email + "</td>";
        }
        else {
            return lColor = "";
        }
    });
}
function TStipoEmpleado(auxEstacionados) {
    var chTipo = $("#chTipo");
    var lEmpleado;
    return auxEstacionados.map(function (elemento) {
        if (chTipo.is(':checked')) {
            return lEmpleado = "<td>" + elemento.tipo + "</td>";
        }
        else {
            return lEmpleado = "";
        }
    });
}
function TSestadoEmpleado(auxEstacionados) {
    var chEstado = $("#chEstado");
    var lFecha;
    return auxEstacionados.map(function (elemento) {
        if (chEstado.is(':checked')) {
            return lFecha = "<td>" + elemento.estado + "</td>";
        }
        else {
            return lFecha = "";
        }
    });
}
//Agregar Empleado
function agregarEmpleado() {
    var nombreTXT = $("#nombreTXT").val();
    var emailTXT = $("#emailTXT").val();
    var claveTXT = $("#claveTXT").val();
    var tipoCB = $("#tipoCB").val();
    var estadoCB = $("#estadoCB").val();
    //let file_data = $("#perfilFile").prop("files")[0];
    //console.log(file_data);
    if (nombreTXT == "") {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar nombre</kbd></h2>");
        return;
    }
    if (emailTXT == "") {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar email</kbd></h2>");
        return;
    }
    if (claveTXT == "") {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar clave</kbd></h2>");
        return;
    }
    if (tipoCB === null) {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar tipo</kbd></h2>");
        return;
    }
    if (estadoCB === null) {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar estado</kbd></h2>");
        return;
    }
    // if (file_data === undefined) {
    //     let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar foto</kbd></h2>");
    //     return;
    // }
    var form_data = new FormData();
    form_data.append('nombre', nombreTXT);
    form_data.append('email', emailTXT);
    form_data.append('clave', claveTXT);
    form_data.append('tipo', tipoCB);
    form_data.append('estado', estadoCB);
    //form_data.append('foto', file_data);
    //let empleadoAux: estacionamiento.empleado = new estacionamiento.empleado(nombre,sexo,email,clave,turno,perfil,foto,estado);
    //console.log(empleadoAux);
    $.ajax({
        url: servidor + "empleado/alta",
        type: 'post',
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (itemResponse) {
        limpiarCampos();
        console.info("bien -->", itemResponse);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>" + itemResponse + "</kbd></h4>");
        var modalError = $('#modalError').modal('show');
        TSMostrarGrillaEmpleados();
    }, function (error) {
        limpiarCampos();
        console.info("error agregar usuarios", error);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>" + error.responseJSON + "</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
//Eliminar Empleado
function eliminarEmpleado(index) {
    if (index === 1) {
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se puede borrar a Admin</kbd></h4>");
        var modalError = $('#modalError').modal('show');
        return;
    }
    bootbox.confirm("¿Esta Seguro?", function (result) {
        if (result == true) {
            var form_data = new FormData();
            form_data.append('id', index);
            $.ajax({
                type: "POST",
                url: servidor + "empleado/borrar/",
                data: form_data,
                headers: { "token": localStorage.getItem('token') },
                contentType: false,
                processData: false,
                cache: false
            }).then(function (retorno) {
                limpiarCampos();
                console.log("borro " + retorno);
                var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>" + retorno + "</kbd></h4>");
                var modalError = $('#modalError').modal('show');
                var Hola = $("#Hola").hide();
                var ABMemplados = $("#ABMemplados").fadeIn();
                TSMostrarGrillaEmpleados();
            }, function (error) {
                limpiarCampos();
                //alert("error en cargarDatos. Contacte al administrador.");
                console.log(error.responseText);
                var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>" + error.responseJSON + "</kbd></h4>");
                var modalError = $('#modalError').modal('show');
            });
        }
        else {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se borro nada</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
    });
}
//Modificar Empleado
function modificarEmpleado(index) {
    if (index === 1) {
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se puede modificar a Admin</kbd></h4>");
        var modalError = $('#modalError').modal('show');
        return;
    }
    var form_data = new FormData();
    form_data.append('id', index);
    //console.log(index);
    $.ajax({
        type: "POST",
        url: servidor + "empleado/traerUno/",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (retorno) {
        console.log(Object(retorno));
        //nombre
        $("#nombreTXT").val(retorno.nombre);
        //Email
        $("#emailTXT").val(retorno.email);
        //tipo
        $("#tipoCB").val(retorno.tipo);
        //estado
        $("#estadoCB").val(retorno.estado);
        //clave
        claveTemp = retorno.clave;
        //$("#claveTXT").val(retorno.clave);
        //let id = retorno.id
        var btnAgregar = $("#btnAgregar");
        btnAgregar.attr("value", "Modificar");
        btnAgregar.off("click", agregarEmpleado);
        btnAgregar.on("click", md = function () {
            Modificar(retorno.id);
        });
    }, function (error) {
        //alert("error en cargarDatos. Contacte al administrador.");
        console.log(error.responseText);
    });
}
function Modificar(idAux) {
    var nombreTXT = $("#nombreTXT").val();
    var emailTXT = $("#emailTXT").val();
    var claveTXT = $("#claveTXT").val();
    var tipoCB = $("#tipoCB").val();
    var estadoCB = $("#estadoCB").val();
    //let file_data = $("#perfilFile").prop("files")[0];
    if (nombreTXT == "") {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar nombre</kbd></h2>");
        return;
    }
    if (emailTXT == "") {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar email</kbd></h2>");
        return;
    }
    if (claveTXT == "") {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar clave</kbd></h2>");
        return;
    }
    if (tipoCB === null) {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar tipo</kbd></h2>");
        return;
    }
    if (estadoCB === null) {
        var msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar estado</kbd></h2>");
        return;
    }
    var form_data = new FormData();
    form_data.append('id', idAux);
    form_data.append('nombre', nombreTXT);
    form_data.append('email', emailTXT);
    form_data.append('clave', claveTXT);
    form_data.append('tipo', tipoCB);
    form_data.append('estado', estadoCB);
    //form_data.append('foto', file_data);
    bootbox.confirm("¿Esta Seguro?", function (result) {
        if (result == true) {
            $.ajax({
                type: "POST",
                url: servidor + "empleado/modificar/",
                data: form_data,
                headers: { "token": localStorage.getItem('token') },
                contentType: false,
                processData: false,
                cache: false
            }).then(function (retorno) {
                console.log(retorno.responseText);
                console.log(retorno);
                var btnAgregar = $("#btnAgregar");
                btnAgregar.attr("value", "Agregar");
                btnAgregar.off("click", md);
                btnAgregar.on("click", agregarEmpleado);
                limpiarCampos();
                var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>Se modifico al empleado con exito</kbd></h4>");
                var modalError = $('#modalError').modal('show');
                TSMostrarGrillaEmpleados();
            }, function (error) {
                //alert("error en cargarDatos. Contacte al administrador.");
                console.log(error.responseText);
                var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>" + error.responseJSON + "</kbd></h4>");
                var modalError = $('#modalError').modal('show');
            });
        }
        else {
            var btnAgregar = $("#btnAgregar");
            btnAgregar.attr("value", "Agregar");
            btnAgregar.off("click", md);
            btnAgregar.on("click", agregarEmpleado);
            limpiarCampos();
            TSMostrarGrillaEmpleados();
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se modifico nada</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
    });
}
//Limpiar Campos
function limpiarCampos() {
    var nombreTXT = $("#nombreTXT").val("");
    var emailTXT = $("#emailTXT").val("");
    var claveTXT = $("#claveTXT").val("");
    var tipoCB = $("#tipoCB").val("");
    var estadoCB = $("#estadoCB").val("");
}
//Muestra detalles del empleado
function mostrarDetallesAdmin(index) {
    var form_data = new FormData();
    form_data.append('id', index);
    //console.log(index);
    $.ajax({
        type: "POST",
        url: servidor + "empleado/traerUno/",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (aux) {
        emailTemp = aux.email;
        var infoDetalles = $("#infoDetalles");
        infoDetalles.html("");
        infoDetalles.append("\n            <p><b>ID:</b> " + aux.id + "</p>\n            <p><b>Nombre:</b> " + aux.nombre + "</p>\n            <p><b>Email:</b> " + aux.email + "</p>\n            <p><b>Tipo:</b> " + aux.tipo + "</p>\n            <p><b>Estado:</b> " + aux.estado + "</p>\n            <p>\n                <b>Exportar Login:</b> \n                <a type=\"button\" class=\"btn btn-xs btn-success\" href=" + (servidor + "loginExport/excel/" + aux.id) + " download=\"" + (servidor + "excel/loginUsuario/" + aux.id) + "\"><img src=\"IMG/excel.png\" width=\"30\" height=\"30\" ></i></a>\n                <a type=\"button\" class=\"btn btn-xs btn-danger\" href=" + (servidor + "loginExport/pdf/" + aux.id) + " target=\"_blank\"  \"><img src=\"IMG/pdf.png\" width=\"30\" height=\"30\"></i></a>\n            </p>\n            ");
        var modalInfo = $('#modalInfo').modal('show');
        // <p><img src="${servidor + aux.foto}"id="tableBanner width="150" height="150" /></p>
    }, function (error) {
        console.info("error", error);
    });
}
//Filtro empleado con Select
function filtrarAdmin() {
    $.ajax({
        url: servidor + "empleado/",
        type: 'GET',
        headers: { "token": localStorage.getItem('token') },
        beforeSend: function () {
            $('#tCuerpo').html('<img src="IMG/5.gif">');
        }
    }).then(function (aux) {
        var empAux;
        var listaEmpleados = [];
        var tipoFiltrado = String($("#cbFilto").val());
        for (var index = 0; index < aux.length; index++) {
            empAux = new estacionamiento.empleado(aux[index].id, aux[index].nombre, aux[index].email, aux[index].clave, aux[index].tipo, aux[index].estado);
            listaEmpleados.push(empAux);
        }
        if (tipoFiltrado != "todos") {
            var empleadosFiltrados = [];
            empleadosFiltrados = aux.filter(function (emp) {
                return estacionamiento.tipoEmpleado[emp.tipo] === estacionamiento.tipoEmpleado[tipoFiltrado];
            });
            TSMostrarGrillaEmpleadosFiltrada(empleadosFiltrados);
            //console.log(empleadosFiltrados);
        }
        else {
            if (aux != false) {
                console.info("bien -->", aux);
                TSMostrarGrillaEmpleadosFiltrada(aux);
            }
            else {
                var msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>" + aux + "</kbd></h2>");
                console.log(aux);
            }
        }
    }, function (error) {
        console.info("error", error);
    });
}
//dibuja los controles de filtros 
function filtrosEmpleado() {
    $("#sTablaEmpleados").show();
    $("#filtrosEmpleados").show();
    var filtrosEmpleados = $("#filtrosEmpleados").html("");
    filtrosEmpleados = $("#filtrosEmpleados").html("\n                    <h4 id=\"mensaje\"><kbd>Filtros</kbd></h4>\n                    <label for=\"cbFilto\">Filtrar por</label>\n                    <select class=\"form-control\" id=\"cbFilto\" name=\"cbFilto\">\n                        <option value=\"todos\">todos </option>\n                        <option value=\"cocinero\">cocinero </option>\n                        <option value=\"bartender\">bartender </option>\n                        <option value=\"mozo\">mozo </option>\n                        <option value=\"cervecero\">cervecero </option>\n                        <option value=\"socio\">socio </option>\n                    </select>\n                        \n                    <br>\n                    <br>\n                    <div class=\"checkbox-inline\">\n                        <label><input type=\"checkbox\" name=\"id\" id=\"chIDUsuario\">ID</label>\n                    </div>\n                    \n                    <div class=\"checkbox-inline\">\n                        <label><input type=\"checkbox\" name=\"email\" id=\"chEmail\" checked>Email</label>\n                    </div>\n\n                    <div class=\"checkbox-inline\">\n                        <label><input type=\"checkbox\" name=\"tipo\" id=\"chTipo\" checked>Tipo</label>\n                    </div>\n\n                    <div class=\"checkbox-inline\">\n                        <label><input type=\"checkbox\" name=\"estado\" id=\"chEstado\" checked>Estado</label>\n                    </div>\n                            \n    ");
}
function listadoLogin(auxId) {
    $("#modalInfo").modal('hide');
    $.ajax({
        url: servidor + "excel/loginUsuario/" + auxId,
        type: 'GET',
        headers: { "token": localStorage.getItem('token') }
    }).then(function (retorno) {
        console.log(retorno);
        document.execCommand('SaveAs', true, servidor + "excel/loginUsuario/" + auxId);
    }, function (error) {
        console.info("error", error);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
//No se usa por ahora, es para crear un select con los empleados cargados
function traerEmpleados() {
    $.ajax({
        url: servidor + "empleado/",
        type: 'GET',
        headers: { "token": localStorage.getItem('token') }
        // contentType: false,
        // processData: false,
        // cache: false
    }).then(function (aux) {
        arrayNombres = [];
        for (var index = 0; index < aux.length; index++) {
            arrayNombres.push(aux[index].nombre);
        }
        var cbFiltoEmpleado = $("#cbFiltoEmpleado");
        cbFiltoEmpleado.html("");
        cbFiltoEmpleado.html("\n            <option value=\"todos\">todos </option>\n            ");
        for (var index = 0; index < arrayNombres.length; index++) {
            cbFiltoEmpleado.append("\n                <option value=\"" + arrayNombres[index] + "\">" + arrayNombres[index] + "</option>\n                ");
        }
    }, function (error) {
        console.info("error traer empleados ", error);
    });
}
/*******************PEDIDOS************************/
//Agregar pedido
function agregarPedido() {
    var clienteTXT = $("#clienteTXT").val();
    var mesaCB = $("#mesaCB").val();
    var bartenderCB = $("#bartenderCB").val();
    var cerveceriaCB = $("#cerveceriaCB").val();
    var cocinaCB = $("#cocinaCB").val();
    var importe = $("#importe").val();
    var file_data = $("#fotoFile").prop("files")[0];
    //console.log("clienteTXT: ",clienteTXT);
    //console.log("mesaCB: ",mesaCB);
    //console.log("bartenderCB: ",bartenderCB);
    //console.log("cerveceriaCB: ",cerveceriaCB);
    //console.log("cocinaCB: ",cocinaCB);
    if (clienteTXT == "") {
        var msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar cliente</kbd></h2>");
        return;
    }
    if (mesaCB === null) {
        var msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar mesa</kbd></h2>");
        return;
    }
    if (bartenderCB === "nada" && cerveceriaCB === "nada" && cocinaCB === "nada") {
        var msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar algun pedido</kbd></h2>");
        return;
    }
    if (file_data === undefined) {
        var msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe seleccionar foto</kbd></h2>");
        return;
    }
    if (importe === "" || importe < 1) {
        var msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar importe</kbd></h2>");
        return;
    }
    var form_data = new FormData();
    form_data.append('nroMesa', mesaCB);
    form_data.append('cliente', clienteTXT);
    form_data.append('foto', file_data);
    form_data.append('importe', importe);
    form_data.append('detalleBar', bartenderCB);
    form_data.append('detalleCer', cerveceriaCB);
    form_data.append('detalleCoc', cocinaCB);
    console.log(form_data.get("detalleBar"));
    $.ajax({
        type: 'POST',
        url: servidor + "pedido/alta",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (itemResponse) {
        console.info("bien -->", itemResponse);
        var msjBien = $("#msjBien").html("<h4 id='msjBien'><kbd class= label-success>" + itemResponse + "</kbd></h4>");
        var modalIngresar = $('#modalIngresar').modal('hide');
        var modalBien = $('#modalBien').modal('show');
        TSMostrarGrillaPedidos();
    }, function (error) {
        console.info("error", error.responseText);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>" + error.responseJSON + "</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
