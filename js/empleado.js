"use strict";
var estacionamiento;
(function (estacionamiento) {
    var empleado = /** @class */ (function () {
        function empleado(id, nombre, email, clave, tipo, estado) {
            this.id = id;
            this.nombre = nombre;
            this.email = email;
            this.clave = clave;
            this.tipo = tipo;
            this.estado = estado;
        }
        return empleado;
    }());
    estacionamiento.empleado = empleado;
})(estacionamiento || (estacionamiento = {}));
