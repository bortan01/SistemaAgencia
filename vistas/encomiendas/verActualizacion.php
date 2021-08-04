<!--para las tablas que cargan en este archivo-->
<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<?php
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>


<!--****************fin****************-->
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Actualizaciones de Envió</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">Actualización de Envió</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content" style="margin-top: 7px;">
      <div class="container-fluid">

         <!-- Timelime example  -->
         <div class="row">
            <div class="col-md-12">
               <!-- The time line -->
               <div class="timeline">

                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-address-card bg-gradient-blue"></i>
                     <div class="timeline-item">
                        <span class="time"><i class="fas fa-address-book"></i>Información de encomienda</span>
                        <h3 class="timeline-header"><a href="#">Detalle de encomienda</a></h3>
                        <div class="timeline-body" style="margin-top: 15px;">
                           <!--para los datos de los clientes-->
                           <div class="row">
                              <div class="col-lg-4">
                                 <label>Cliente</label>
                                 <input type="text" name="cliente" id="cliente" class="form-control" disabled="true">
                              </div>
                              <div class="col-lg-4">
                                 <label>fecha de envío</label>
                                 <input type="text" name="fecha" id="fecha" class="form-control" disabled="true">
                              </div>
                              <div class="col-lg-4">
                                 <label>Estado</label>
                                 <input type="text" name="estado" id="estado" class="form-control" disabled="true">
                              </div>


                           </div>

                           <!--fin de detalle del cliente-->

                        </div>
                        <div class="col-lg-2"></div>
                     </div>
                  </div>


                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-comments bg-gradient-blue"></i>
                     <div class="timeline-item">
                        <span class="time"><i class="fas fa-address-book"></i>Actualizaciones registradas</span>
                        <h3 class="timeline-header"><a href="#">Actualizaciones de envío</a></h3>
                        <div class="timeline-body" style="margin-top: 15px;">
                           <div class="row">
                              <div class="col-lg-2"></div>
                              <div class="col-lg-8">
                                 <div class="form-group">
                                    <table id="tabla_ver" class="table table-bordered table-striped">
                                       <thead style="text-align: center;">
                                          <tr>
                                             <th>Fecha</th>
                                             <th>Hora</th>
                                             <th>lugar</th>
                                             <th>Descripción</th>
                                          </tr>
                                       </thead>
                                       <!-- /.inicio de loading -->
                                       <div class="overlay-wrapper">
                                          <div id="loading" class="overlay"><i
                                                class="fas fa-3x fa-sync-alt fa-spin"></i>

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
                              <div class="col-lg-2"></div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- END timeline item -->

                  <!-- timeline time label -->
                  <div class="time-label">
                     <span class="bg-green">Actualizaciones de Envió</span>
                  </div>
                  <!-- /.timeline-label -->
               </div>
            </div>
            <!-- END timeline item -->





         </div>
      </div>
      <!-- /.col -->
</div>
</div>
<!-- /.timeline -->
</section>
<!-- /.content -->
</div>


<?php
  include_once '../../plantillas/footer.php';
?>
<script type="text/javascript">
$('#loadingActualizar').hide();
</script>
<!-- SCRIPT ADICIONALES -->
<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/verEnvio.js"></script>
<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>


<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>