<?php
include_once "empleado.php";
include_once "historico.php";

class empleadoApi extends empleado
{
    //CargoUno
    public function CargarUno($request, $response, $args)
    {
        $ArrayDeParametros = $request->getParsedBody();
        //$objDelaRespuesta= new stdclass();

        if (!isset($ArrayDeParametros['email'])) {
            return $response->withJson("email no puede esta vacio",404);   
        }
        $email= strtolower($ArrayDeParametros['email']);
        if (empleadoApi::is_valid_email($email) !== true) {
            return $response->withJson("no es email",404);
        }

        if (!isset($ArrayDeParametros['clave'])) {
            return $response->withJson("clave no puede esta vacio",404);   
        }
        $clave= password_hash($ArrayDeParametros['clave'],PASSWORD_BCRYPT);

        if (!isset($ArrayDeParametros['nombre'])) {
            return $response->withJson("nombre no puede esta vacio",404);   
        }
        $nombre= strtolower($ArrayDeParametros['nombre']);

        if ($this->validarNombre($nombre) == false) {
            return $response->withJson("Error: Nombre solo puede contener letas y numeros",404);
        }
        
        if (!isset($ArrayDeParametros['tipo'])) {
            return $response->withJson("tipo no puede esta vacio",404);   
        }
        $tipo= strtolower($ArrayDeParametros['tipo']);

        if (!isset($ArrayDeParametros['estado'])) {
            return $response->withJson("estado no puede esta vacio",404);   
        }
        $estado= strtolower($ArrayDeParametros['estado']);
        
        //$perfil= $ArrayDeParametros['perfil'];
        //$alta= date("Y-m-d H:i:s");

        $empleadoAux = new empleado();

        $empleadoAux->email = $email;
        $empleadoAux->clave = $clave;
        $empleadoAux->nombre = $nombre;
        $empleadoAux->tipo = $tipo;
        $empleadoAux->estado = $estado;
        

        // if (foto::validarNombre($empleadoAux->nombre) == false) {
        //     throw new Exception('Error: Nombre solo puede contener letas y numeros');
        // }


        //$foto = $_FILES['foto'];
        $e = empleado::TraerEmail($empleadoAux->email);

        
        if ($e == null){
            $empleadoAux->InsertarEmpleadoParametros();
            $response->getBody()->write("Se dio de alta al empleado: ".$nombre,202);
            //$response->withJson("Se dio de alta al empleado: ".$nombre);

        }else {
            return $response->withJson("El emplado ya existe ",404);
        }

        return $response;
        
    }

    //Manejo de la Imagen
    public function obtenerArchivo($nombre) 
	{
        if(!isset($_FILES['foto']))
        {
            throw new Exception('Error: No existe foto');
        }
        if ( 0 < $_FILES['foto']['error'] ) {
			return null;
		}
		else {
            $foto = $_FILES['foto']['name'];
			
            $extension= explode(".", $foto);
            $tipo = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));
            if($tipo != "jpg" && $tipo != "jpeg" && $tipo != "png") {
                throw new Exception('Error: de formato, solo se acepta jpg jpeg png');
            }

