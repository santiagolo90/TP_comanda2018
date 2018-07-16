namespace estacionamiento {

    export enum tipoEmpleado{
        cocinero="cocinero",
        bartender="bartender",
        mozo ="mozo",
        cervecero="cervecero",
        socio ="socio"
    }
    export enum tipoEstado{
        suspendido="suspendido",
        activo="activo"
    }

    export enum tipoTurno{
        mañana="mañana",
        tarde="tarde",
        noche ="noche"
    }

    export enum tipoSexo{
        masculino="masculino",
        femenino ="femenino",
        otro ="otro"
    }
    export enum tipoPerfil{
        admin="admin",
        user ="user"
    }
    export enum tipoMarca{
        audi= "audi",
        bmw ="bmw",
        chery="chery",
        chevrolet = "chevrolet",
        citroen="citroen",
        dodge= "dodge",
        fiat="fiat",
        ford="ford",
        honda = "honda",
        hyundai ="hyundai",
        mercedesBenz="mercedesBenz",
        nissan ="nissan",
        peugeot ="peugeot",
        renault = "renault",
        suzuki = "suzuki",
        toyota="toyota",
        volkswagen="volkswagen",
        volvo ="volvo",
        otro ="otro"
    }
    export enum tipoColor{
        amarillo = "amarillo",
        azul = "azul",
        bordo = "bordo",
        blanco = "blanco",
        gris ="gris",
        marron = "marron",
        naranja ="naranja",
        negro = "negro",
        rojo = "rojo",
        verde = "verde",
        violeta ="violeta",
        otro ="otro"
    }
    
    export enum estadoCochera{
        libre = "libre",
        ocupada = "ocupada"
    }
    export enum tipoCochera{
        normal = "normal",
        especial = "especial"
    }
}