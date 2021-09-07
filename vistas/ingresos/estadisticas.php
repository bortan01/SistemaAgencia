<!-- INICIALIZACION -->
<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" rel="stylesheet"
   type="text/css" />
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>

<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-9">
               <h1 id="titulo">Estadísticas</h1>
            </div>
            <div class="col-sm-3">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Estadísticas</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>
   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-md-12">
            <div class="overlay-wrapper">
               <div id="loadingEstadisticas" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="timeline">
                  <!-- timeline item -->
                  <div>
                     <i class="fa fa-signal bg-blue"></i>
                     <div class="timeline-item">
                        <!--<span class="time"><i class="fas fa-clock"></i> 12:05</span>-->
                        <h3 class="timeline-header"><a href="#">Ingresos</a></h3>

                        <div class="timeline-body">
                           <div class="row">

                              <canvas id="myChart" style="position: relative; height: 40vh; width: 80vw"></canvas>

                           </div>
                        </div>

                     </div>
                  </div>
                  <!-- END timeline item -->
               </div>
            </div>
         </div>
      </div>
   </section>
</div>
<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.js"></script>
<script src="<?= $base_url ?>js/controladores/ingresos/char.js"></script>
<script src="<?= $base_url ?>js/controladores/ingresos/estadisticas.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>