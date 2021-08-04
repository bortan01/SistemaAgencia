<?php
session_start();

switch ($_POST['action']) {
   case 'logout':
      session_destroy();
      break;
   default:
      break;
}