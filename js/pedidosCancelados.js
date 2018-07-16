"use strict";
$(function () {
    var btnPedidosCancelados = $("#btnPedidosCancelados");
    btnPedidosCancelados.click(mostrarCancelados);
});
function mostrarCancelados() {
    $('.navbar-collapse').collapse('hide');
    $("#filtrosEmpleados").hide();
    $("#ABMemplados").hide();
    $("#sTablaEmpleados").hide();
    $("#Hola").hide();
    $("#filtrosPendientes").hide();
    $("#filtrosLogin").hide();
    $("#MinMaxOperaciones").hide();
    $("#filtrosOperaciones").hide();
    $("#filtrosNegativos").hide();
    $("#filtrosMesas").hide();
    $("#usoMesas").hide();
    $("#filtrosCancelados").show();
    var filtrosCancelados = $("#filtrosCancelados").html("");
    filtrosCancelados = $("#filtrosCancelados").append("\n                            <br>\n                            <br>\n                            <h4 id=\"mensaje\"><kbd>Filtros</kbd></h4>\n                            <div class=\"input-group\">\n                            <label for=\"cbFiltoPedidoCancelado\">Cancelados por tipo</label>\n                            <select class=\"form-control\" id=\"cbFiltoPedidoCancelado\" name=\"cbFiltoPedidoCancelado\">\n                                <option value=\"cocinero\">cocinero </option>\n                                <option value=\"bartender\">bartender </option>\n                                <option value=\"cervecero\">cervecero </option>\n                            </select>\n                            </div> \n                            <p>\n                            <div class=\"form-group\">\n                                <label> Fecha</label>\n                                <br>\n                                <label> Desde</label>\n                                <input type=\"date\" class=\"form-control\" id=\"fechaDesdeCancelados\" name=\"fechaDesdeCancelados\">\n                                <label> Hasta</label>\n                                <input type=\"date\" class=\"form-control\" id=\"fechaHastaCancelados\" name=\"fechaHastaCancelados\">\n                                <input type=\"button\" class=\"btn btn-success\" value=\"Filtrar\" id=\"btnFiltrarNegativosFecha\" onclick=\"TSMostrarGrillaPedidosCancelados()\" >\n                            </div>  \n                        </p>\n                    ");
    var cbFiltoPedidoCancelado = $("#cbFiltoPedidoCancelado");
    cbFiltoPedidoCancelado.change(TSMostrarGrillaPedidosCancelados);
    TSMostrarGrillaPedidosCancelados();
}
function TSMostrarGrillaPedidosCancelados() {
    var tipoCancelado = String($("#cbFiltoPedidoCancelado").val());
    console.log("Cancelado: ", tipoCancelado);
    var fechaDesdeCancelados = String($("#fechaDesdeCancelados").val());
    var fechaHastaCancelados = String($("#fechaHastaCancelados").val());
    console.log("fechaDesdeCancelados: ", fechaDesdeCancelados);
    console.log("fechaHastaCancelados: ", fechaHastaCancelados);
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
        if (fechaDesdeCancelados != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha >= fechaDesdeCancelados;
            });
        }
        if (fechaHastaCancelados != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha <= fechaHastaCancelados;
            });
        }
        if (fechaDesdeCancelados != "" && fechaHastaCancelados != "") {
            listaPendientes = listaPendientes.filter(function (emp) {
                return emp.fecha >= fechaDesdeCancelados && emp.fecha <= fechaHastaCancelados;
            });
        }
        $("#sTablaEmpleados").show();
        var tCuerpo = $("#tCuerpo");
        var tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        var msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados </kbd></h2>");
        tCabeza.append("<tr class='success'>" +
            "<th> ID</th>" +
            "<th> Mesa</th>" +
            "<th> Cliente</th>" +
            "<th> Detalle</th>" +
            "<th> Estado</th>" +
            "<th> Empleado</th>" +
            "<th> Fecha</th>" +
            "</tr>");
        if (tipoCancelado == "cocinero") {
            console.log("listaPendientes cocinero: ", listaPendientes);
            var msjVehiculo_1 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados de cocinero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCoc === "Cancelado") {
                    if (listaPendientes[index].idEmpladoCoc == null) {
                        listaPendientes[index].idEmpladoCoc = "Sin empleado";
                    }
                    tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td>" + listaPendientes[index].detalleCoc + "</td>\n                                    <td>" + listaPendientes[index].estadoCoc + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoCoc + "</td>\n                                    <td>" + listaPendientes[index].fecha + "</td>\n                                    </tr>");
                }
            }
        }
        if (tipoCancelado == "bartender") {
            var msjVehiculo_2 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados de bartender </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoBar === "Cancelado") {
                    if (listaPendientes[index].idEmpladoBar == null) {
                        listaPendientes[index].idEmpladoBar = "Sin empleado";
                    }
                    tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td>" + listaPendientes[index].detalleBar + "</td>\n                                    <td>" + listaPendientes[index].estadoBar + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoBar + "</td>\n                                    <td>" + listaPendientes[index].fecha + "</td>\n                                    </tr>");
                }
            }
        }
        if (tipoCancelado == "cervecero") {
            var msjVehiculo_3 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados de cervecero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCer === "Cancelado") {
                    if (listaPendientes[index].idEmpladoCer == null) {
                        listaPendientes[index].idEmpladoCer = "Sin empleado";
                    }
                    tCuerpo.append("\n                                <tr>\n                                <td> " + listaPendientes[index].idPedido + "</td>\n                                <td> " + listaPendientes[index].nroMesa + "</td>\n                                <td>" + listaPendientes[index].cliente + "</td>\n                                <td>" + listaPendientes[index].detalleCer + "</td>\n                                <td>" + listaPendientes[index].estadoCer + "</td>\n                                <td>" + listaPendientes[index].idEmpladoCer + "</td>\n                                <td>" + listaPendientes[index].fecha + "</td>\n                                </tr>");
                }
            }
        }
    }, function (error) {
        console.info("error mostrar grilla", error);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
