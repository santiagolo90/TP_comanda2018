"use strict";
var estacionamiento;
(function (estacionamiento) {
    var tipoEmpleado;
    (function (tipoEmpleado) {
        tipoEmpleado["cocinero"] = "cocinero";
        tipoEmpleado["bartender"] = "bartender";
        tipoEmpleado["mozo"] = "mozo";
        tipoEmpleado["cervecero"] = "cervecero";
        tipoEmpleado["socio"] = "socio";
    })(tipoEmpleado = estacionamiento.tipoEmpleado || (estacionamiento.tipoEmpleado = {}));
    var tipoEstado;
    (function (tipoEstado) {
        tipoEstado["suspendido"] = "suspendido";
        tipoEstado["activo"] = "activo";
    })(tipoEstado = estacionamiento.tipoEstado || (estacionamiento.tipoEstado = {}));
    var tipoTurno;
    (function (tipoTurno) {
        tipoTurno["ma\u00F1ana"] = "ma\u00F1ana";
        tipoTurno["tarde"] = "tarde";
        tipoTurno["noche"] = "noche";
    })(tipoTurno = estacionamiento.tipoTurno || (estacionamiento.tipoTurno = {}));
    var tipoSexo;
    (function (tipoSexo) {
        tipoSexo["masculino"] = "masculino";
        tipoSexo["femenino"] = "femenino";
        tipoSexo["otro"] = "otro";
    })(tipoSexo = estacionamiento.tipoSexo || (estacionamiento.tipoSexo = {}));
    var tipoPerfil;
    (function (tipoPerfil) {
        tipoPerfil["admin"] = "admin";
        tipoPerfil["user"] = "user";
    })(tipoPerfil = estacionamiento.tipoPerfil || (estacionamiento.tipoPerfil = {}));
    var tipoMarca;
    (function (tipoMarca) {
        tipoMarca["audi"] = "audi";
        tipoMarca["bmw"] = "bmw";
        tipoMarca["chery"] = "chery";
        tipoMarca["chevrolet"] = "chevrolet";
        tipoMarca["citroen"] = "citroen";
        tipoMarca["dodge"] = "dodge";
        tipoMarca["fiat"] = "fiat";
        tipoMarca["ford"] = "ford";
        tipoMarca["honda"] = "honda";
        tipoMarca["hyundai"] = "hyundai";
        tipoMarca["mercedesBenz"] = "mercedesBenz";
        tipoMarca["nissan"] = "nissan";
        tipoMarca["peugeot"] = "peugeot";
        tipoMarca["renault"] = "renault";
        tipoMarca["suzuki"] = "suzuki";
        tipoMarca["toyota"] = "toyota";
        tipoMarca["volkswagen"] = "volkswagen";
        tipoMarca["volvo"] = "volvo";
        tipoMarca["otro"] = "otro";
    })(tipoMarca = estacionamiento.tipoMarca || (estacionamiento.tipoMarca = {}));
    var tipoColor;
    (function (tipoColor) {
        tipoColor["amarillo"] = "amarillo";
        tipoColor["azul"] = "azul";
        tipoColor["bordo"] = "bordo";
        tipoColor["blanco"] = "blanco";
        tipoColor["gris"] = "gris";
        tipoColor["marron"] = "marron";
        tipoColor["naranja"] = "naranja";
        tipoColor["negro"] = "negro";
        tipoColor["rojo"] = "rojo";
        tipoColor["verde"] = "verde";
        tipoColor["violeta"] = "violeta";
        tipoColor["otro"] = "otro";
    })(tipoColor = estacionamiento.tipoColor || (estacionamiento.tipoColor = {}));
    var estadoCochera;
    (function (estadoCochera) {
        estadoCochera["libre"] = "libre";
        estadoCochera["ocupada"] = "ocupada";
    })(estadoCochera = estacionamiento.estadoCochera || (estacionamiento.estadoCochera = {}));
    var tipoCochera;
    (function (tipoCochera) {
        tipoCochera["normal"] = "normal";
        tipoCochera["especial"] = "especial";
    })(tipoCochera = estacionamiento.tipoCochera || (estacionamiento.tipoCochera = {}));
})(estacionamiento || (estacionamiento = {}));
