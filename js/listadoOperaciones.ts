
declare class Chart {
    static readonly Chart: typeof Chart;
    constructor(
        context: string | any | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
        context2: string | any | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>,
    );
}
let tipoFiltroOperaciones:any;
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
    let filtrosOperaciones = $("#filtrosOperaciones").html("");
    filtrosOperaciones = $("#filtrosOperaciones").append(`
                    <br>
                    <br>
                    <h4 id="mensaje"><kbd>Filtros</kbd></h4>
                    <div class="input-group">
                    <label for="cbFiltoOperacionesSector">Filtrar por sector</label>
                    <select class="form-control" id="cbFiltoOperacionesSector" name="cbFiltoOperacionesSector">
                        <option value="todos">todos </option>
                        <option value="cocinero">cocinero </option>
                        <option value="bartender">bartender </option>
                        <option value="cervecero">cervecero </option>
                        <option value="socio">socio </option>
                    </select>
                    </div> 
                    <div class="input-group">
                        <label for="cbFiltoOperacionesEmpleado"> Empleado</label>
                        <select class="form-control" id="cbFiltoOperacionesEmpleado" name="cbFiltoOperacionesEmpleado">
                        </select>
                    </div> 
                    <p>
                        <div class="form-group">
                            <label> Fecha</label>
                            <br>
                            <label> Desde</label>
                            <input type="date" class="form-control" id="fechaDesdeOperaciones" name="fechaDesdeOperaciones">
                            <label> Hasta</label>
                            <input type="date" class="form-control" id="fechaHastaOperaciones" name="fechaHastaOperaciones">
                            <input type="button" class="btn btn-success" value="Filtrar" id="btnFiltrarOperacionesFecha" onclick="TSMostrarGrillaOperaciones()" >
                        </div>  
                    </p>
                    `);

    usuariosDisponiblesOperaciones();
    let cbFiltoOperacionesSector = $("#cbFiltoOperacionesSector")
    cbFiltoOperacionesSector.change(usuariosDisponiblesOperaciones);
    let cbFiltoOperacionesEmpleado = $("#cbFiltoOperacionesEmpleado");
    cbFiltoOperacionesEmpleado.change(TSMostrarGrillaOperaciones);
    let msjMaxMin = $("#MinMaxCochera").fadeIn();
    //masUtilizadaOperaciones();
    TSMostrarGrillaOperaciones();

}

