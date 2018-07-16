//let servidor= "http://santiagolo902.atwebpages.com/server/";
//let servidor= "https://santiagolo902.000webhostapp.com/server/";
//let servidor = "http://santiagolo902.eshost.com.ar/server/";
let servidor = "http://127.0.0.1:8080/TP_comanda/server/";

let titulo: any;
let fotoTitulo: any;
let vehiculosFiltrados: any;
let arrayNombres: any;
let arrayMarcas: any;
let arrayColor: any;

let md: any;
let claveTemp: any;
let emailTemp: any;
let data: any = datosToken();
let tipo: string;
let idGlobal :number


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

    let btnLimpiar = $("#btnLimpiar")//document.getElementByIdmismos selectors que css . o #
    btnLimpiar.click(function () {
        localStorage.clear();
        window.location.replace("./index.html");
    })
    let btnCerrarNav = $("#btnCerrarNav")
    btnCerrarNav.click(function () {
        $('.navbar-collapse').collapse('hide');
    })

    var btnABMempleados = $("#btnABMempleados");
    btnABMempleados.click(volverAdmin);


    var btnAgregar = $("#btnAgregar");
    btnAgregar.click(agregarEmpleado);

    let cbFilto = $("#cbFilto")
    cbFilto.change(filtrarAdmin);
    let btnMenuListado = $("#btnMenuListado")
    btnMenuListado.click(sosSocio)
    

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
    console.log("tipo en sosSocio: ",tipo);
    
    if (tipo != "socio") {
        //modalIngresar
        let modalIngresar = $("#modalIngresar").html("");
        modalIngresar.append(`
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 style="color: red" class="modal-title"><b>Error</b></h4>
            </div>
            <div class="modal-body">
                <h4 style="text-align: center" id='errorLogin'><kbd class= label-danger>Acceso denegado</kbd></h2>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
            </div>
        </div>

    </div>
        
        `)
        return modalIngresar = $('#modalIngresar').modal('show');
    }
    
}

