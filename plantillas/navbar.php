</head>

<body class="hold-transition sidebar-mini layout-fixed">
   <!-- Site wrapper -->
   <div class="wrapper">
      <!-- Main Sidebar Container -->
      <!-- Navbar -->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
         <!-- Left navbar links -->
         <ul class="navbar-nav">
            <li class="nav-item">
               <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
         </ul>
         <!-- Right navbar links -->
         <ul class="navbar-nav ml-auto">
            <!-- Messages Dropdown Menu -->
            <?php  if ($_SESSION["nivelA"] == 'ADMINISTRADOR' || $_SESSION["nivelA"] == 'EMPLEADO') : ?>
            <li class="nav-item dropdown">
               <a class="nav-link" href="<?= $base_url ?>vistas/chat/messenger.php">
                  <i class="far fa-comments"></i>
                  <span id="mensajesPendientes" class="badge badge-danger navbar-badge">0</span>
               </a>
            </li>
            <?php endif; ?>
            <!-- Notifications Dropdown Menu -->
            <li class="nav-item dropdown">
               <a class="nav-link" data-toggle="dropdown" href="#">
                  <i class="far fa-bell"></i>
                  <span id="headerNotificatinos" class="badge badge-warning navbar-badge">0</span>
               </a>
               <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                  <span id="currentNotifications" class="dropdown-item dropdown-header">0 Notificacion(es)</span>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                     <i class="fas fa-map-marked-alt mr-2">
                     </i> <span id="notificationPaquete" name="notificationPaquete">0 Cotizacion(es) de
                        paquete(s)</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                     <i class="fas fa-car mr-2"></i><span id="notificationVehiculo" name="notificationVehiculo">0
                        Cotizacion(es) de vehículo(s)</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" class="dropdown-item">
                     <i class="fas fa-plane mr-2"></i> <span id="notificationVuelo" name="notificationVuelo">0
                        Cotizacion(es) de vuelo(s)</span>
                  </a>
                  <a href="#" class="dropdown-item">
                     <i class="fa fa-umbrella-beach mr-2"></i><span id="notificationTours" name="notificationTours">0
                        reserva(s) de tour(s)</span>
                  </a>
               </div>
            </li>
            <li>
               <a id="logout" style="cursor: pointer;" class="nav-link">
                  Cerrar Sesion <i class="fas fa-sign-out-alt"></i>
               </a>
            </li>
         </ul>
      </nav>
      <!-- /.navbar -->