            $nombreNuevo = 'fotosEmpleados/'.$nombre.".".strtolower($extension[1]);
            return $nombreNuevo;
		}
    }
    public function validarNombre($cadena){ 
        $permitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
        for ($i=0; $i<strlen($cadena); $i++){ 
            if (strpos($permitidos, substr($cadena,$i,1))===false){ 
            //no es válido; 
            return false; 
            } 
        }  
        //si estoy aqui es que todos los caracteres son validos 
        return true; 
    }
    public static function is_valid_email($str){
      return (false !== filter_var($str, FILTER_VALIDATE_EMAIL));
    }

    //TraigoTodos
    public function traerTodos($request, $response, $args) 
	{
        $suspendido = $request->getAttribute('suspendidos');
        if (!empty($args) ){
            $todosEmpleados = empleado::TraerTodoLosEmpleadosSuspendidos();
            if ($todosEmpleados ==false) {
                return $response->withJson("No hay empleados suspendidos");
            } 
            return $response->withJson($todosEmpleados, 200);
        }
        else {
            $todosEmpleados = empleado::TraerTodoLosEmpleados();
		    return $response->withJson($todosEmpleados, 200);  
            
        }

    }
    public function traerUno($request, $response, $args) 
	{
        $ArrayDeParametros = $request->getParsedBody();
        $id= $ArrayDeParametros['id'];
        $empBuscado = empleado::TraerEmpleadoID($id);
        return $response->withJson($empBuscado, 200);  
    }

    public function BorrarUno($request, $response, $args) 
    {//return $response->withJson("El emplado ya existe ",404);
            $ArrayDeParametros = $request->getParsedBody(); //para delete urlencoded
            if (!isset($ArrayDeParametros['id'])) {
                return $response->withJson("Error al borrar: Debe ingresar ID de empleado",404);
            }
            $id=$ArrayDeParametros['id'];

            $empBorrar = empleado::TraerEmpleadoID($id);
            if ($empBorrar == false) {
                return $response->withJson('Error al borrar: No existe empleado con id: '.$id,404);
            }

            $nombreViejo =$empBorrar->nombre;
            if(empleado::BorrarEmpleadoID($id)>0){       
                return $response->withJson('Se borro con exito a '.$nombreViejo,202);
            }else{
                return $response->withJson('Error al Borrar el empleado',404);
            }
    }

    public static function fotoPapelera($fotoVieja, $nombre)
    {
            $ahora = date("Ymd-His");
            $extension = pathinfo($fotoVieja, PATHINFO_EXTENSION);
            rename($fotoVieja , "fotosEmpleados/papelera/".trim($nombre)."-".$ahora.".".$extension);
    }
    
    public function suspenderUno($request, $response, $args) 
    {
            $ArrayDeParametros = $request->getParsedBody();
            if (!isset($ArrayDeParametros['id'])) {
                throw new Exception('Error al suspender: Debe ingresar ID de empleado');
            }
            $id= $ArrayDeParametros['id'];
            $objDelaRespuesta= new stdclass();
            //$precio= $ArrayDeParametros['precio'];
            $empModificar = new empleado();
            $empModificar = empleado::TraerEmpleadoID($id);
            
            if ($empModificar != NULL ) 
            {
                $accion = 'suspendido';
                empleado::SuspenderEmpleadoParametros($id,$accion);
                    //$empModificar->SuspenderEmpleadoParametros();
                    $objDelaRespuesta->resultado="Se suspendio a : ".$empModificar->nombre;
            }
            else 
            {
                $objDelaRespuesta->resultado="Error al suspender: debe ingresar un ID valido";
            }
            $newResponse = $response->withJson($objDelaRespuesta, 200);
            return $newResponse; 
            
    }

    public function activarUno($request, $response, $args) 
    {
            $ArrayDeParametros = $request->getParsedBody();
            if (!isset($ArrayDeParametros['id'])) {
                throw new Exception('Error al activar: Debe ingresar ID de empleado');
            }
            $id= $ArrayDeParametros['id'];
            $objDelaRespuesta= new stdclass();
            //$precio= $ArrayDeParametros['precio'];
            $empModificar = new empleado();
            $empModificar = empleado::TraerEmpleadoID($id);
            
            if ($empModificar != NULL ) 
            {
                $accion = "activo";
                empleado::SuspenderEmpleadoParametros($id,$accion);
                    //$empModificar->SuspenderEmpleadoParametros();
                    $objDelaRespuesta->resultado="Se activo a : ".$empModificar->nombre;
            }
            else 
            {
                $objDelaRespuesta->resultado="Error al activar: debe ingresar un ID valido";
            }
            $newResponse = $response->withJson($objDelaRespuesta, 200);
            return $newResponse; 
            
    }

    public function modificarUno($request, $response, $args) 
    {
            $ArrayDeParametros = $request->getParsedBody();
            if (!isset($ArrayDeParametros['id'])) {
                return $response->withJson('Error al modificar: Debe ingresar ID de empleado',404);
            }
            $id= $ArrayDeParametros['id'];
            $objDelaRespuesta= new stdclass();
            $empModificar = empleado::TraerEmpleadoID($id);

            if ($empModificar != false) {
                $objDelaRespuesta->msj = "se modifico empleado con id ".$id;
                if (isset($ArrayDeParametros['nombre'])) {
                    $nombre = strtolower($ArrayDeParametros['nombre']);
                    $empModificar->nombre = $nombre;
                    if ($empModificar->nombre== "" || !isset($empModificar->nombre)) {
                        return $response->withJson('Error: nombre no puede esta vacio',404);
                    }
                    if ($this->validarNombre($empModificar->nombre) == false) {
                        return $response->withJson('Error: Nombre solo puede contener letas y numeros',404);
                    }
                    $empModificar->ModificarEmpleadoID($id);
                    $objDelaRespuesta->nombre =$nombre;
                }
                if (isset($ArrayDeParametros['email'])) {
                    $email = strtolower($ArrayDeParametros['email']);
                    if (empleadoApi::is_valid_email($email) !== true) {
                        return $response->withJson("no es email",404);
                    }
                    $empModificar->email = $email;
                    if ($empModificar->email== "" || !isset($empModificar->email)) {
                        return $response->withJson("Error: email no puede esta vacio",404);
                    }
                    $empModificar->ModificarEmpleadoID($id);
                    $objDelaRespuesta->email =$email;
                }
                if (isset($ArrayDeParametros['clave'])) {
                    $clave = password_hash($ArrayDeParametros['clave'],PASSWORD_BCRYPT);
                    $empModificar->clave = $clave;
                    if ($empModificar->clave== "" || !isset($empModificar->clave)) {
                        return $response->withJson('Error: clave no puede esta vacio',404);
                    }
                    $empModificar->ModificarEmpleadoID($id);
                    $objDelaRespuesta->clave =$clave;
                }
                if (isset($ArrayDeParametros['tipo'])) {
                    $tipo = strtolower($ArrayDeParametros['tipo']);
                    $empModificar->tipo = $tipo;
                    if ($empModificar->tipo== "" || !isset($empModificar->tipo)) {
                        return $response->withJson('Error: tipo no puede esta vacio',404);
                    }
                    $empModificar->ModificarEmpleadoID($id);
                    $objDelaRespuesta->tipo =$tipo;
                }
                if (isset($ArrayDeParametros['estado'])) {
                    $estado = strtolower($ArrayDeParametros['estado']);
                    $empModificar->estado = $estado;
                    if ($empModificar->estado== "" || !isset($empModificar->estado)) {
                        return $response->withJson('Error: estado no puede esta vacio',404);
                    }
                    $empModificar->ModificarEmpleadoID($id);
                    $objDelaRespuesta->estado =$estado;
                }
            }
            else {
                return $response->withJson('Error no existe el ID del empleado',404);
            }
            return $response->withJson($objDelaRespuesta, 202);
            
    }

    public function operacionesEmpleado($request, $response, $args)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $objDelaRespuesta= new stdclass();
        if (!empty($args)){
            $email = $args['email'];
        
            if ($empleadoAux = empleado::TraerEmpleadoEmail($email)){
                $objDelaRespuesta->empleado=$empleadoAux->nombre;
                if (isset($ArrayDeParametros['desde']) && isset($ArrayDeParametros['hasta'])) {
                    $desde= $ArrayDeParametros['desde'];
                    if ($desde== "") {
                        throw new Exception('Error: desde no puede esta vacio');
                    }
                    $hasta= $ArrayDeParametros['hasta'];
                    if ($hasta== "") {
                        throw new Exception('Error: hasta no puede esta vacio');
                    }
                    if ($desde > $hasta) {
                        throw new Exception('Error: desde no puede ser mayor que hasta');
                    }
                    $objDelaRespuesta->cantIngresos =empleado::operacionesUsuarioEntradaFecha($empleadoAux->id,$desde,$hasta);
                    $objDelaRespuesta->cantSalidas =empleado::operacionesUsuarioSalidaFecha($empleadoAux->id,$desde,$hasta);
                    $objDelaRespuesta->msj ="Operaciones desde ".$desde." hasta ".$hasta;
                }
                if (isset($ArrayDeParametros['desde']) && !isset($ArrayDeParametros['hasta'])) {
                    $desde= $ArrayDeParametros['desde'];
                    if ($desde== "") {
                        throw new Exception('Error: desde no puede esta vacio');
                    }
                    $objDelaRespuesta->cantIngresos =empleado::operacionesUsuarioEntradaFecha($empleadoAux->id,$desde,"");
                    $objDelaRespuesta->cantSalidas =empleado::operacionesUsuarioSalidaFecha($empleadoAux->id,$desde,"");
                    $objDelaRespuesta->msj ="Operaciones desde ".$desde." hasta hoy";
                }
                if (!isset($ArrayDeParametros['desde']) && isset($ArrayDeParametros['hasta'])) {
                    $hasta= $ArrayDeParametros['hasta'];
                    if ($hasta== "") {
                        throw new Exception('Error: hasta no puede esta vacio');
                    }
                    $objDelaRespuesta->cantIngresos =empleado::operacionesUsuarioEntradaFecha($empleadoAux->id,"",$hasta);
                    $objDelaRespuesta->cantSalidas =empleado::operacionesUsuarioSalidaFecha($empleadoAux->id,"",$hasta);
                    $objDelaRespuesta->msj ="Operaciones desde el inicio de actividades hasta ".$hasta;
                }
                if (!isset($ArrayDeParametros['desde']) && !isset($ArrayDeParametros['hasta'])) {
                    $objDelaRespuesta->cantIngresos =empleado::operacionesUsuarioEntradaFecha($empleadoAux->id,"","");
                    $objDelaRespuesta->cantSalidas =empleado::operacionesUsuarioSalidaFecha($empleadoAux->id,"","");
                    $objDelaRespuesta->msj ="Operaciones desde el inicio de actividades hasta hoy";
                }
                return $response->withJson($objDelaRespuesta,200);
            }
            else{
                return $response->withJson("El emplado no existe ",206);
            }
        }
        else {
            return $response->withJson("Error: email en blanco ",404);
        }

    }

    public function loginEmpleado($request, $response, $args)
    {
        $ArrayDeParametros = $request->getParsedBody();
        $objDelaRespuesta= new stdclass();
        if (!empty($args)){
            $email = $args['email'];
        
            if ($empleadoAux = empleado::TraerEmpleadoEmail($email)){
                $objDelaRespuesta->empleado=$empleadoAux->nombre;
                if (isset($ArrayDeParametros['desde']) && isset($ArrayDeParametros['hasta'])) {
                    $desde= $ArrayDeParametros['desde'];
                    if ($desde== "") {
                        throw new Exception('Error: desde no puede esta vacio');
                    }
                    $hasta= $ArrayDeParametros['hasta'];
                    if ($hasta== "") {
                        throw new Exception('Error: hasta no puede esta vacio');
                    }
                    if ($desde > $hasta) {
                        throw new Exception('Error: desde no puede ser mayor que hasta');
                    }
                    $objDelaRespuesta->ingresos = historico::loginUsuarioFechas($empleadoAux->id,$desde,$hasta);
                }
                if (isset($ArrayDeParametros['desde']) && !isset($ArrayDeParametros['hasta'])) {
                    $desde= $ArrayDeParametros['desde'];
                    if ($desde== "") {
                        throw new Exception('Error: desde no puede esta vacio');
                    }
                    $objDelaRespuesta->ingresos = historico::loginUsuarioFechas($empleadoAux->id,$desde,"");
                }
                if (!isset($ArrayDeParametros['desde']) && isset($ArrayDeParametros['hasta'])) {
                    $hasta= $ArrayDeParametros['hasta'];
                    if ($hasta== "") {
                        throw new Exception('Error: hasta no puede esta vacio');
                    }
                    $objDelaRespuesta->ingresos = historico::loginUsuarioFechas($empleadoAux->id,"",$hasta);
                }
                if (!isset($ArrayDeParametros['desde']) && !isset($ArrayDeParametros['hasta'])) {
                    $objDelaRespuesta->ingresos = historico::loginUsuarioFechas($empleadoAux->id,"","");
                }
                
                return $response->withJson($objDelaRespuesta,200);
            }
            else{
                return $response->withJson("El emplado no existe ",206);
            }
        }
        else {
            return $response->withJson("Error: email en blanco ",404);
        }

    }



}
