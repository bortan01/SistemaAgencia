<?php
session_start();

switch ($_POST['action']) {
   case 'start':
      $_SESSION["activoA"] = true;
      $_SESSION["nivelA"] = $_POST["nivel"];
      break;
   case 'getActivo':
      echo json_encode($_SESSION["activo"]);
      break;
   case 'GetId':
      echo json_encode($_SESSION["id_cliente"]);
      break;
   case 'getNombre':
      echo json_encode($_SESSION["nombre"]);
      break;
   case 'getCorreo':
      echo json_encode($_SESSION["correo"]);
      break;
   case 'getNivel':
      echo json_encode($_SESSION["nivel"]);
      break;
   case 'getCelular':
      echo json_encode($_SESSION["celular"]);
      break;
   case 'getDui':
      echo json_encode($_SESSION["dui"]);
      break;
   case 'getFoto':
      echo json_encode($_SESSION["foto"]);
      break;
   case 'getUid':
      echo json_encode($_SESSION["user_uuid"]);
      break;
   default:
      break;
}