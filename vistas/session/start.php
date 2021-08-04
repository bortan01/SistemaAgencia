<?php
session_start();

switch ($_POST['action']) {
   case 'start':
      $_SESSION["activoA"] = true;
      $_SESSION["nivelA"] = $_POST["nivel"];
      break;
}