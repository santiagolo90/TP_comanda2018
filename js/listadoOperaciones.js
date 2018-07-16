"use strict";
var tipoFiltroOperaciones;
$(function () {
    var btnOperaciones = $("#btnOperaciones");
    btnOperaciones.click(mostrarOperaciones);
});
function mostrarOperaciones() {
    $('.navbar-collapse').collapse('hide');
    $("#filtrosEmpleados").hide();
    $("#ABMemplados").hide();
    $("#sTablaEmpleados").hide();
    $("#Hola").hide();
    $("#filtrosPendientes").hide();
    $("#filtrosLogin").hide();
    $("#filtrosNegativos").hide();
    $("#filtrosCancelados").hide();
    $("#filtrosMesas").hide();
    $("#usoMesas").hide();
    $("#bar-chart").show();
    $("#MinMaxOperaciones").show();
    $("#filtrosOperaciones").show();
    var filtrosOperaciones = $("#filtrosOperaciones").html("");
    filtrosOperaciones = $("#filtrosOperaciones").append("\n                    <br>\n                    <br>\n                    <h4 id=\"mensaje\"><kbd>Filtros</kbd></h4>\n                    <div class=\"input-group\">\n                    <label for=\"cbFiltoOperacionesSector\">Filtrar por sector</label>\n                    <select class=\"form-control\" id=\"cbFiltoOperacionesSector\" name=\"cbFiltoOperacionesSector\">\n                        <option value=\"todos\">todos </option>\n                        <option value=\"cocinero\">cocinero </option>\n                        <option value=\"bartender\">bartender </option>\n                        <option value=\"cervecero\">cervecero </option>\n                        <option value=\"socio\">socio </option>\n                    </select>\n                    </div> \n                    <div class=\"input-group\">\n                        <label for=\"cbFiltoOperacionesEmpleado\"> Empleado</label>\n                        <select class=\"form-control\" id=\"cbFiltoOperacionesEmpleado\" name=\"cbFiltoOperacionesEmpleado\">\n                        </select>\n                    </div> \n                    <p>\n                        <div class=\"form-group\">\n                            <label> Fecha</label>\n                            <br>\n                            <label> Desde</label>\n                            <input type=\"date\" class=\"form-control\" id=\"fechaDesdeOperaciones\" name=\"fechaDesdeOperaciones\">\n                            <label> Hasta</label>\n                            <input type=\"date\" class=\"form-control\" id=\"fechaHastaOperaciones\" name=\"fechaHastaOperaciones\">\n                            <input type=\"button\" class=\"btn btn-success\" value=\"Filtrar\" id=\"btnFiltrarOperacionesFecha\" onclick=\"TSMostrarGrillaOperaciones()\" >\n                        </div>  \n                    </p>\n                    ");
    usuariosDisponiblesOperaciones();
    var cbFiltoOperacionesSector = $("#cbFiltoOperacionesSector");
    cbFiltoOperacionesSector.change(usuariosDisponiblesOperaciones);
    var cbFiltoOperacionesEmpleado = $("#cbFiltoOperacionesEmpleado");
    cbFiltoOperacionesEmpleado.change(TSMostrarGrillaOperaciones);
    var msjMaxMin = $("#MinMaxCochera").fadeIn();
    //masUtilizadaOperaciones();
    TSMostrarGrillaOperaciones();
}
function TSMostrarGrillaOperaciones() {
    var fechaDesdeOperaciones = String($("#fechaDesdeOperaciones").val());
    var fechaHastaOperaciones = String($("#fechaHastaOperaciones").val());
    console.log("fechaDesdeOperaciones: ", fechaDesdeOperaciones);
    console.log("fechaHastaOperaciones: ", fechaHastaOperaciones);
    //console.log("email :",emailFiltrado);
    if (fechaDesdeOperaciones != "" && fechaHastaOperaciones != "") {
        if (fechaDesdeOperaciones > fechaHastaOperaciones) {
            var modalIngresar = $("#modalIngresar").html("");
            modalIngresar.append("\n            <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                    <h4 style=\"color: red\" class=\"modal-title\"><b>Error</b></h4>\n                </div>\n                <div class=\"modal-body\">\n                    <h4 style=\"text-align: center\" id='errorLogin'><kbd class= label-danger>Desde no puede ser mayor que hasta</kbd></h2>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Salir</button>\n                </div>\n            </div>\n    \n        </div>");
            return modalIngresar = $('#modalIngresar').modal('show');
        }
    }
    $.ajax({
        url: servidor + "pedido/",
        type: 'GET',
        headers: { "token": localStorage.getItem('token') },
        beforeSend: function () {
            var tCuerpo = $("#tCuerpo");
            var tCabeza = $("#tCabeza");
            tCabeza.html("");
            tCuerpo.html("");
            $('#tCuerpo').html('<img src="IMG/5.gif">');
        }
    }).then(function (listaPendientes) {
        $("#sTablaEmpleados").show();
        var emailFiltrado = String($("#cbFiltoOperacionesEmpleado").val());
        var empleadosFiltrados = listaPendientes;
        console.log("emailFiltrado: ", emailFiltrado);
        if (emailFiltrado === "todos") {
            listaPendientes = listaPendientes.filter(function (emp) {
                console.log("tipoFiltroOperaciones: ", tipoFiltroOperaciones);
                if (tipoFiltroOperaciones !== "todos") {
                    if (tipoFiltroOperaciones == "bartender") {
                        return emp.idEmpladoBar;
                    }
                    if (tipoFiltroOperaciones == "cervecero") {
                        return emp.idEmpladoCer;
                    }
                    if (tipoFiltroOperaciones == "cocinero") {
                        return emp.idEmpladoCoc;
                    }
                }
                else {
                    return emp;
                }
            });
        }
        if (emailFiltrado != "todos") {
            listaPendientes = listaPendientes.filter(function (emp) {
                console.log("tipoFiltroOperaciones: ", tipoFiltroOperaciones);
                if (emp.idEmpladoBar == emailFiltrado) {
                    return emp.idEmpladoBar == emailFiltrado;
                }
                if (emp.idEmpladoCoc == emailFiltrado) {
                    return emp.idEmpladoCoc == emailFiltrado;
                }
                if (emp.idEmpladoCer == emailFiltrado) {
                    return emp.idEmpladoCer == emailFiltrado;
                }
            });
        }
        if (fechaDesdeOperaciones != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha >= fechaDesdeOperaciones;
            });
        }
        if (fechaHastaOperaciones != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha <= fechaHastaOperaciones;
            });
        }
        if (fechaDesdeOperaciones != "" && fechaHastaOperaciones != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha >= fechaDesdeOperaciones && emp.fecha <= fechaHastaOperaciones;
            });
        }
        masUtilizadaOperaciones(fechaDesdeOperaciones, fechaHastaOperaciones);
        masVendidosOperaciones(fechaDesdeOperaciones, fechaHastaOperaciones);
        var tCuerpo = $("#tCuerpo");
        var tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        var msjVehiculo = $("#msjVehiculo").html("br<h4 id='msjVehiculo'><kbd>Pendientes </kbd></h2>");
        tCabeza.append("<tr class='success'>" +
            "<th> Pedido</th>" +
            "<th> Mesa</th>" +
            "<th> Cliente</th>" +
            "<th> Impore</th>" +
            "<th> Pedido Bar</th>" +
            "<th> Tiempo Bar</th>" +
            "<th> Empleado Bar</th>" +
            "<th> Pedido Cer</th>" +
            "<th> Tiempo Cer</th>" +
            "<th> Empleado Cer</th>" +
            "<th> Pedido Coc</th>" +
            "<th> Tiempo Coc</th>" +
            "<th> Empleado Coc</th>" +
            "<th> Fecha</th>" +
            "</tr>");
        if (tipo == "socio") {
            var msjVehiculo_1 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Listado de oeraciones </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoBar === "Finalizado" || listaPendientes[index].estadoBar === "Sin pedido" || listaPendientes[index].estadoCer === "Finalizado" || listaPendientes[index].estadoCer === "Sin pedido" || listaPendientes[index].estadoCoc === "Finalizado" || listaPendientes[index].estadoCoc === "Sin pedido") {
                    if (listaPendientes[index].estadoBar === "Sin pedido") {
                        listaPendientes[index].tiempo_final_bar = "Sin pedido";
                        listaPendientes[index].idEmpladoBar = "Sin pedido";
                    }
                    if (listaPendientes[index].estadoCer === "Sin pedido") {
                        listaPendientes[index].tiempo_final_cer = "Sin pedido";
                        listaPendientes[index].idEmpladoCer = "Sin pedido";
                    }
                    if (listaPendientes[index].estadoCoc === "Sin pedido") {
                        listaPendientes[index].tiempo_final_coc = "Sin pedido";
                        listaPendientes[index].idEmpladoCoc = "Sin pedido";
                    }
                    tCuerpo.append("\n                            <tr>\n                            <td> " + listaPendientes[index].idPedido + "</td>\n                            <td> " + listaPendientes[index].nroMesa + "</td>\n                            <td>" + listaPendientes[index].cliente + "</td>\n                            <td>" + listaPendientes[index].importe + "</td>\n                            <td> " + listaPendientes[index].detalleBar + "</td>\n                            <td> " + listaPendientes[index].tiempo_final_bar + "</td>\n                            <td>" + listaPendientes[index].idEmpladoBar + "</td>\n                            <td> " + listaPendientes[index].detalleCer + "</td>\n                            <td> " + listaPendientes[index].tiempo_final_cer + "</td>\n                            <td>" + listaPendientes[index].idEmpladoCer + "</td>\n                            <td> " + listaPendientes[index].detalleCoc + "</td>\n                            <td> " + listaPendientes[index].tiempo_final_coc + "</td>\n                            <td>" + listaPendientes[index].idEmpladoCoc + "</td>\n                            <td>" + listaPendientes[index].fecha + "</td>\n                            </tr>");
                }
            }
        }
    }, function (error) {
        console.info("error mostrar grilla", error);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
function usuariosDisponiblesOperaciones() {
    $.ajax({
        type: "GET",
        url: servidor + "empleado/",
        headers: { "token": localStorage.getItem('token') },
    })
        .then(function (retorno) {
        var tipoBuscado = String($("#cbFiltoOperacionesSector").val());
        console.info("En filtro User oper:", retorno);
        console.info("tipoBuscado:", tipoBuscado);
        var cbFiltoOperacionesEmpleado = $("#cbFiltoOperacionesEmpleado");
        cbFiltoOperacionesEmpleado.html("");
        cbFiltoOperacionesEmpleado.html("\n             <option value=\"todos\">Todos</option>\n             ");
        tipoFiltroOperaciones = tipoBuscado;
        for (var index = 0; index < retorno.length; index++) {
            if (tipoBuscado == "todos") {
                cbFiltoOperacionesEmpleado.append("\n                    <option value=\"" + retorno[index].id + "\">" + retorno[index].email + "</option>\n                    ");
            }
            if (tipoBuscado == retorno[index].tipo) {
                cbFiltoOperacionesEmpleado.append("\n                    <option value=\"" + retorno[index].id + "\">" + retorno[index].email + "</option>\n                    ");
            }
        }
        TSMostrarGrillaOperaciones();
    }, function (error) {
        console.info("error al traer mesas: ", error.responseJSON);
        var errorLogin = $("#errorLogin").html("<h4 id='errorLogin'><kbd class= label-danger>Error al traer mesas</kbd></h2>");
        var errorLoginModal = $('#modalerrorLogin').modal('show');
    });
}
function masUtilizadaOperaciones(fechaDesdeOperaciones, fechaHastaOperaciones) {
    var form_data = new FormData();
    if (fechaDesdeOperaciones != "") {
        form_data.append('desde', fechaDesdeOperaciones);
        console.log("form_data: ", form_data.get('desde'));
    }
    if (fechaHastaOperaciones != "") {
        form_data.append('hasta', fechaHastaOperaciones);
        console.log("form_data: ", form_data.get('hasta'));
    }
    $.ajax({
        url: servidor + "pedido/operacionesSector/",
        type: 'POST',
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false,
    }).then(function (retorno) {
        console.log("CANTIDAD para grafico", retorno);
        //msjTitulo
        $("#msjTitulo").html("");
        $("#msjMax").html("");
        $("#msjMin").html("");
        $("#msjNunca").html("");
        $("#msjTitulo").append("\n        <p><b>Operaciones</b></p>\n        ");
        $("#msjMax").append("\n        <p><b>Bartender n\u00BA:</b> " + retorno.estadoBar[0].cant + "</p>\n        <p><b>Cerveceria n\u00BA:</b> " + retorno.estadoCer[0].cant + "</p>\n        <p><b>Cocina n\u00BA:</b> " + retorno.estadoCoc[0].cant + "</p>\n        ");
        new Chart(document.getElementById("bar-chart"), {
            type: 'doughnut',
            data: {
                labels: ["Bartender", "Cerveceria", "Cocina"],
                datasets: [
                    {
                        label: "Cantidad de pedidos",
                        backgroundColor: ["#f3c83b", "#000000", "#f3f3f3"],
                        data: [
                            retorno.estadoBar[0].cant,
                            retorno.estadoCer[0].cant,
                            retorno.estadoCoc[0].cant
                        ],
                    }
                ]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Pedidos por sector'
                }
            }
        });
    }, function (error) {
        console.log("error", error.responseText);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
function masVendidosOperaciones(fechaDesdeOperaciones, fechaHastaOperaciones) {
    var form_data = new FormData();
    if (fechaDesdeOperaciones != "") {
        form_data.append('desde', fechaDesdeOperaciones);
    }
    if (fechaHastaOperaciones != "") {
        form_data.append('hasta', fechaHastaOperaciones);
    }
    $.ajax({
        url: servidor + "pedido/masVendidos/",
        type: 'POST',
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false,
    }).then(function (retorno) {
        console.log("masVendidosOperaciones", retorno);
        //msjTitulo
        $("#msjTituloVendidos").html("");
        $("#msjMaxVendidos").html("");
        $("#msjTituloVendidos").append("\n        <p><b>Mas vendidos</b></p>\n        ");
        if (retorno.detalleBar == "Nada") {
            $("#msjMaxVendidos").append("\n            <p><b>Bartender: </b> " + retorno.detalleBar + " </p>\n            ");
        }
        else {
            $("#msjMaxVendidos").append("\n            <p><b>Bartender: </b> " + retorno.detalleBar[0].detalleBar + " Cant: " + retorno.detalleBar[0].cant + " </p>\n            ");
        }
        if (retorno.detalleCer == "Nada") {
            $("#msjMaxVendidos").append("\n            <p><b>Bartender: </b> " + retorno.detalleCer + " </p>\n            ");
        }
        else {
            $("#msjMaxVendidos").append("\n            <p><b>Cerveceria:</b> " + retorno.detalleCer[0].detalleCer + " Cant: " + retorno.detalleCer[0].cant + " </p>\n            ");
        }
        if (retorno.detalleCoc == "Nada") {
            $("#msjMaxVendidos").append("\n            <p><b>Bartender: </b> " + retorno.detalleCoc + " </p>\n            ");
        }
        else {
            $("#msjMaxVendidos").append("\n            <p><b>Cocina: </b> " + retorno.detalleCoc[0].detalleCoc + " Cant: " + retorno.detalleCoc[0].cant + " </p>\n            ");
        }
    }, function (error) {
        console.log("error", error.responseText);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
