"use strict";
$(function () {
    var btnPedidosNegativos = $("#btnPedidosNegativos");
    btnPedidosNegativos.click(mostrarNegativos);
});
function temp() {
    alert("HOLA");
}
function mostrarNegativos() {
    $('.navbar-collapse').collapse('hide');
    $("#filtrosEmpleados").hide();
    $("#ABMemplados").hide();
    $("#sTablaEmpleados").hide();
    $("#Hola").hide();
    $("#filtrosPendientes").hide();
    $("#filtrosLogin").hide();
    $("#MinMaxOperaciones").hide();
    $("#filtrosOperaciones").hide();
    $("#filtrosCancelados").hide();
    $("#filtrosMesas").hide();
    $("#bar-chart").hide();
    $("#usoMesas").hide();
    $("#filtrosNegativos").show();
    var filtrosNegativos = $("#filtrosNegativos").html("");
    filtrosNegativos = $("#filtrosNegativos").append("\n                            <br>\n                            <br>\n                            <h4 id=\"mensaje\"><kbd>Filtros</kbd></h4>\n                            <div class=\"input-group\">\n                            <label for=\"cbFiltoPedidoNegativo\">Tiempo final negativo</label>\n                            <select class=\"form-control\" id=\"cbFiltoPedidoNegativo\" name=\"cbFiltoPedidoNegativo\">\n                                <option value=\"cocinero\">cocinero </option>\n                                <option value=\"bartender\">bartender </option>\n                                <option value=\"cervecero\">cervecero </option>\n                            </select>\n                            </div> \n                            <p>\n                            <div class=\"form-group\">\n                                <label> Fecha</label>\n                                <br>\n                                <label> Desde</label>\n                                <input type=\"date\" class=\"form-control\" id=\"fechaDesdeNegativos\" name=\"fechaDesdeNegativos\">\n                                <label> Hasta</label>\n                                <input type=\"date\" class=\"form-control\" id=\"fechaHastaNegativos\" name=\"fechaHastaNegativos\">\n                                <input type=\"button\" class=\"btn btn-success\" value=\"Filtrar\" id=\"btnFiltrarNegativosFecha\" onclick=\"TSMostrarGrillaPedidosNegativos()\" >\n                            </div>  \n                        </p>\n                    ");
    var cbFiltoPedidoNegativo = $("#cbFiltoPedidoNegativo");
    cbFiltoPedidoNegativo.change(TSMostrarGrillaPedidosNegativos);
    TSMostrarGrillaPedidosNegativos();
}
function TSMostrarGrillaPedidosNegativos() {
    var tipoNegativo = String($("#cbFiltoPedidoNegativo").val());
    console.log("negativo: ", tipoNegativo);
    var fechaDesdeNegativos = String($("#fechaDesdeNegativos").val());
    var fechaHastaNegativos = String($("#fechaHastaNegativos").val());
    console.log("fechaDesdeNegativos: ", fechaDesdeNegativos);
    console.log("fechaHastaNegativos: ", fechaHastaNegativos);
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
        if (fechaDesdeNegativos != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha >= fechaDesdeNegativos;
            });
        }
        if (fechaHastaNegativos != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha <= fechaHastaNegativos;
            });
        }
        if (fechaDesdeNegativos != "" && fechaHastaNegativos != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha >= fechaDesdeNegativos && emp.fecha <= fechaHastaNegativos;
            });
        }
        $("#sTablaEmpleados").show();
        var tCuerpo = $("#tCuerpo");
        var tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        var msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos/Cancelados </kbd></h2>");
        tCabeza.append("<tr class='success'>" +
            "<th> ID</th>" +
            "<th> Mesa</th>" +
            "<th> Cliente</th>" +
            "<th> Detalle</th>" +
            "<th> T.Estimado</th>" +
            "<th> T.Final</th>" +
            "<th> Estado</th>" +
            "<th> Empleado</th>" +
            "<th> Fecha</th>" +
            "</tr>");
        if (tipoNegativo == "cocinero") {
            console.log("listaPendientes cocinero: ", listaPendientes);
            var msjVehiculo_1 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos de cocinero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCoc === "Finalizado") {
                    if (listaPendientes[index].tiempo_final_coc < 0) {
                        tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td>" + listaPendientes[index].detalleCoc + "</td>\n                                    <td>" + listaPendientes[index].tiempo_estimado_coc + "</td>\n                                    <td>" + listaPendientes[index].tiempo_final_coc + "</td>\n                                    <td>" + listaPendientes[index].estadoCoc + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoCoc + "</td>\n                                    <td>" + listaPendientes[index].fecha + "</td>\n                                    </tr>");
                    }
                }
            }
        }
        if (tipoNegativo == "bartender") {
            var msjVehiculo_2 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos de bartender </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoBar === "Finalizado") {
                    if (listaPendientes[index].tiempo_final_bar < 0) {
                        tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td>" + listaPendientes[index].detalleBar + "</td>\n                                    <td>" + listaPendientes[index].tiempo_estimado_bar + "</td>\n                                    <td>" + listaPendientes[index].tiempo_final_bar + "</td>\n                                    <td>" + listaPendientes[index].estadoBar + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoBar + "</td>\n                                    <td>" + listaPendientes[index].fecha + "</td>\n                                    </tr>");
                    }
                }
            }
        }
        if (tipoNegativo == "cervecero") {
            var msjVehiculo_3 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos de cervecero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCer === "Finalizado") {
                    if (listaPendientes[index].tiempo_final_cer < 0) {
                        tCuerpo.append("\n                                <tr>\n                                <td> " + listaPendientes[index].idPedido + "</td>\n                                <td> " + listaPendientes[index].nroMesa + "</td>\n                                <td>" + listaPendientes[index].cliente + "</td>\n                                <td>" + listaPendientes[index].detalleCer + "</td>\n                                <td>" + listaPendientes[index].tiempo_estimado_cer + "</td>\n                                <td>" + listaPendientes[index].tiempo_final_cer + "</td>\n                                <td>" + listaPendientes[index].estadoCer + "</td>\n                                <td>" + listaPendientes[index].idEmpladoCer + "</td>\n                                <td>" + listaPendientes[index].fecha + "</td>\n                                </tr>");
                    }
                }
            }
        }
    }, function (error) {
        console.info("error mostrar grilla", error);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
