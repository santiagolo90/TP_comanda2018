<?php
include_once "AccesoDatos.php";
class historico
{
    public $id;
    public $fecha;
    public $hora;
    public $idEmpleado;

    
    public static function registrarLogin($auxID,$auxFecha,$auxHora)
	{
            $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
            $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into historial_login (fecha,hora,idEmpleado)values(:fecha,:hora,:idEmpleado)");
            $consulta->bindValue(':fecha',$auxFecha, PDO::PARAM_STR);
            $consulta->bindValue(':hora',$auxHora, PDO::PARAM_STR);
            $consulta->bindValue(':idEmpleado', $auxID, PDO::PARAM_INT);
            $consulta->execute();	
            return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public static function loginUsuario($auxID)
    {
		$objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT fecha,hora FROM historial_login WHERE idEmpleado = $auxID");
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        return $consulta->fetchAll();
    }
/*
    public static function traerTodosLogin()
    {
		$objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT id,idEmpleado,fecha,hora FROM historial_login");
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        $consulta->execute();
        return $consulta->fetchAll();
    }
*/
    public static function traerTodosLogin()
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select * from historial_login");
            $consulta->execute();	
            if($consulta->rowCount() == 0){
                return false;   
            }			
			return $consulta->fetchAll(PDO::FETCH_CLASS, "historico");		
    }

    public static function loginUsuarioFechas($auxID,$desde,$hasta)
    {
        $objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso();
        if ($hasta == ""&& $desde !="") {
            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT fecha,hora FROM historial_login WHERE idEmpleado = '$auxID' AND fecha >=:desde");
            $consulta->bindValue(":desde", $desde, PDO::PARAM_STR);
        }
        if ($desde ==""&& $hasta !="") {
            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT fecha,hora FROM historial_login WHERE idEmpleado = '$auxID' AND fecha <=:hasta ");
            $consulta->bindValue(":hasta", $hasta, PDO::PARAM_STR);
        }
        if ($desde !="" && $hasta !="") {
            $consulta = $objetoAccesoDatos->RetornarConsulta("SELECT fecha,hora FROM historial_login WHERE idEmpleado = '$auxID' AND fecha BETWEEN :desde AND :hasta ");
            $consulta->bindValue(":desde", $desde, PDO::PARAM_STR);
            $consulta->bindValue(":hasta", $hasta, PDO::PARAM_STR);
        }
        if ($desde =="" && $hasta =="") {
            return historico::loginUsuario($auxID);
        }  
        $consulta->execute();
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        return $consulta->fetchAll();
	}

}
?>