function TSMostrarGrillaOperaciones() {
    let fechaDesdeOperaciones: any = String($("#fechaDesdeOperaciones").val());
    let fechaHastaOperaciones: any = String($("#fechaHastaOperaciones").val());
    
    console.log("fechaDesdeOperaciones: ",fechaDesdeOperaciones);
    console.log("fechaHastaOperaciones: ",fechaHastaOperaciones);
    //console.log("email :",emailFiltrado);
    
    if (fechaDesdeOperaciones != "" && fechaHastaOperaciones != "") {
        if (fechaDesdeOperaciones > fechaHastaOperaciones ) {
            let modalIngresar = $("#modalIngresar").html("");
            modalIngresar.append(`
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 style="color: red" class="modal-title"><b>Error</b></h4>
                </div>
                <div class="modal-body">
                    <h4 style="text-align: center" id='errorLogin'><kbd class= label-danger>Desde no puede ser mayor que hasta</kbd></h2>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
                </div>
            </div>
    
        </div>`)
            return modalIngresar = $('#modalIngresar').modal('show');
        }
    }
    
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
        $("#sTablaEmpleados").show();
        let emailFiltrado: any = String($("#cbFiltoOperacionesEmpleado").val());
        let empleadosFiltrados = listaPendientes;
        console.log("emailFiltrado: ", emailFiltrado);
        if (emailFiltrado === "todos") {

            listaPendientes = listaPendientes.filter(function (emp: any) {
                console.log("tipoFiltroOperaciones: ",tipoFiltroOperaciones);
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
                }else{
                    return emp;
                }
            });  
        }
        if (emailFiltrado != "todos") {
            
            listaPendientes = listaPendientes.filter(function (emp: any) {
                console.log("tipoFiltroOperaciones: ",tipoFiltroOperaciones);
                
                if (emp.idEmpladoBar == emailFiltrado) {
                    return emp.idEmpladoBar == emailFiltrado
                }
                if (emp.idEmpladoCoc == emailFiltrado) {
                    return emp.idEmpladoCoc == emailFiltrado
                }
                if (emp.idEmpladoCer == emailFiltrado) {
                    return emp.idEmpladoCer == emailFiltrado
                }
            });
        }

        if (fechaDesdeOperaciones != "" ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha >= fechaDesdeOperaciones;
            });
        }
        if (fechaHastaOperaciones != "" ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha <= fechaHastaOperaciones;
            });
        }
        if (fechaDesdeOperaciones != "" && fechaHastaOperaciones != ""  ) {
            listaPendientes = listaPendientes.filter(function (emp: any) {
                return emp.fecha >= fechaDesdeOperaciones && emp.fecha <= fechaHastaOperaciones;
            });
        }
        
        masUtilizadaOperaciones(fechaDesdeOperaciones,fechaHastaOperaciones);
        masVendidosOperaciones(fechaDesdeOperaciones,fechaHastaOperaciones);
        let tCuerpo = $("#tCuerpo");
        let tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        let msjVehiculo = $("#msjVehiculo").html("br<h4 id='msjVehiculo'><kbd>Pendientes </kbd></h2>");
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
            "</tr>")
        if (tipo == "socio") {
            let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>Listado de oeraciones </kbd></h2>");
            for (var index = 0; index < listaPendientes.length; index++) {
                if (listaPendientes[index].estadoBar === "Finalizado" || listaPendientes[index].estadoBar === "Sin pedido" || listaPendientes[index].estadoCer === "Finalizado" || listaPendientes[index].estadoCer === "Sin pedido" ||listaPendientes[index].estadoCoc === "Finalizado" || listaPendientes[index].estadoCoc === "Sin pedido" ) { 
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
                    tCuerpo.append(
                        `
                            <tr>
                            <td> ${listaPendientes[index].idPedido}</td>
                            <td> ${listaPendientes[index].nroMesa}</td>
                            <td>${listaPendientes[index].cliente}</td>
                            <td>${listaPendientes[index].importe}</td>
                            <td> ${listaPendientes[index].detalleBar}</td>
                            <td> ${listaPendientes[index].tiempo_final_bar}</td>
                            <td>${listaPendientes[index].idEmpladoBar}</td>
                            <td> ${listaPendientes[index].detalleCer}</td>
                            <td> ${listaPendientes[index].tiempo_final_cer}</td>
                            <td>${listaPendientes[index].idEmpladoCer}</td>
                            <td> ${listaPendientes[index].detalleCoc}</td>
                            <td> ${listaPendientes[index].tiempo_final_coc}</td>
                            <td>${listaPendientes[index].idEmpladoCoc}</td>
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

function usuariosDisponiblesOperaciones() {
    $.ajax({
        type: "GET",
        url: servidor + "empleado/",
        headers: { "token": localStorage.getItem('token') },
    })
        .then(function (retorno) {
            let tipoBuscado: any = String($("#cbFiltoOperacionesSector").val());
            console.info("En filtro User oper:", retorno);
            console.info("tipoBuscado:", tipoBuscado);

            let cbFiltoOperacionesEmpleado = $("#cbFiltoOperacionesEmpleado");
            cbFiltoOperacionesEmpleado.html("");
            cbFiltoOperacionesEmpleado.html(`
             <option value="todos">Todos</option>
             `);
             tipoFiltroOperaciones = tipoBuscado;
            for (var index = 0; index < retorno.length; index++) {
                if (tipoBuscado == "todos") {
                    cbFiltoOperacionesEmpleado.append(`
                    <option value="${retorno[index].id}">${retorno[index].email}</option>
                    `);
                }
                if (tipoBuscado == retorno[index].tipo) {
                    cbFiltoOperacionesEmpleado.append(`
                    <option value="${retorno[index].id}">${retorno[index].email}</option>
                    `);
                }


            }
            TSMostrarGrillaOperaciones();
        }, function (error) {
            console.info("error al traer mesas: ", error.responseJSON);
            let errorLogin = $("#errorLogin").html("<h4 id='errorLogin'><kbd class= label-danger>Error al traer mesas</kbd></h2>");
            let errorLoginModal = $('#modalerrorLogin').modal('show');
        });

}

function masUtilizadaOperaciones(fechaDesdeOperaciones:any,fechaHastaOperaciones:any) {
    let form_data = new FormData();
    
    if (fechaDesdeOperaciones != "") {
        form_data.append('desde', fechaDesdeOperaciones);
        console.log("form_data: ", form_data.get('desde'));
    }
    if (fechaHastaOperaciones != "") {
        form_data.append('hasta',  fechaHastaOperaciones);
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
        $("#msjTitulo").append(`
        <p><b>Operaciones</b></p>
        `);
        $("#msjMax").append(`
        <p><b>Bartender nº:</b> ${retorno.estadoBar[0].cant}</p>
        <p><b>Cerveceria nº:</b> ${retorno.estadoCer[0].cant}</p>
        <p><b>Cocina nº:</b> ${retorno.estadoCoc[0].cant}</p>
        `);

       new Chart(document.getElementById("bar-chart"), {
        type: 'doughnut',
        data: {
          labels: ["Bartender", "Cerveceria", "Cocina"],
          datasets: [
            {
              label: "Cantidad de pedidos",
              backgroundColor: ["#f3c83b", "#000000","#f3f3f3"],
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
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        let modalError = $('#modalError').modal('show');
    });
    
}
function masVendidosOperaciones(fechaDesdeOperaciones:any,fechaHastaOperaciones:any) {
    let form_data = new FormData();
    if (fechaDesdeOperaciones != "") {
        form_data.append('desde', fechaDesdeOperaciones);
    }
    if (fechaHastaOperaciones != "") {
        form_data.append('hasta',  fechaHastaOperaciones);
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
        $("#msjTituloVendidos").append(`
        <p><b>Mas vendidos</b></p>
        `);
        if (retorno.detalleBar == "Nada") {
            $("#msjMaxVendidos").append(`
            <p><b>Bartender: </b> ${retorno.detalleBar} </p>
            `);
        }else{
            $("#msjMaxVendidos").append(`
            <p><b>Bartender: </b> ${retorno.detalleBar[0].detalleBar} Cant: ${retorno.detalleBar[0].cant} </p>
            `);
        }
        if (retorno.detalleCer == "Nada") {
            $("#msjMaxVendidos").append(`
            <p><b>Bartender: </b> ${retorno.detalleCer} </p>
            `);
        }else{
            $("#msjMaxVendidos").append(`
            <p><b>Cerveceria:</b> ${retorno.detalleCer[0].detalleCer} Cant: ${retorno.detalleCer[0].cant} </p>
            `);
        }
        if (retorno.detalleCoc == "Nada") {
            $("#msjMaxVendidos").append(`
            <p><b>Bartender: </b> ${retorno.detalleCoc} </p>
            `);
        }else{
            $("#msjMaxVendidos").append(`
            <p><b>Cocina: </b> ${retorno.detalleCoc[0].detalleCoc} Cant: ${retorno.detalleCoc[0].cant} </p>
            `);
        }



    }, function (error) {
        console.log("error", error.responseText);
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        let modalError = $('#modalError').modal('show');
    });
    
}

