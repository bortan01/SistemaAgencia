<?php
session_start();
if (
   isset($_SESSION["activoA"]) &&
   isset($_SESSION["nivelA"]) &&
   $_SESSION["nivelA"] == 'ADMINISTRADOR'
) {
   echo ('<p style="padding-left: 265px;" >LOGUEADO, ROL ' . $_SESSION['nivelA'] . '</p>');
} else {
   header('Location:' . $base_url);
}