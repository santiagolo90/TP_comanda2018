namespace estacionamiento{

    export class empleado  {

        public id:number;
        public nombre:string;
        public email:string;
        public clave:string;
        public tipo:tipoEmpleado;
        public estado:string;

        constructor(id:number,nombre:string,email:string,clave:string,tipo:tipoEmpleado,estado:string) {
            this.id = id;
            this.nombre = nombre;
            this.email = email;
            this.clave = clave;
            this.tipo = tipo;
            this.estado = estado;

            
        }
/*
        public toJson():string{
            let cadena = super.toJson().replace('}',"");
            
            let json = cadena +`,"id":${this.ID},"Tipo":${this.Genero.toString()},"Foto":${this.Foto}}`; 

            return json;
        }
*/
    }

    
}