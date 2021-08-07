<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../session/isEmpleado.php';
?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<?php
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';

?>

<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Actualización de Envió</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Modificación de Encomienda</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-12">


            <div class="card">
               <!--para filtrar los productos activos e inactivos-->
               <div class="card-header">
                  <div class="row">
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioEnvio" id="radioEnviado" value="Enviado"
                           checked>
                        <label class="form-check-label" for="radioEncomiendaEnviadas">
                           ENCOMIENDAS ENVIADAS
                        </label>
                     </div>
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioEnvio" id="radioEntregado"
                           value="Entregado">
                        <label class="form-check-label" for="radioEncomiendaEntregadas">
                           ENCOMIENDAS ENTREGADAS
                        </label>
                     </div>
                  </div>
               </div>
               <!-- /.card-header -->
               <!--*******************************fin de filtrar esos productos***-->
               <div class="card-header">
                  <h3 class="card-title">Datos de la Encomienda</h3>
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <div id="" class="dataTables_wrapper dt-bootstrap4">
                     <div class="row">
                        <div class="col-sm-12">
                           <table id="tabla_actu-envio" class="table table-bordered table-striped">
                              <thead style="text-align: center;">
                                 <tr>
                                    <th>Nombre</th>
                                    <th>Ciudad de origen</th>
                                    <th>Código postal</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                    <th>estado</th>
                                 </tr>
                              </thead>
                              <!-- /.inicio de loading -->
                              <div class="overlay-wrapper">
                                 <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

                                    <div class="text-bold pt-2">Cargando...
                                    </div>
                                 </div>
                                 <tbody id="tableBody" style="text-align: center;">
                                 </tbody>
                              </div>
                              <!-- /.fin de loading -->

                           </table>
                        </div>
                     </div>

                  </div>
               </div>
               <!-- /.card-body -->
            </div>
            <!-- /.card -->
         </div>
         <!-- /.col -->
      </div>
      <!-- /.row -->
   </section>
   <!-- /.content -->
</div>


<?php
  include_once '../../plantillas/footer.php';
?>
<!-- SCRIPT ADICIONALES -->
<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/actu-envio.js"></script>
<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>


<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>