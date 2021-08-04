<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" rel="stylesheet">
<style>
a.text-danger:focus,
a.text-danger:hover {
   /* ROJO */
   color: #dc3545 !important;
}

a.text-primary:focus,
a.text-primary:hover {
   /* AZUUL */
   color: #007bff !important;
}

a.text-warning:focus,
a.text-warning:hover {
   /* AMARILLO */
   color: #ffc107 !important;
}

a.text-success:focus,
a.text-success:hover {
   /* VERDE */
   color: #28a745 !important;
}
</style>
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="wrapper">
   <!-- Content Wrapper. Contains page content -->
   <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
         <div class="container-fluid">
            <div class="row mb-2">
               <div class="col-sm-8">
                  <h1 id="titulo"></h1>
               </div>
               <div class="col-sm-4">
                  <ol class="breadcrumb float-sm-right">
                     <li class="breadcrumb-item"><a href="../../home.php">Inicio</a>
                     </li>
                     <li class="breadcrumb-item active">Itinerario</li>
                  </ol>
               </div>
            </div>
         </div><!-- /.container-fluid -->
      </section>
      <!-- Main content -->
      <section class="content">
         <div class="container-fluid">
            <div class="overlay-wrapper">
               <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-3" style="position: sticky;">
                     <div class="sticky-top mb-3">

                        <!-- .card -->
                        <div class="card">
                           <div class="card-header">
                              <h4 class="card-title">
                                 Actividades</h4>
                           </div>
                           <div class="card-body">
                              <!-- the events -->
                              <div id="external-events">

                                 <div class="checkbox">
                                    <label for="drop-remove">
                                       <input type="checkbox" id="drop-remove" checked="checked" style="display: none;">
                                       <!--remove external-eventsafter drop-->
                                    </label>
                                 </div>
                              </div>
                           </div>
                           <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                        <div class="card">
                           <div class="card-header">
                              <h3 class="card-title">Otras Actividades</h3>
                           </div>
                           <div class="card-body">
                              <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                                 <!--<button type="button" id="color-chooser-btn" class="btn btn-info btn-block dropdown-toggle" data-toggle="dropdown">Color <span class="caret"></span></button>-->
                                 <ul class="fc-color-picker" id="color-chooser">
                                    <li><a class="text-primary" href="#"><i class="fas fa-square"></i></a>
                                    </li>
                                    <li><a class="text-warning" href="#"><i class="fas fa-square"></i></a>
                                    </li>
                                    <li><a class="text-danger" href="#"><i class="fas fa-square"></i></a>
                                    </li>
                                 </ul>
                              </div>
                              <!-- /btn-group -->
                              <div class="input-group">
                                 <input id="new-event" type="text" class="form-control"
                                    placeholder="Nombre de la actividad">

                                 <div class="input-group-append">
                                    <button id="add-new-event" type="button" class="btn btn-primary">Agregar</button>
                                 </div>
                                 <!-- /btn-group -->
                              </div>
                              <!-- /input-group -->
                              <br>
                              <div class="btn-group" style="width: 100%;">

                                 <button style="margin: 5px" type="submit" class="btn btn-danger float-right">Cancelar
                                 </button>
                                 <button style="margin: 5px" id="btnGuardar" type="submit"
                                    class="btn btn-info float-left">Guardar
                                 </button>
                              </div>
                              <!-- /btn-group -->
                           </div>

                           <div class="card-footer">
                              <div class="btn-group" style="width: 100%;">


                                 <button style="margin: 5px" id="imprimir" type="submit"
                                    class="btn btn-info float-left">Imprimir</button>


                              </div>
                           </div>
                        </div>
                        <!-- /.card -->

                     </div>
                  </div>
                  <!-- /.col -->
                  <div class="col-md-9">
                     <div class="card card-primary">
                        <div class="card-body p-0">
                           <!-- THE CALENDAR -->
                           <div id="calendar"></div>
                        </div>
                        <!-- /.card-body -->
                     </div>
                     <!-- /.card -->
                  </div>
                  <!-- /.col -->
               </div>
               <!-- /.row -->
            </div><!-- /overlay-wrapper -->
         </div><!-- /.container-fluid -->
      </section>
      <!-- /.content -->
   </div>
   <!-- /.content-wrapper -->

</div>
<!-- ./wrapper -->
<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script src="../../plugins/moment/locale/es.js"></script>
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>js/controladores/turs/itinerario.js"></script>

<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>