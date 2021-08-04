 <?php
   include_once './config/parametros.php';
   // include_once './vistas/session/isAdmin.php'; -> TENDRA ACCESO EL ADMINISTRADOR
   // include_once './vistas/session/isEmpleado.php'; -> TENDRA ACCESO EL ADMINISTRADOR, EMPLEADO
   // include_once './vistas/session/isRentaCard.php'; -> TENDRA ACCESO EL ADMINISTRADOR, EMPLEADO, RENT CARD
   include_once './plantillas/cabecera.php';
   include_once  './plantillas/navbar.php';
   include_once './plantillas/barra_lateral.php';
   ?>
 <!-- Content Wrapper. Contains page content -->
 <div id="contenido_principal">
    <div class="content-wrapper" style="min-height: 100;">
       <!-- Main content -->
       <section class="content">
          <div class="container-fluid">
             <!-- Small boxes (Stat box) -->
             <div class="row">
                <img style="width: 100%; height: 100%;" src="img/fondo.jpg" alt="imagen de fondo">
             </div> <!-- /.cierre row -->
          </div><!-- /.container-fluid -->
       </section>
       <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
 </div>
 <?php
   include_once './plantillas/footer.php';
   ?>