function mostrarFormPedidos() {
    if (tipo == "cocinero" || tipo == "bartender" || tipo == "cervecero") {
        //modalIngresar
        let modalIngresar = $("#modalIngresar").html("");
        //let modalIngresar =  $('#modalIngresar').modal('show');
        //<h4 id='errorLogin'><kbd class= label-danger>Acceso denegado</kbd></h2>
        modalIngresar.append(`
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 style="color: red" class="modal-title"><b>Error</b></h4>
            </div>
            <div class="modal-body">
                <h4 style="text-align: center" id='errorLogin'><kbd class= label-danger>Acceso denegado</kbd></h2>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Salir</button>
            </div>
        </div>

    </div>
        
        `)
    } else {
        mesasDisponibles();

        var chBartender = $("#chBartender")
        chBartender.click(function mostarDetalleBar() {
            if (chBartender.is(':checked')) {
                $("#formBartender").show();
            } else {
                $("#formBartender").hide();
            }

        });
        var chCerveceria = $("#chCerveceria")
        chCerveceria.click(function mostarDetalleCer() {
            if (chCerveceria.is(':checked')) {
                $("#formCerveceria").show();
            } else {
                $("#formCerveceria").hide();
            }

        });
        var chCocina = $("#chCocina")

        chCocina.click(function mostarDetalleCoc() {
            if (chCocina.is(':checked')) {
                $("#formCocinas").show();
            } else {
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
        let errorEmail = $("#errorEmail").html("<h4 id='errorEmail'><kbd class= label-warning>Debe ingresar email</kbd></h2>").fadeToggle('slow');
        return;
    } else {
        //$("#email").addClass("sinError");
        let errorEmail = $("#errorEmail").html("");
    }
    if (datosLogin.clave == "") {
        //$("#clave").addClass("error");
        let errorclave = $("#errorClave").html("<h4 id='errorClave'><kbd class= label-warning>Debe ingresar clave</kbd></h2>").fadeToggle('slow');
        return;
    } else {
        //$("#clave").addClass("sinError");
        let errorclave = $("#errorClave").html("").fadeToggle('slow');
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
            window.location.replace("./home.html")
        }, function (error) {
            console.info("error login", error.responseJSON);
            let errorLogin = $("#errorLogin").html("<h4 id='errorLogin'><kbd class= label-danger>" + error.responseJSON + "</kbd></h2>");
            let errorLoginModal = $('#modalerrorLogin').modal('show');
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
        idGlobal = retorno.id
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
        let msjHola = $("#msjHola").html(
            "<h4 id='msjHola' align=center ><kbd>Bienvendio " + retorno.nombre + "</kbd></h4>"
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
            let tCuerpo = $("#tCuerpo");
            let tCabeza = $("#tCabeza");
            tCabeza.html("");
            tCuerpo.html("");
            $('#tCuerpo').html('<img src="IMG/5.gif">')
        }
    }).then(function (aux) {
        let empAux: estacionamiento.empleado;
        let listaEmpleados = [];
        for (var index = 0; index < aux.length; index++) {
            //append agrega mas al html
            //let foto = servidor +"estacionamiento/verImagenAuto/"+aux[index].patente;
            empAux = new estacionamiento.empleado(aux[index].id, aux[index].nombre, aux[index].email, aux[index].clave, aux[index].tipo, aux[index].estado);
            listaEmpleados.push(empAux);
        }
        console.log("Clase: ", listaEmpleados);

        filtrosEmpleado();
        filtrarAdmin();

        let chIDUsuario = $("#chIDUsuario");
        let chNombre = $("#chNombre");
        let chEmail = $("#chEmail");
        let chTipo = $("#chTipo");
        let chEstado = $("#chEstado");
        chIDUsuario.click(filtrarAdmin);
        chNombre.click(filtrarAdmin);
        chEmail.click(filtrarAdmin);
        chTipo.click(filtrarAdmin);
        chEstado.click(filtrarAdmin);
        let cbFilto = $("#cbFilto")
        cbFilto.change(filtrarAdmin);

        let Hola = $("#Hola").hide();
        let ABMemplados = $("#ABMemplados").fadeIn();

        let tCuerpo = $("#tCuerpo");
        let tCabeza = $("#tCabeza");
        tCabeza.html("");
        tCuerpo.html("");
        let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd> Lista de Usuarios</kbd></h2>");
        tCabeza.append("<tr class='success'>" +
            "<th> ID</th>" +
            "<th> Nombre</th>" +
            "<th> Email</th>" +
            "<th> Tipo</th>" +
            "<th> Estado</th>" +
            "<th> <i class='fas fa-info-circle'></i></th>" +
            "<th> Borrar</th>" +
            "<th> Modificar</th>" +
            "</tr>"
        )
        for (var index = 0; index < listaEmpleados.length; index++) {
            //append agrega mas al html
            //let foto = servidor +"estacionamiento/verImagenAuto/"+aux[index].patente;
            tCuerpo.append(
                `
                        <tr>
                        <td> ${listaEmpleados[index].id}</td>
                        <td> ${listaEmpleados[index].nombre}</td>
                        <td>${listaEmpleados[index].email}</td>
                        <td>${listaEmpleados[index].tipo}</td>
                        <td>${listaEmpleados[index].estado}</td>
                        <td><button  class="btn btn-xs btn-info" onclick=mostrarDetallesAdmin(${listaEmpleados[index].id}) > <i class="fas fa-info-circle"></i></button></td>
                        <td><button id=btnEliminar class="btn btn-xs btn-danger" onclick=eliminarEmpleado(${listaEmpleados[index].id})> <i class="far fa-trash-alt"></i> Borrar</button></td>
                        <td><button id=btnModificar class="btn btn-xs btn-warning" onclick=modificarEmpleado(${listaEmpleados[index].id})><i class="fas fa-edit"></i>Modificar</button></td>
                        </tr>`);

            //$("#tituloNav").html("<a class='navbar-brand' href=#>"+titulo+"</a>");
            //$("#fotoNav").html(fotoTitulo);
        }
    }, function (error) {
        console.info("error mostrar grilla", error);
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        let modalError = $('#modalError').modal('show');
    });
}

function TSMostrarGrillaEmpleadosFiltrada(auxEmpleados: any) {
    let chIDUsuario = $("#chIDUsuario");
    //let chNombre = $("#chNombre");
    let chEmail = $("#chEmail");
    let chTipo = $("#chTipo");
    let chEstado = $("#chEstado");


    let auxID: any;
    let auxEmail: any;
    let auxTipo: any;
    let auxEstado: any;

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
    } else {
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
    let tCuerpo = $("#tCuerpo");
    let tCabeza = $("#tCabeza");
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
        "</tr>"
    );
    for (var index = 0; index < auxEmpleados.length; index++) {
        let mapID = TSidEmpleado(auxEmpleados);
        let mapEmail = TSemailEmpleado(auxEmpleados);
        let mapTipo = TStipoEmpleado(auxEmpleados);
        let mapEstado = TSestadoEmpleado(auxEmpleados);
        //append agrega mas al html
        tCuerpo.append(
            "<tr>" +
            mapID[index] +
            `<td>${auxEmpleados[index].nombre}</td>` +
            mapEmail[index] +
            mapTipo[index] +
            mapEstado[index] +
            `<td><button  class="btn btn-xs btn-info" onclick=mostrarDetallesAdmin(${auxEmpleados[index].id}) > <i class="fas fa-info-circle"></i> </button></td>
            <td><button id=btnEliminar class="btn btn-xs btn-danger" onclick=eliminarEmpleado(${auxEmpleados[index].id})><i class="far fa-trash-alt"></i> Borrar</button></td>
            <td><button id=btnModificar class="btn btn-xs btn-warning" onclick=modificarEmpleado(${auxEmpleados[index].id})><i class="fas fa-edit"></i>Modificar</button></td>
            </tr>`
        );
    }
}

function TSidEmpleado(auxEstacionados: any[]) {
    let chIDUsuario = $("#chIDUsuario");
    let lID: string;


    return auxEstacionados.map(function (elemento) {
        if (chIDUsuario.is(':checked')) {
            return lID = `<td>${elemento.id}</td>`;
        }
        else {
            return lID = "";
        }
    });
}
function TSemailEmpleado(auxEstacionados: any[]) {
    let chEmail = $("#chEmail");
    let lColor: string;


    return auxEstacionados.map(function (elemento) {
        if (chEmail.is(':checked')) {
            return lColor = `<td>${elemento.email}</td>`;
        }
        else {
            return lColor = "";
        }
    });
}
function TStipoEmpleado(auxEstacionados: any[]) {
    let chTipo = $("#chTipo");
    let lEmpleado: string;


    return auxEstacionados.map(function (elemento) {
        if (chTipo.is(':checked')) {
            return lEmpleado = `<td>${elemento.tipo}</td>`;
        }
        else {
            return lEmpleado = "";
        }
    });
}
function TSestadoEmpleado(auxEstacionados: any[]) {
    let chEstado = $("#chEstado");
    let lFecha: string;


    return auxEstacionados.map(function (elemento) {
        if (chEstado.is(':checked')) {
            return lFecha = `<td>${elemento.estado}</td>`;
        }
        else {
            return lFecha = "";
        }
    });
}



//Agregar Empleado
function agregarEmpleado() {

    let nombreTXT: any = $("#nombreTXT").val();
    let emailTXT: any = $("#emailTXT").val();
    let claveTXT: any = $("#claveTXT").val();
    let tipoCB: any = $("#tipoCB").val();
    let estadoCB: any = $("#estadoCB").val();
    //let file_data = $("#perfilFile").prop("files")[0];
    //console.log(file_data);

    if (nombreTXT == "") {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar nombre</kbd></h2>");
        return;
    }

    if (emailTXT == "") {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar email</kbd></h2>");
        return;
    }

    if (claveTXT == "") {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar clave</kbd></h2>");
        return;
    }

    if (tipoCB === null) {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar tipo</kbd></h2>");
        return;
    }

    if (estadoCB === null) {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar estado</kbd></h2>");
        return;
    }

    // if (file_data === undefined) {
    //     let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar foto</kbd></h2>");
    //     return;
    // }


    let form_data = new FormData();
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
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>" + itemResponse + "</kbd></h4>");
        let modalError = $('#modalError').modal('show');
        TSMostrarGrillaEmpleados();
    },
        function (error) {
            limpiarCampos();
            console.info("error agregar usuarios", error);
            let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>" + error.responseJSON + "</kbd></h4>");
            let modalError = $('#modalError').modal('show');
        });

}
//Eliminar Empleado
function eliminarEmpleado(index: any) {
    if (index === 1) {
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se puede borrar a Admin</kbd></h4>");
        let modalError = $('#modalError').modal('show');
        return;
    }

    bootbox.confirm("¿Esta Seguro?", function (result: any) {
        if (result == true) {
            let form_data = new FormData();
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
                let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>" + retorno + "</kbd></h4>");
                let modalError = $('#modalError').modal('show');
                let Hola = $("#Hola").hide();
                let ABMemplados = $("#ABMemplados").fadeIn();
                TSMostrarGrillaEmpleados();
            }, function (error) {
                limpiarCampos();
                //alert("error en cargarDatos. Contacte al administrador.");
                console.log(error.responseText);
                let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>" + error.responseJSON + "</kbd></h4>");
                let modalError = $('#modalError').modal('show');
            });
        }
        else {
            let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se borro nada</kbd></h4>");
            let modalError = $('#modalError').modal('show');
        }
    });

}

