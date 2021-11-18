<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Backup / Restaurar</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="../../home.php">Inicio</a></li>
                  <li class="breadcrumb-item active">Backup / Restaurar </li>
                  <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                     id="botonAyudaRegistroUsuarios"> <i class="fas fa-question"></i></button>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <form id="miFormularioCliente" enctype="multipart/form-data" name="miFormularioCliente" role="form">
         <div class="row">
            <!-- <div class="offset-md-1"></div> -->
            <div class="col-md-12">
               <!-- START timeline item -->
               <div class="timeline">
                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-save bg-blue"></i>
                     <div class="timeline-item">
                        <h3 class="timeline-header"><a href="#">Descargar Backup</a></h3>
                        <div class="timeline-body">
                           <button id="btn-backup" type="button" class="btn btn-primary btn-lg btn-block">Descargar
                              Backup</button>
                        </div>
                     </div>
                  </div>
                  <!-- END timeline item -->
                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-sync bg-red"></i>
                     <div class="timeline-item">

                        <h3 class="timeline-header no-border">
                           <a href="#">Restaurar Backup</a>
                        </h3>
                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-sm-12">
                                 <div class="card-body">
                                    <div class="file-loading">
                                       <input id="sqlFile" name="sqlFile" type="file">
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="timeline-footer" style="text-align: right;">
                        </div>
                     </div>
                  </div>
                  <!-- END timeline item -->
               </div>
               <!-- END timeline item -->

            </div>
         </div>
         <!-- END timeline item -->
      </form>
   </section>
</div>
<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<!-- EN EL CONTROLADOR ESTA LA LOGICA DE ESTA PANTALLA -->
<script src="<?= $base_url ?>js/controladores/client/backup-restore.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>