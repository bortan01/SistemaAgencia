<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../../vistas/session/isEmpleado.php';
include_once '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>

<link href="http://localhost/Plantillas/SistemaAgencia/css/miniatura-tabla.css" media="all" rel="stylesheet"
   type="text/css" />

<div class="wrapper">
   <!-- Content Wrapper. Contains page content -->
   <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
         <div class="container-fluid">
            <div class="row mb-2">
               <div class="col-sm-6">
                  <h1>Contactos</h1>
               </div>
               <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-right">
                     <li class="breadcrumb-item"><a href="#">Home</a></li>
                     <li class="breadcrumb-item active">Contactos</li>
                  </ol>
               </div>
            </div>
         </div><!-- /.container-fluid -->
      </section>

      <!-- Main content -->
      <section class="content">







         <a href="#">nombre
            <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
               <div class="ocultar card bg-light">
                  <div class="card-body">
                     <div class="row">
                        <div class="col-7">
                           <p class="text-muted text-sm">
                              <b>Nombre de Contacto</b>
                              Pedro Andres Gomez Palacions
                           </p>
                           <ul class="ml-4 mb-0 fa-ul text-muted">
                              <li class="small">
                                 <span class="fa-li">
                                    <i class="fas fa-lg fa-mail-bulk"> </i>
                                 </span> correo@correo.com
                              </li>
                              <li class="small">
                                 <span class="fa-li">
                                    <i class="fas fa-lg fa-phone"></i>
                                 </span> Phone #: + 800 - 12 12 23 52
                              </li>
                           </ul>
                        </div>
                        <div class="col-5 text-center">
                           <img src="http://localhost/API-REST-PHP/uploads/2129352020102839.jpg" alt=""
                              class="img-fluid">
                        </div>
                     </div>
                  </div>
                  <div class="card-footer"></div>
               </div>
            </div>
         </a>




      </section>
      <!-- /.content -->
   </div>
   <!-- /.content-wrapper -->
</div>
<!-- ./wrapper -->
<!-- jQuery -->
<?php
include_once '../../plantillas/footer.php';
?>