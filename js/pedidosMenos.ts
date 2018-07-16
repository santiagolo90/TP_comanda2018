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
    let filtrosNegativos = $("#filtrosNegativos").html("");
    filtrosNegativos = $("#filtrosNegativos").append(`
                            <br>
                            <br>
                            <h4 id="mensaje"><kbd>Filtros</kbd></h4>
                            <div class="input-group">
                            <label for="cbFiltoPedidoNegativo">Tiempo final negativo</label>
                            <select class="form-control" id="cbFiltoPedidoNegativo" name="cbFiltoPedidoNegativo">
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
                                <input type="date" class="form-control" id="fechaDesdeNegativos" name="fechaDesdeNegativos">
                                <label> Hasta</label>
                                <input type="date" class="form-control" id="fechaHastaNegativos" name="fechaHastaNegativos">
                                <input type="button" class="btn btn-success" value="Filtrar" id="btnFiltrarNegativosFecha" onclick="TSMostrarGrillaPedidosNegativos()" >
                            </div>  
                        </p>
                    `);
                    let cbFiltoPedidoNegativo = $("#cbFiltoPedidoNegativo")
                    cbFiltoPedidoNegativo.change(TSMostrarGrillaPedidosNegativos);
                    TSMostrarGrillaPedidosNegativos();


}

function TSMostrarGrillaPedidosNegativos() {
    let tipoNegativo: any = String($("#cbFiltoPedidoNegativo").val());
    console.log("negativo: ",tipoNegativo );

    let fechaDesdeNegativos: any = String($("#fechaDesdeNegativos").val());
    let fechaHastaNegativos: any = String($("#fechaHastaNegativos").val());
    
    console.log("fechaDesdeNegativos: ",fechaDesdeNegativos);
    console.log("fechaHastaNegativos: ",fechaHastaNegativos);
    
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

        if (fechaDesdeNegativos != "" ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha >= fechaDesdeNegativos;
            });
        }
        if (fechaHastaNegativos != "" ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha <= fechaHastaNegativos;
            });
        }
        if (fechaDesdeNegativos != "" && fechaHastaNegativos != ""  ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha >= fechaDesdeNegativos && emp.fecha <= fechaHastaNegativos;
            });
        }

        $("#sTablaEmpleados").show();
        let tCuerpo = $("#tCuerpo");
        let tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos/Cancelados </kbd></h2>");
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
            "</tr>")
        if (tipoNegativo == "cocinero") {
            console.log("listaPendientes cocinero: ",listaPendientes );
            let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos de cocinero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCoc === "Finalizado") {
                    if (listaPendientes[index].tiempo_final_coc < 0) {
                            tCuerpo.append(
                                `
                                    <tr>
                                    <td> ${listaPendientes[index].idPedido}</td>
                                    <td> ${listaPendientes[index].nroMesa}</td>
                                    <td>${listaPendientes[index].cliente}</td>
                                    <td>${listaPendientes[index].detalleCoc}</td>
                                    <td>${listaPendientes[index].tiempo_estimado_coc}</td>
                                    <td>${listaPendientes[index].tiempo_final_coc}</td>
                                    <td>${listaPendientes[index].estadoCoc}</td>
                                    <td>${listaPendientes[index].idEmpladoCoc}</td>
                                    <td>${listaPendientes[index].fecha}</td>
                                    </tr>`);
                    }
                }
            }
        }
        if (tipoNegativo == "bartender") {
            let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos de bartender </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoBar === "Finalizado") {
                    if (listaPendientes[index].tiempo_final_bar < 0) {
                            tCuerpo.append(
                                `
                                    <tr>
                                    <td> ${listaPendientes[index].idPedido}</td>
                                    <td> ${listaPendientes[index].nroMesa}</td>
                                    <td>${listaPendientes[index].cliente}</td>
                                    <td>${listaPendientes[index].detalleBar}</td>
                                    <td>${listaPendientes[index].tiempo_estimado_bar}</td>
                                    <td>${listaPendientes[index].tiempo_final_bar}</td>
                                    <td>${listaPendientes[index].estadoBar}</td>
                                    <td>${listaPendientes[index].idEmpladoBar}</td>
                                    <td>${listaPendientes[index].fecha}</td>
                                    </tr>`);
                    }
                }
            }
        }
        if (tipoNegativo == "cervecero") {
            let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Negativos de cervecero </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoCer === "Finalizado") {
                    if (listaPendientes[index].tiempo_final_cer < 0) {
                            tCuerpo.append(
                                `
                                <tr>
                                <td> ${listaPendientes[index].idPedido}</td>
                                <td> ${listaPendientes[index].nroMesa}</td>
                                <td>${listaPendientes[index].cliente}</td>
                                <td>${listaPendientes[index].detalleCer}</td>
                                <td>${listaPendientes[index].tiempo_estimado_cer}</td>
                                <td>${listaPendientes[index].tiempo_final_cer}</td>
                                <td>${listaPendientes[index].estadoCer}</td>
                                <td>${listaPendientes[index].idEmpladoCer}</td>
                                <td>${listaPendientes[index].fecha}</td>
                                </tr>`);
                    }
                }
            }
        }
    }, function (error) {
        console.info("error mostrar grilla", error);
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        let modalError = $('#modalError').modal('show');
    });
}