//Modificar Empleado
function modificarEmpleado(index: any) {
    if (index === 1) {
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se puede modificar a Admin</kbd></h4>");
        let modalError = $('#modalError').modal('show');
        return;
    }
    let form_data = new FormData();
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
        let btnAgregar = $("#btnAgregar")
        btnAgregar.attr("value", "Modificar");
        btnAgregar.off("click", agregarEmpleado);
        btnAgregar.on("click", md = function () {
            Modificar(retorno.id)
        });
    }, function (error) {
        //alert("error en cargarDatos. Contacte al administrador.");
        console.log(error.responseText);
    });

}
function Modificar(idAux: any) {
    let nombreTXT: any = $("#nombreTXT").val();
    let emailTXT: any = $("#emailTXT").val();
    let claveTXT: any = $("#claveTXT").val();
    let tipoCB: any = $("#tipoCB").val();
    let estadoCB: any = $("#estadoCB").val();
    //let file_data = $("#perfilFile").prop("files")[0];

    if (nombreTXT == "") {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar nombre</kbd></h2>");
        return;
    }

    if (emailTXT == "") {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar email</kbd></h2>");
        return;
    }

    if (claveTXT == "") {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe ingresar clave</kbd></h2>");
        return;
    }

    if (tipoCB === null) {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar tipo</kbd></h2>");
        return;
    }
    if (estadoCB === null) {
        let msjErrorAlta = $("#msjErrorAlta").html("<h4 id='msjErrorAlta'><kbd class= label-warning>Debe seleccionar estado</kbd></h2>");
        return;
    }


    let form_data = new FormData();
    form_data.append('id', idAux);
    form_data.append('nombre', nombreTXT);
    form_data.append('email', emailTXT);
    form_data.append('clave', claveTXT);
    form_data.append('tipo', tipoCB);
    form_data.append('estado', estadoCB);
    //form_data.append('foto', file_data);

    bootbox.confirm("¿Esta Seguro?", function (result: any) {
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

                let btnAgregar = $("#btnAgregar")
                btnAgregar.attr("value", "Agregar");
                btnAgregar.off("click", md);
                btnAgregar.on("click", agregarEmpleado);
                limpiarCampos();
                let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>Se modifico al empleado con exito</kbd></h4>");
                let modalError = $('#modalError').modal('show');
                TSMostrarGrillaEmpleados();
            }, function (error) {
                //alert("error en cargarDatos. Contacte al administrador.");
                console.log(error.responseText);
                let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>" + error.responseJSON + "</kbd></h4>");
                let modalError = $('#modalError').modal('show');
            });
        }
        else {
            let btnAgregar = $("#btnAgregar")
            btnAgregar.attr("value", "Agregar");
            btnAgregar.off("click", md);
            btnAgregar.on("click", agregarEmpleado);
            limpiarCampos();
            TSMostrarGrillaEmpleados();
            let msjError = $("#msjError").html("<h4 id='msjError'><kbd class='label-success'>No se modifico nada</kbd></h4>");
            let modalError = $('#modalError').modal('show');
        }
    });


}

