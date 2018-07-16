"use strict";
var mesaTemp;
$(function () {
    var btnPendientes = $("#btnPendientes");
    btnPendientes.click(filtrosPendientes);
});
function filtrosPendientes() {
    //listadoEstacionados();
    //traerEmpleados();
    $('.navbar-collapse').collapse('hide');
    $("#filtrosEmpleados").hide();
    $("#ABMemplados").hide();
    $("#filtrosLogin").hide();
    $("#filtrosOperaciones").hide();
    $("#filtrosNegativos").hide();
    $("#MinMaxOperaciones").hide();
    $("#filtrosMesas").hide();
    $("#usoMesas").hide();
    $("#bar-chart").hide();
    $("#sTablaEmpleados").show();
    //$("#sTablaPendientes").show();
    $("#Hola").hide();
    $("#filtrosPendientes").show();
    var filtrosPendientes = $("#filtrosPendientes").html("");
    filtrosPendientes = $("#filtrosPendientes").append("<br>\n                                                        <br>");
    /*
    filtrosPendientes = $("#filtrosPendientes").append(`
                    <br>
                    <br>
                    <h4 id="mensaje"><kbd>Filtros Pedido Pendientes</kbd></h4>
                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="id" id="cbIDPendientes">ID</label>
                    </div>

                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="nroMesa" id="cbMesaPendientes" checked>Mesa</label>
                    </div>
                            
                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="cliente" id="cbClientePendientes">Cliente</label>
                    </div>

                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="foto" id="cbFotoPendientes" checked>Foto</label>
                    </div>
                            
                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="detalle" id="cbDetallePendientes" checked>Detalle</label>
                    </div>
                            
                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="tEstimado" id="cbTEstimadoPendientes" checked>Estimado</label>
                    </div>
                            
                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="tFinal" id="cbTFinalPendientes">Final</label>
                    </div>

                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="estado" id="cbEstadoPendientes">Estado</label>
                    </div>

                    <div class="checkbox-inline">
                    <label><input type="checkbox" name="empleado" id="cbEmpleadoPendientes">Empleado</label>
                    </div>`);
    $("#cbIDPendientes").click(filtrarPendientes);
    $("#cbMesaPendientes").click(filtrarPendientes);
    $("#cbClientePendientes").click(filtrarPendientes);
    $("#cbFotoPendientes").click(filtrarPendientes);
    $("#cbDetallePendientes").click(filtrarPendientes);
    $("#cbTEstimadoPendientes").click(filtrarPendientes);
    $("#cbTFinalPendientes").click(filtrarPendientes);
    $("#cbEstadoPendientes").change(filtrarPendientes);
    $("#cbEmpleadoPendientes").change(filtrarPendientes);
    */
    TSMostrarGrillaPedidos();
}
function filtrarPendientes() {
    alert("Prueba");
}
function TSMostrarGrillaPedidos() {
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
        console.log("Pedidos: ", listaPendientes);
        console.log("tipo: ", tipo);
        var tCuerpo = $("#tCuerpo");
        var tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        var msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Pendientes </kbd></h2>");
        tCabeza.append("<tr class='success'>" +
            "<th> ID</th>" +
            "<th> Mesa</th>" +
            "<th> Cliente</th>" +
            "<th> Foto</th>" +
            "<th> Detalle</th>" +
            "<th> T.Estimado</th>" +
            "<th> T.Final</th>" +
            "<th> Estado</th>" +
            "<th> Empleado</th>" +
            "<th> <i class='fas fa-info-circle'></i></th>" +
            "<th> Modificar</th>" +
            "</tr>");
        if (tipo == "cocinero") {
            var msjVehiculo_1 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Pendientes de cocinero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].detalleCoc != "nada") {
                    if (listaPendientes[index].estadoCoc === "en preparación") {
                        if (listaPendientes[index].idEmpladoCoc == idGlobal) {
                            if (listaPendientes[index].tiempo_estimado_coc == null) {
                                listaPendientes[index].tiempo_estimado_coc = "Sin tiempo";
                            }
                            if (listaPendientes[index].tiempo_final_coc == null) {
                                listaPendientes[index].tiempo_final_coc = "Sin tiempo";
                            }
                            tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td><img src=\"" + (servidor + listaPendientes[index].foto) + "\" id=\"tableBanner\" width=\"50\" height=\"50\" /></td>\n                                    <td>" + listaPendientes[index].detalleCoc + "</td>\n                                    <td>" + listaPendientes[index].tiempo_estimado_coc + "</td>\n                                    <td>" + listaPendientes[index].tiempo_final_coc + "</td>\n                                    <td>" + listaPendientes[index].estadoCoc + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoCoc + "</td>\n                                    <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + listaPendientes[index].id + ") > <i class=\"fas fa-info-circle\"></i></button></td>\n                                    <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=finalizarPedido(" + listaPendientes[index].idPedido + ",\"estadoCoc\")><i class=\"fas fa-edit\"></i>Finalizar</button></td>\n                                    </tr>");
                        }
                    }
                    if (listaPendientes[index].detalleCoc != "nada") {
                        if (listaPendientes[index].estadoCoc === "Pendiente") {
                            if (listaPendientes[index].idEmpladoCoc == null) {
                                listaPendientes[index].idEmpladoCoc = "no tomado";
                            }
                            if (listaPendientes[index].tiempo_estimado_coc == null) {
                                listaPendientes[index].tiempo_estimado_coc = "Sin tiempo";
                            }
                            if (listaPendientes[index].tiempo_final_coc == null) {
                                listaPendientes[index].tiempo_final_coc = "Sin tiempo";
                            }
                            tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td><img src=\"" + (servidor + listaPendientes[index].foto) + "\" id=\"tableBanner\" width=\"50\" height=\"50\" /></td>\n                                    <td>" + listaPendientes[index].detalleCoc + "</td>\n                                    <td>" + listaPendientes[index].tiempo_estimado_coc + "</td>\n                                    <td>" + listaPendientes[index].tiempo_final_coc + "</td>\n                                    <td>" + listaPendientes[index].estadoCoc + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoCoc + "</td>\n                                    <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + listaPendientes[index].id + ") > <i class=\"fas fa-info-circle\"></i></button></td>\n                                    <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=tomarCocina(" + listaPendientes[index].idPedido + ")><i class=\"fas fa-edit\"></i>Tomar</button></td>\n                                    </tr>");
                        }
                    }
                }
            }
        }
        if (tipo == "bartender") {
            var msjVehiculo_2 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Pendientes de bartender </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].detalleBar !== "nada") {
                    if (listaPendientes[index].estadoBar === "en preparación") {
                        if (listaPendientes[index].idEmpladoBar == idGlobal) {
                            if (listaPendientes[index].tiempo_estimado_bar == null) {
                                listaPendientes[index].tiempo_estimado_bar = "Sin tiempo";
                            }
                            if (listaPendientes[index].tiempo_final_bar == null) {
                                listaPendientes[index].tiempo_final_bar = "Sin tiempo";
                            }
                            tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td><img src=\"" + (servidor + listaPendientes[index].foto) + "\" id=\"tableBanner\" width=\"50\" height=\"50\" /></td>\n                                    <td>" + listaPendientes[index].detalleBar + "</td>\n                                    <td>" + listaPendientes[index].tiempo_estimado_bar + "</td>\n                                    <td>" + listaPendientes[index].tiempo_final_bar + "</td>\n                                    <td>" + listaPendientes[index].estadoBar + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoBar + "</td>\n                                    <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + listaPendientes[index].id + ") > <i class=\"fas fa-info-circle\"></i></button></td>\n                                    <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=finalizarPedido(" + listaPendientes[index].idPedido + ",\"estadoBar\")><i class=\"fas fa-edit\"></i>Finalizar</button></td>\n                                    </tr>");
                        }
                    }
                }
                if (listaPendientes[index].detalleBar != "nada") {
                    if (listaPendientes[index].estadoBar === "Pendiente") {
                        if (listaPendientes[index].idEmpladoBar == null) {
                            listaPendientes[index].idEmpladoBar = "no tomado";
                        }
                        if (listaPendientes[index].tiempo_estimado_bar == null) {
                            listaPendientes[index].tiempo_estimado_bar = "Sin tiempo";
                        }
                        if (listaPendientes[index].tiempo_final_bar == null) {
                            listaPendientes[index].tiempo_final_bar = "Sin tiempo";
                        }
                        tCuerpo.append("\n                                    <tr>\n                                    <td> " + listaPendientes[index].idPedido + "</td>\n                                    <td> " + listaPendientes[index].nroMesa + "</td>\n                                    <td>" + listaPendientes[index].cliente + "</td>\n                                    <td><img src=\"" + (servidor + listaPendientes[index].foto) + "\" id=\"tableBanner\" width=\"50\" height=\"50\" /></td>\n                                    <td>" + listaPendientes[index].detalleBar + "</td>\n                                    <td>" + listaPendientes[index].tiempo_estimado_bar + "</td>\n                                    <td>" + listaPendientes[index].tiempo_final_bar + "</td>\n                                    <td>" + listaPendientes[index].estadoBar + "</td>\n                                    <td>" + listaPendientes[index].idEmpladoBar + "</td>\n                                    <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + listaPendientes[index].id + ") > <i class=\"fas fa-info-circle\"></i></button></td>\n                                    <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=tomarBar(" + listaPendientes[index].idPedido + ")><i class=\"fas fa-edit\"></i>Tomar</button></td>\n                                    </tr>");
                    }
                }
            }
        }
        if (tipo == "cervecero") {
            var msjVehiculo_3 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Pendientes de cervecero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].detalleCer != "nada") {
                    if (listaPendientes[index].estadoCer === "en preparación") {
                        if (listaPendientes[index].idEmpladoCer == idGlobal) {
                            if (listaPendientes[index].tiempo_estimado_cer == null) {
                                listaPendientes[index].tiempo_estimado_cer = "Sin tiempo";
                            }
                            if (listaPendientes[index].tiempo_final_cer == null) {
                                listaPendientes[index].tiempo_final_cer = "Sin tiempo";
                            }
                            tCuerpo.append("\n                                <tr>\n                                <td> " + listaPendientes[index].idPedido + "</td>\n                                <td> " + listaPendientes[index].nroMesa + "</td>\n                                <td>" + listaPendientes[index].cliente + "</td>\n                                <td><img src=\"" + (servidor + listaPendientes[index].foto) + "\" id=\"tableBanner\" width=\"50\" height=\"50\" /></td>\n                                <td>" + listaPendientes[index].detalleCer + "</td>\n                                <td>" + listaPendientes[index].tiempo_estimado_cer + "</td>\n                                <td>" + listaPendientes[index].tiempo_final_cer + "</td>\n                                <td>" + listaPendientes[index].estadoCer + "</td>\n                                <td>" + listaPendientes[index].idEmpladoCer + "</td>\n                                <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + listaPendientes[index].id + ") > <i class=\"fas fa-info-circle\"></i></button></td>\n                                <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=finalizarPedido(" + listaPendientes[index].idPedido + ",\"estadoCer\")><i class=\"fas fa-edit\"></i>Finalizar</button></td>\n                                </tr>");
                        }
                    }
                }
                if (listaPendientes[index].detalleCer != "nada") {
                    if (listaPendientes[index].estadoCer === "Pendiente") {
                        if (listaPendientes[index].idEmpladoCer == null) {
                            listaPendientes[index].idEmpladoCer = "no tomado";
                        }
                        if (listaPendientes[index].tiempo_estimado_cer == null) {
                            listaPendientes[index].tiempo_estimado_cer = "Sin tiempo";
                        }
                        if (listaPendientes[index].tiempo_final_cer == null) {
                            listaPendientes[index].tiempo_final_cer = "Sin tiempo";
                        }
                        tCuerpo.append("\n                                <tr>\n                                <td> " + listaPendientes[index].idPedido + "</td>\n                                <td> " + listaPendientes[index].nroMesa + "</td>\n                                <td>" + listaPendientes[index].cliente + "</td>\n                                <td><img src=\"" + (servidor + listaPendientes[index].foto) + "\" id=\"tableBanner\" width=\"50\" height=\"50\" /></td>\n                                <td>" + listaPendientes[index].detalleCer + "</td>\n                                <td>" + listaPendientes[index].tiempo_estimado_cer + "</td>\n                                <td>" + listaPendientes[index].tiempo_final_cer + "</td>\n                                <td>" + listaPendientes[index].estadoCer + "</td>\n                                <td>" + listaPendientes[index].idEmpladoCer + "</td>\n                                <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesAdmin(" + listaPendientes[index].id + ") > <i class=\"fas fa-info-circle\"></i></button></td>\n                                <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=tomarCervecero(" + listaPendientes[index].idPedido + ")><i class=\"fas fa-edit\"></i>Tomar</button></td>\n                                </tr>");
                    }
                }
            }
        }
        if (tipo == "mozo" || tipo == "socio") {
            tCabeza.html("");
            tCuerpo.html("");
            var msjVehiculo_4 = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Pendientes </kbd></h2>");
            tCabeza.append("<tr class='success'>" +
                "<th> Pedido</th>" +
                "<th> Mesa</th>" +
                "<th> Cliente</th>" +
                "<th> Estado</th>" +
                "<th> Importe</th>" +
                "<th> <i class='fas fa-info-circle'></i></th>" +
                "<th> Eliminar</th>" +
                "<th> Modificar</th>" +
                "</tr>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoBar === "Finalizado" || listaPendientes[index].estadoBar === "Sin pedido" || listaPendientes[index].estadoCer === "Finalizado" || listaPendientes[index].estadoCer === "Sin pedido" || listaPendientes[index].estadoCoc === "Finalizado" || listaPendientes[index].estadoCoc === "Sin pedido") {
                    //index++
                }
                else {
                    if (listaPendientes[index].estado === "con cliente esperando pedido") {
                        tCuerpo.append("\n                                        <tr>\n                                        <td> " + listaPendientes[index].idPedido + "</td>\n                                        <td> " + listaPendientes[index].nroMesa + "</td>\n                                        <td>" + listaPendientes[index].cliente + "</td>\n                                        <td>" + listaPendientes[index].estado + "</td>\n                                        <td>$ " + listaPendientes[index].importe + "</td>\n                                        <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesPedido(" + listaPendientes[index].idPedido + ")> <i class=\"fas fa-info-circle\"></i></button></td>\n                                        <td><button id=btnEliminar class=\"btn btn-xs btn-danger\" onclick=cancelarPedido(" + listaPendientes[index].idPedido + ")> <i class=\"far fa-trash-alt\"></i> Cancelar</button></td>\n                                        <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=cambiarEstadoPedido(" + listaPendientes[index].idPedido + ")><i class=\"fas fa-edit\"></i>Servir pedido</button></td>\n                                        </tr>");
                    }
                    if (listaPendientes[index].estado === "con clientes comiendo") {
                        tCuerpo.append("\n                                        <tr>\n                                        <td> " + listaPendientes[index].idPedido + "</td>\n                                        <td> " + listaPendientes[index].nroMesa + "</td>\n                                        <td>" + listaPendientes[index].cliente + "</td>\n                                        <td>" + listaPendientes[index].estado + "</td>\n                                        <td>$ " + listaPendientes[index].importe + "</td>\n                                        <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesPedido(" + listaPendientes[index].idPedido + ")> <i class=\"fas fa-info-circle\"></i></button></td>\n                                        <td><button id=btnEliminar class=\"btn btn-xs btn-danger\" onclick=cancelarPedido(" + listaPendientes[index].idPedido + ")> <i class=\"far fa-trash-alt\"></i> Cancelar</button></td>\n                                        <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=cambiarEstadoPedido(" + listaPendientes[index].idPedido + ")><i class=\"fas fa-edit\"></i>Cuenta</button></td>\n                                        </tr>");
                    }
                    if (listaPendientes[index].estado === "con clientes pagando") {
                        tCuerpo.append("\n                                        <tr>\n                                        <td> " + listaPendientes[index].idPedido + "</td>\n                                        <td> " + listaPendientes[index].nroMesa + "</td>\n                                        <td>" + listaPendientes[index].cliente + "</td>\n                                        <td>" + listaPendientes[index].estado + "</td>\n                                        <td>$ " + listaPendientes[index].importe + "</td>\n                                        <td><button  class=\"btn btn-xs btn-info\" onclick=mostrarDetallesPedido(" + listaPendientes[index].idPedido + ")> <i class=\"fas fa-info-circle\"></i></button></td>\n                                        <td><button id=btnEliminar class=\"btn btn-xs btn-danger\" onclick=cancelarPedido(" + listaPendientes[index].idPedido + ")> <i class=\"far fa-trash-alt\"></i> Cancelar</button></td>\n                                        <td><button id=btnModificar class=\"btn btn-xs btn-success\" onclick=cambiarEstadoPedido(" + listaPendientes[index].idPedido + ")><i class=\"fas fa-edit\"></i>Cerrar mesa</button></td>\n                                        </tr>");
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
function tomarCervecero(idPedido) {
    bootbox.confirm("¿Esta Seguro?", function (result) {
        if (result == true) {
            bootbox.prompt({
                title: "Ingrese tiempo estimado",
                inputType: 'number',
                callback: function (tiempoEstimado) {
                    console.log("tiempoEstimado:", tiempoEstimado);
                    var form_data = new FormData();
                    form_data.append('idPedido', idPedido);
                    form_data.append('estadoCer', "en preparación");
                    form_data.append('tiempo_estimado_cer', tiempoEstimado);
                    $.ajax({
                        type: "POST",
                        url: servidor + "pedido/modificar/",
                        data: form_data,
                        headers: { "token": localStorage.getItem('token') },
                        contentType: false,
                        processData: false,
                        cache: false
                    }).then(function (retorno) {
                        console.log(retorno.responseText);
                        console.log(retorno);
                        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>Se tomo el pedido</kbd></h4>");
                        var modalError = $('#modalError').modal('show');
                        TSMostrarGrillaPedidos();
                    }, function (error) {
                        //alert("error en cargarDatos. Contacte al administrador.");
                        console.log(error.responseText);
                        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>" + error.responseJSON + "</kbd></h4>");
                        var modalError = $('#modalError').modal('show');
                    });
                }
            });
        }
        else {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>No se tomo el pedido</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
    });
}
function tomarBar(idPedido) {
    bootbox.confirm("¿Esta Seguro?", function (result) {
        if (result == true) {
            bootbox.prompt({
                title: "Ingrese tiempo estimado",
                inputType: 'number',
                callback: function (tiempoEstimado) {
                    console.log("tiempoEstimado:", tiempoEstimado);
                    var form_data = new FormData();
                    form_data.append('idPedido', idPedido);
                    form_data.append('estadoBar', "en preparación");
                    form_data.append('tiempo_estimado_bar', tiempoEstimado);
                    $.ajax({
                        type: "POST",
                        url: servidor + "pedido/modificar/",
                        data: form_data,
                        headers: { "token": localStorage.getItem('token') },
                        contentType: false,
                        processData: false,
                        cache: false
                    }).then(function (retorno) {
                        console.log(retorno.responseText);
                        console.log(retorno);
                        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>Se tomo el pedido</kbd></h4>");
                        var modalError = $('#modalError').modal('show');
                        TSMostrarGrillaPedidos();
                    }, function (error) {
                        //alert("error en cargarDatos. Contacte al administrador.");
                        console.log(error.responseText);
                        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>" + error.responseJSON + "</kbd></h4>");
                        var modalError = $('#modalError').modal('show');
                    });
                }
            });
        }
        else {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>No se tomo el pedido</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
    });
}
function tomarCocina(idPedido) {
    bootbox.confirm("¿Esta Seguro?", function (result) {
        if (result == true) {
            bootbox.prompt({
                title: "Ingrese tiempo estimado",
                inputType: 'number',
                callback: function (tiempoEstimado) {
                    console.log("tiempoEstimado:", tiempoEstimado);
                    var form_data = new FormData();
                    form_data.append('idPedido', idPedido);
                    form_data.append('estadoCoc', "en preparación");
                    form_data.append('tiempo_estimado_coc', tiempoEstimado);
                    console.log("form_data: ", form_data.get('idPedido'));
                    console.log("form_data: ", form_data.get('estadoCoc'));
                    console.log("form_data: ", form_data.get('tiempo_estimado_coc'));
                    $.ajax({
                        type: "POST",
                        url: servidor + "pedido/modificar/",
                        data: form_data,
                        headers: { "token": localStorage.getItem('token') },
                        contentType: false,
                        processData: false,
                        cache: false
                    }).then(function (retorno) {
                        console.log(retorno.responseText);
                        console.log(retorno);
                        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>Se tomo el pedido</kbd></h4>");
                        var modalError = $('#modalError').modal('show');
                        TSMostrarGrillaPedidos();
                    }, function (error) {
                        //alert("error en cargarDatos. Contacte al administrador.");
                        console.log(error.responseText);
                        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>" + error.responseJSON + "</kbd></h4>");
                        var modalError = $('#modalError').modal('show');
                    });
                }
            });
        }
        else {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>No se tomo el pedido</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
    });
}
function finalizarPedido(idPedido, tipo) {
    var form_data = new FormData();
    form_data.append('idPedido', idPedido);
    if (tipo == "estadoCoc") {
        form_data.append('estadoCoc', "listo para servir");
        console.log("estadoCoc");
        console.log("form_data: ", form_data.get('idPedido'));
        console.log("form_data: ", form_data.get('estadoCoc'));
    }
    if (tipo == "estadoCer") {
        form_data.append('estadoCer', "listo para servir");
        console.log("estadoCer");
        console.log("form_data: ", form_data.get('idPedido'));
        console.log("form_data: ", form_data.get('estadoCer'));
    }
    if (tipo == "estadoBar") {
        form_data.append('estadoBar', "listo para servir");
        console.log("estadoBar");
        console.log("form_data: ", form_data.get('idPedido'));
        console.log("form_data: ", form_data.get('estadoBar'));
    }
    $.ajax({
        type: "POST",
        url: servidor + "pedido/finalizar/",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (retorno) {
        console.log(retorno.responseText);
        console.log(retorno);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>El pedido esta listo</kbd></h4>");
        var modalError = $('#modalError').modal('show');
        TSMostrarGrillaPedidos();
    }, function (error) {
        //alert("error en cargarDatos. Contacte al administrador.");
        console.log(error.responseText);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>" + error.responseJSON + "</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
function mesasDisponibles() {
    $.ajax({
        type: "get",
        url: servidor + "mesa/disponibles/",
        dataType: 'json'
    })
        .then(function (retorno) {
        console.info("bien:", retorno);
        var mesaCB = $("#mesaCB");
        mesaCB.html("");
        mesaCB.html("\n        <option value=\"\" disabled selected>Seleccione mesa</option>\n            ");
        for (var index = 0; index < retorno.length; index++) {
            mesaCB.append("\n                <option value=\"" + retorno[index].codigo + "\">Numero:  " + retorno[index].codigo + "</option>\n                ");
        }
        //return retorno;
    }, function (error) {
        console.info("error al traer mesas: ", error.responseJSON);
        var errorLogin = $("#errorLogin").html("<h4 id='errorLogin'><kbd class= label-danger>Error al traer mesas</kbd></h2>");
        var errorLoginModal = $('#modalerrorLogin').modal('show');
    });
}
//Muestra detalles del pedido
function mostrarDetallesPedido(index) {
    console.log(index);
    var form_data = new FormData();
    form_data.append('idPedido', index);
    //console.log(index);
    $.ajax({
        type: "POST",
        url: servidor + "pedido/traerUno/",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (aux) {
        console.log("aux: ", aux);
        emailTemp = aux.email;
        var infoDetalles = $("#infoDetalles");
        infoDetalles.html("");
        infoDetalles.append("<p><img src=" + servidor + aux.foto + " id='tableBanner' width='150' height='150' /></p>" +
            "<p><b>Pedido Nº:</b> " + aux.idPedido + "</p>" +
            "<p><b>Mesa:</b>" + aux.nroMesa + "</p>" +
            "<p><b>Estado Mesa:</b>" + aux.estado + "</p>" +
            "<p><b>Cliente:</b>" + aux.cliente + "</p>");
        if (aux.detalleBar == "nada") {
            infoDetalles.append("<p style='color: #FF8800' ><b>Pedido bar:</b> Sin pedido</p>");
        }
        else {
            infoDetalles.append("<p style='color: #007E33' ><b>Pedido bartender:</b> " + aux.detalleBar + "</p>");
            if (aux.estadoBar == "Pendiente") {
                infoDetalles.append("<p style='color: red' ><b>Estado pendiente:</b> Ningun bartender lo tomó</p>");
            }
            else {
                infoDetalles.append("<p style='color: #007E33' ><b>Estimado bar:</b> " + aux.tiempo_estimado_bar + "</p>" +
                    "<p style='color: #007E33' ><b>Empleado bar:</b> " + aux.idEmpladoBar + "</p>" +
                    "<p style='color: #007E33' ><b>Pedido bar:</b> " + aux.estadoBar + "</p>");
            }
        }
        if (aux.detalleCer == "nada") {
            infoDetalles.append("<p style='color: #FF8800' ><b>Pedido cerveceria:</b> Sin pedido</p>");
        }
        else {
            infoDetalles.append("<p style='color: #007E33' ><b>Pedido cerveceria:</b> " + aux.detalleCer + "</p>");
            if (aux.estadoCer == "Pendiente") {
                infoDetalles.append("<p style='color: red' ><b>Estado pendiente:</b> Ningun cervecero lo tomó</p>");
            }
            else {
                infoDetalles.append("<p style='color: #007E33' ><b>Estimado Cerveceria:</b> " + aux.tiempo_estimado_cer + "</p>" +
                    "<p style='color: #007E33' ><b>Empleado Cerveceria:</b> " + aux.idEmpladoCer + "</p>" +
                    "<p style='color: #007E33' ><b>Estado Cerveceria:</b> " + aux.estadoCer + "</p>");
            }
        }
        if (aux.detalleCoc == "nada") {
            infoDetalles.append("<p style='color: #FF8800'><b>Pedido cocina:</b> Sin pedido</p>");
        }
        else {
            infoDetalles.append("<p style='color: #007E33' ><b>Pedido cocina:</b> " + aux.detalleCoc + "</p>");
            if (aux.estadoCoc == "Pendiente") {
                infoDetalles.append("<p style='color: red' ><b>Estado pendiente:</b> Ningun cocinero lo tomó</p>");
            }
            else {
                infoDetalles.append("<p style='color: #007E33' ><b>Estimado cocina:</b> " + aux.tiempo_estimado_coc + "</p>" +
                    "<p style='color: #007E33' ><b>Empleado cocina:</b> " + aux.idEmpladoCoc + "</p>" +
                    "<p style='color: #007E33' ><b>Estado cocina:</b> " + aux.estadoCoc + "</p>");
            }
        }
        var modalInfo = $('#modalInfo').modal('show');
        // <p><img src="${servidor + aux.foto}"id="tableBanner width="150" height="150" /></p>
    }, function (error) {
        console.info("error", error);
    });
}
//Cambiar el estado del pedido
function cambiarEstadoPedido(idPedido) {
    console.log("idPedido en cambiar estado: ", idPedido);
    var form_data = new FormData();
    form_data.append('idPedido', idPedido);
    //console.log(index);
    $.ajax({
        type: "POST",
        url: servidor + "pedido/traerUno/",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (pedido) {
        console.log("aux: ", pedido);
        //en preparación
        if (pedido.estadoCoc == "en preparación" || pedido.estadoCoc == "Pendiente" || pedido.estadoBar == "en preparación" || pedido.estadoBar == "Pendiente" || pedido.estadoCer == "en preparación" || pedido.estadoCer == "Pendiente") {
            var modalIngresar = $("#modalIngresar").html("");
            modalIngresar.append("\n            <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                    <h4 style=\"color: red\" class=\"modal-title\"><b>Error</b></h4>\n                </div>\n                <div class=\"modal-body\">\n                    <h4 style=\"text-align: center\" id='errorLogin'><kbd class= label-danger>Todav\u00EDa tiene pedidos pendientes</kbd></h2>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Salir</button>\n                </div>\n            </div>\n    \n        </div>");
            return modalIngresar = $('#modalIngresar').modal('show');
            //pedido.estado == "con clientes comiendo"
        }
        if (pedido.estadoCoc == "listo para servir" || pedido.estadoCoc == null || pedido.estadoBar == "listo para servir" || pedido.estadoBar == null || pedido.estadoCer == "listo para servir" || pedido.estadoCer == null) {
            if (pedido.estado == "con cliente esperando pedido") {
                //alert("Estoy en servir: " +pedido.estado);
                return cambiarEstadoPedidoGeneral(idPedido, "con clientes comiendo");
            }
            if (pedido.estado == "con clientes comiendo") {
                //alert("Estoy en comiendo: " +pedido.estado);
                return cambiarEstadoPedidoGeneral(idPedido, "con clientes pagando");
            }
            if (pedido.estado == "con clientes pagando") {
                //alert("Estoy en pagando: " +pedido.estado);
                if (tipo == "socio") {
                    return cambiarEstadoPedidoGeneral(idPedido, "libre");
                }
                else {
                    var modalIngresar = $("#modalIngresar").html("");
                    modalIngresar.append("\n                    <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                            <h4 style=\"color: red\" class=\"modal-title\"><b>Error</b></h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <h4 style=\"text-align: center\" id='errorLogin'><kbd class= label-danger>Acceso denegado</kbd></h2>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Salir</button>\n                        </div>\n                    </div>\n            \n                </div>");
                    return modalIngresar = $('#modalIngresar').modal('show');
                }
            }
        }
    }, function (error) {
        console.info("error", error);
    });
}
function cambiarEstadoPedidoGeneral(idPedido, estado) {
    console.log("pedido: ", idPedido, " estado: ", estado);
    var form_data = new FormData();
    form_data.append('idPedido', idPedido);
    form_data.append('estado', estado);
    $.ajax({
        type: "POST",
        url: servidor + "pedido/estadoGlobal/",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (pedido) {
        console.log("pedido estado global: ", pedido);
        if (estado == "con clientes comiendo") {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>el cliente ya esta comiendo</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
        if (estado == "con clientes pagando") {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>el cliente está pagando</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
        if (estado == "libre") {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>La mesa se cerro</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
        TSMostrarGrillaPedidos();
    }, function (error) {
        console.info("error", error);
        var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>No se sirvio el pedido</kbd></h4>");
        var modalError = $('#modalError').modal('show');
    });
}
function cancelarPedido(idPedido) {
    console.log("idPedido en cambiar estado: ", idPedido);
    var form_data = new FormData();
    form_data.append('idPedido', idPedido);
    //console.log(index);
    $.ajax({
        type: "POST",
        url: servidor + "pedido/traerUno/",
        data: form_data,
        headers: { "token": localStorage.getItem('token') },
        contentType: false,
        processData: false,
        cache: false
    }).then(function (pedido) {
        //en preparación
        console.log("Cancelar: ", pedido);
        if (pedido.estadoCoc == "en preparación" || pedido.estadoCoc == "Pendiente" || pedido.estadoBar == "en preparación" || pedido.estadoBar == "Pendiente" || pedido.estadoCer == "en preparación" || pedido.estadoCer == "Pendiente") {
            confirmarCancelacion(idPedido);
        }
        else {
            var modalIngresar = $("#modalIngresar").html("");
            modalIngresar.append("\n            <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                    <h4 style=\"color: red\" class=\"modal-title\"><b>Error</b></h4>\n                </div>\n                <div class=\"modal-body\">\n                    <h4 style=\"text-align: center\" id='errorLogin'><kbd class= label-danger>No se puede cancelar pedido listo</kbd></h2>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Salir</button>\n                </div>\n            </div>\n    \n        </div>");
            return modalIngresar = $('#modalIngresar').modal('show');
        }
    }, function (error) {
        console.info("error", error);
    });
}
//Eliminar Empleado
function confirmarCancelacion(index) {
    bootbox.confirm("¿Desea cancelar el pedido?", function (result) {
        if (result == true) {
            var form_data = new FormData();
            form_data.append('idPedido', index);
            $.ajax({
                type: "POST",
                url: servidor + "pedido/cancelar/",
                data: form_data,
                headers: { "token": localStorage.getItem('token') },
                contentType: false,
                processData: false,
                cache: false
            }).then(function (retorno) {
                console.log("borro " + retorno);
                var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>Se cancelo el pedido</kbd></h4>");
                var modalError = $('#modalError').modal('show');
                TSMostrarGrillaPedidos();
            }, function (error) {
                //alert("error en cargarDatos. Contacte al administrador.");
                console.log(error.responseText);
                var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-warning'>No se cancelo nada</kbd></h4>");
                var modalError = $('#modalError').modal('show');
            });
        }
        else {
            var msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se borro nada</kbd></h4>");
            var modalError = $('#modalError').modal('show');
        }
    });
}
