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
    let filtrosCancelados = $("#filtrosCancelados").html("");
    filtrosCancelados = $("#filtrosCancelados").append(`
                            <br>
                            <br>
                            <h4 id="mensaje"><kbd>Filtros</kbd></h4>
                            <div class="input-group">
                            <label for="cbFiltoPedidoCancelado">Cancelados por tipo</label>
                            <select class="form-control" id="cbFiltoPedidoCancelado" name="cbFiltoPedidoCancelado">
                                <option value="cocinero">cocinero </option>
                                <option value="bartender">bartender </option>
                                <option value="cervecero">cervecero </option>
                            </select>
                            </div> 
                            <p>
                            <div class="form-group">
                                <label> Fecha</label>
                                <br>
                                <label> Desde</label>
                                <input type="date" class="form-control" id="fechaDesdeCancelados" name="fechaDesdeCancelados">
                                <label> Hasta</label>
                                <input type="date" class="form-control" id="fechaHastaCancelados" name="fechaHastaCancelados">
                                <input type="button" class="btn btn-success" value="Filtrar" id="btnFiltrarNegativosFecha" onclick="TSMostrarGrillaPedidosCancelados()" >
                            </div>  
                        </p>
                    `);
                    let cbFiltoPedidoCancelado = $("#cbFiltoPedidoCancelado")
                    cbFiltoPedidoCancelado.change(TSMostrarGrillaPedidosCancelados);
                    TSMostrarGrillaPedidosCancelados();


}

function TSMostrarGrillaPedidosCancelados() {
    let tipoCancelado: any = String($("#cbFiltoPedidoCancelado").val());
    console.log("Cancelado: ",tipoCancelado );

    let fechaDesdeCancelados: any = String($("#fechaDesdeCancelados").val());
    let fechaHastaCancelados: any = String($("#fechaHastaCancelados").val());
    
    console.log("fechaDesdeCancelados: ",fechaDesdeCancelados);
    console.log("fechaHastaCancelados: ",fechaHastaCancelados);
    
    $.ajax({
        url: servidor + "pedido/",
        type: 'GET',
        headers: { "token": localStorage.getItem('token') },
        beforeSend: function () {
            let tCuerpo = $("#tCuerpo");
            let tCabeza = $("#tCabeza");
            tCabeza.html("");
            tCuerpo.html("");
            $('#tCuerpo').html('<img src="IMG/5.gif">')
        }
    }).then(function (listaPendientes) {

        if (fechaDesdeCancelados != "" ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha >= fechaDesdeCancelados;
            });
        }
        if (fechaHastaCancelados != "" ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha <= fechaHastaCancelados;
            });
        }
        if (fechaDesdeCancelados != "" && fechaHastaCancelados != ""  ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha >= fechaDesdeCancelados && emp.fecha <= fechaHastaCancelados;
            });
        }

        $("#sTablaEmpleados").show();
        let tCuerpo = $("#tCuerpo");
        let tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados </kbd></h2>");
        tCabeza.append("<tr class='success'>" +
            "<th> ID</th>" +
            "<th> Mesa</th>" +
            "<th> Cliente</th>" +
            "<th> Detalle</th>" +
            "<th> Estado</th>" +
            "<th> Empleado</th>" +
            "<th> Fecha</th>" +
            "</tr>")
        if (tipoCancelado == "cocinero") {
            console.log("listaPendientes cocinero: ",listaPendientes );
            let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados de cocinero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCoc === "Cancelado") {
                    if (listaPendientes[index].idEmpladoCoc == null) {
                        listaPendientes[index].idEmpladoCoc = "Sin empleado";
                    }
                            tCuerpo.append(
                                `
                                    <tr>
                                    <td> ${listaPendientes[index].idPedido}</td>
                                    <td> ${listaPendientes[index].nroMesa}</td>
                                    <td>${listaPendientes[index].cliente}</td>
                                    <td>${listaPendientes[index].detalleCoc}</td>
                                    <td>${listaPendientes[index].estadoCoc}</td>
                                    <td>${listaPendientes[index].idEmpladoCoc}</td>
                                    <td>${listaPendientes[index].fecha}</td>
                                    </tr>`);
                }
            }
        }
        if (tipoCancelado == "bartender") {
            let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados de bartender </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoBar === "Cancelado") {
                    if (listaPendientes[index].idEmpladoBar == null) {
                        listaPendientes[index].idEmpladoBar = "Sin empleado";
                    }
                            tCuerpo.append(
                                `
                                    <tr>
                                    <td> ${listaPendientes[index].idPedido}</td>
                                    <td> ${listaPendientes[index].nroMesa}</td>
                                    <td>${listaPendientes[index].cliente}</td>
                                    <td>${listaPendientes[index].detalleBar}</td>
                                    <td>${listaPendientes[index].estadoBar}</td>
                                    <td>${listaPendientes[index].idEmpladoBar}</td>
                                    <td>${listaPendientes[index].fecha}</td>
                                    </tr>`);
                }
            }
        }
        if (tipoCancelado == "cervecero") {
            let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Cancelados de cervecero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCer === "Cancelado") {
                    if (listaPendientes[index].idEmpladoCer == null) {
                        listaPendientes[index].idEmpladoCer = "Sin empleado";
                    }
                            tCuerpo.append(
                                `
                                <tr>
                                <td> ${listaPendientes[index].idPedido}</td>
                                <td> ${listaPendientes[index].nroMesa}</td>
                                <td>${listaPendientes[index].cliente}</td>
                                <td>${listaPendientes[index].detalleCer}</td>
                                <td>${listaPendientes[index].estadoCer}</td>
                                <td>${listaPendientes[index].idEmpladoCer}</td>
                                <td>${listaPendientes[index].fecha}</td>
                                </tr>`);
                }
            }
        }
    }, function (error) {
        console.info("error mostrar grilla", error);
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        let modalError = $('#modalError').modal('show');
    });
}