//Limpiar Campos
function limpiarCampos() {

    let nombreTXT: any = $("#nombreTXT").val("");
    let emailTXT: any = $("#emailTXT").val("");
    let claveTXT: any = $("#claveTXT").val("");
    let tipoCB: any = $("#tipoCB").val("");
    let estadoCB: any = $("#estadoCB").val("");


}

//Muestra detalles del empleado
function mostrarDetallesAdmin(index: any) {
    let form_data = new FormData();
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
        let infoDetalles = $("#infoDetalles");
        infoDetalles.html("");
        infoDetalles.append(
            `
            <p><b>ID:</b> ${aux.id}</p>
            <p><b>Nombre:</b> ${aux.nombre}</p>
            <p><b>Email:</b> ${aux.email}</p>
            <p><b>Tipo:</b> ${aux.tipo}</p>
            <p><b>Estado:</b> ${aux.estado}</p>
            <p>
                <b>Exportar Login:</b> 
                <a type="button" class="btn btn-xs btn-success" href=${servidor + "loginExport/excel/" + aux.id} download="${servidor + "excel/loginUsuario/" + aux.id}"><img src="IMG/excel.png" width="30" height="30" ></i></a>
                <a type="button" class="btn btn-xs btn-danger" href=${servidor + "loginExport/pdf/" + aux.id} target="_blank"  "><img src="IMG/pdf.png" width="30" height="30"></i></a>
            </p>
            `);
        let modalInfo = $('#modalInfo').modal('show');
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
            $('#tCuerpo').html('<img src="IMG/5.gif">')
        }
    }).then(function (aux) {
        let empAux: estacionamiento.empleado;
        let listaEmpleados = [];
        let tipoFiltrado: any = String($("#cbFilto").val());

        for (var index = 0; index < aux.length; index++) {

            empAux = new estacionamiento.empleado(aux[index].id, aux[index].nombre, aux[index].email, aux[index].clave, aux[index].tipo, aux[index].estado);
            listaEmpleados.push(empAux);
        }
        if (tipoFiltrado != "todos") {
            let empleadosFiltrados = [];
            empleadosFiltrados = aux.filter(function (emp: estacionamiento.empleado) {
                return estacionamiento.tipoEmpleado[emp.tipo] === estacionamiento.tipoEmpleado[tipoFiltrado];
            });
            TSMostrarGrillaEmpleadosFiltrada(empleadosFiltrados);
            //console.log(empleadosFiltrados);


        } else {
            if (aux != false) {
                console.info("bien -->", aux);
                TSMostrarGrillaEmpleadosFiltrada(aux);
            }
            else {
                let msjVehiculo = $("#msjVehiculo").html("<h4 id='msjVehiculo'><kbd>" + aux + "</kbd></h2>");
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
    let filtrosEmpleados = $("#filtrosEmpleados").html("");
    filtrosEmpleados = $("#filtrosEmpleados").html(`
                    <h4 id="mensaje"><kbd>Filtros</kbd></h4>
                    <label for="cbFilto">Filtrar por</label>
                    <select class="form-control" id="cbFilto" name="cbFilto">
                        <option value="todos">todos </option>
                        <option value="cocinero">cocinero </option>
                        <option value="bartender">bartender </option>
                        <option value="mozo">mozo </option>
                        <option value="cervecero">cervecero </option>
                        <option value="socio">socio </option>
                    </select>
                        
                    <br>
                    <br>
                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="id" id="chIDUsuario">ID</label>
                    </div>
                    
                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="email" id="chEmail" checked>Email</label>
                    </div>

                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="tipo" id="chTipo" checked>Tipo</label>
                    </div>

                    <div class="checkbox-inline">
                        <label><input type="checkbox" name="estado" id="chEstado" checked>Estado</label>
                    </div>
                            
    `);

}

function listadoLogin(auxId: any) {

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
        let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>no tiene permisos para realizar esta tarea</kbd></h4>");
        let modalError = $('#modalError').modal('show');
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
        let cbFiltoEmpleado = $("#cbFiltoEmpleado");
        cbFiltoEmpleado.html("");
        cbFiltoEmpleado.html(`
            <option value="todos">todos </option>
            `);
        for (var index = 0; index < arrayNombres.length; index++) {
            cbFiltoEmpleado.append(`
                <option value="${arrayNombres[index]}">${arrayNombres[index]}</option>
                `);

        }
    }, function (error) {
        console.info("error traer empleados ", error);
    });
}



/*******************PEDIDOS************************/
//Agregar pedido

function agregarPedido() {
    let clienteTXT: any = $("#clienteTXT").val();
    let mesaCB: any = $("#mesaCB").val();
    let bartenderCB: any = $("#bartenderCB").val();
    let cerveceriaCB: any = $("#cerveceriaCB").val();
    let cocinaCB: any = $("#cocinaCB").val();
    let importe: any = $("#importe").val();
    let file_data = $("#fotoFile").prop("files")[0];

    //console.log("clienteTXT: ",clienteTXT);
    //console.log("mesaCB: ",mesaCB);
    //console.log("bartenderCB: ",bartenderCB);
    //console.log("cerveceriaCB: ",cerveceriaCB);
    //console.log("cocinaCB: ",cocinaCB);


    if (clienteTXT == "") {
        let msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar cliente</kbd></h2>");
        return;
    }

    if (mesaCB === null) {
        let msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar mesa</kbd></h2>");
        return;
    }

    if (bartenderCB === "nada" && cerveceriaCB === "nada" && cocinaCB === "nada") {
        let msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar algun pedido</kbd></h2>");
        return;
    }


    if (file_data === undefined) {
        let msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe seleccionar foto</kbd></h2>");
        return;
    }
    if (importe === "" || importe < 1 ) {
        let msjErrorIngresar = $("#msjErrorIngresar").html("<h4 id='msjErrorIngresar'><kbd class= label-warning>Debe ingresar importe</kbd></h2>");
        return;
    }

    let form_data = new FormData();
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
        let msjBien = $("#msjBien").html("<h4 id='msjBien'><kbd class= label-success>" + itemResponse + "</kbd></h4>");
        let modalIngresar = $('#modalIngresar').modal('hide');
        let modalBien = $('#modalBien').modal('show');
        TSMostrarGrillaPedidos();
    },
        function (error) {
            console.info("error", error.responseText);
            let msjError = $("#msjError").html("<h4 id='msjError'><kbd class= label-danger>" + error.responseJSON + "</kbd></h4>");
            let modalError = $('#modalError').modal('show');

        });

}
