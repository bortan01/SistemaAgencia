<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all" rel="stylesheet">
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link rel=" stylesheet" type="text/css" href="<?= $base_url ?>plugins/asiento-bus/css/jquery.seat-charts.css">
<link rel=" stylesheet" type="text/css" href="<?= $base_url ?>plugins/asiento-bus/css/styleAdmin.css">
<link href="<?= $base_url ?>css/miniatura-tabla.css" media="all" rel="stylesheet" type="text/css" />
<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Servicios disponibles</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="../../home.php">Inicio</a></li>
                  <li class="breadcrumb-item active">Servicios disponibles</li>
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
               <div class="card-header">
                  <h3 class="card-title">Servicios</h3>
                  <!-- <button id="print" class="Container">imprimir</button>-->
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <table id="tabla_servicios" class="table table-bordered table-striped">
                     <thead style="text-align: center;">
                        <tr id="cabeceraTabla">
                           <th>Tipo del Servicio</th>
                           <th>Nombre</th>
                           <th>Costo ($)</th>
                           <th>Contacto</th>
                           <th>Descripción</th>
                           <th>Acciones</th>

                        </tr>
                     </thead>
                     <div class="overlay-wrapper">
                        <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

                           <div class="text-bold pt-2">Cargando...
                           </div>
                        </div>
                        <tbody id="tableBody" style="text-align: center;">
                        </tbody>
                     </div>

                  </table>
               </div>
               <!-- /.card-body -->
            </div>
         </div>
         <!-- /.col -->
      </div>
      <!-- /.row -->
   </section>
   <!-- /.content -->
   <form id="miFormulario" name="miFormulario" role="form">
      <!-- Modal EDITAR-->
      <div class="modal fade" id="modal-editar">
         <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">

               <div class="overlay-wrapper">
                  <div id="loadingActualizar" class="overlay">
                     <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                     <div class="text-bold pt-2">Cargando...
                     </div>
                  </div>
                  <div class="modal-header">
                     <h4 class="modal-title">Modificar Servicio</h4>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <div class="row">
                        <div class="col-sm-3">
                           <div class="form-group">
                              <label>Nombre de Servicio</label>
                              <div class="input-group">
                                 <input id="nombre" name="nombre" type="text" class="form-control">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-3">
                           <div class="form-group">
                              <label>Costo promedio</label>
                              <div class="input-group">
                                 <input id="costos_defecto" name="costos_defecto" type="number" class="form-control">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-3">
                           <div class="form-group">
                              <label>Tipo de Servicio</label>
                              <select name="tipo_servicio" id="tipo_servicio"
                                 class="select2 select2-hidden-accessible form-control float-righ"
                                 data-placeholder="Seleccione el tipo" style="width: 100%;" data-select2-id="7"
                                 tabindex="-1" aria-hidden="true">
                              </select>
                           </div>
                        </div>
                        <div class="col-sm-3">
                           <div class="form-group multiple-form-group input-group">
                              <label>Contacto</label>

                              <div class="input-group">
                                 <select name="contacto_servicio" id="contacto_servicio"
                                    class="select2 select2-hidden-accessible form-control"
                                    data-placeholder="Seleccione el tipo" style="width: 100%;">
                                 </select>
                              </div>
                           </div>
                        </div>

                     </div>
                     <div class="row">
                        <div class="col-sm-12">
                           <!-- text input -->
                           <div class="form-group">
                              <label>Descripcion del Servicio</label>
                              <textarea name="descripcion_servicio" id="descripcion_servicio" class="form-control"
                                 rows="3" placeholder="Digitar aquí ..."></textarea>
                           </div>
                        </div>
                     </div>
                     <div class="row" id="configuracionAsientos">
                        <div class="col-sm-3">
                           <div class="form-group">
                              <label>numero de filas </label>
                              <div class="input-group">
                                 <input id="numero_filas" name="numero_filas" type="number" min="2" value="2" step="1"
                                    max="30" class="form-control">
                              </div>
                           </div>
                        </div>
                        <div class="col-sm-3">
                           <div class="form-group">
                              <label>Asientos lado derecho</label>
                              <div class="input-group">
                                 <input id="asientos_derecho" name="asientos_derecho" type="number" min="2" max="7"
                                    value="2" step="1" class="form-control">
                              </div>
                           </div>
                        </div>
                        <div class="col-sm-3">
                           <div class="form-group">
                              <label>Asientos lado izquierdo</label>
                              <div class="input-group">
                                 <input id="asientos_izquierdo" name="asientos_izquierdo" type="number" min="2" max="7"
                                    value="2" step="1" class="form-control">
                              </div>
                           </div>
                        </div>
                        <div class="col-sm-3">
                           <!-- radio -->
                           <label>Agregar fila trasera</label>
                           <div class="form-group clearfix">
                              <div class="icheck-success d-inline" style="margin-left: 70px;">
                                 <input type="checkbox" value="si" id="checkTrasero">
                                 <label for="checkTrasero">
                                 </label>
                              </div>
                           </div>
                        </div>

                     </div>
                     <div class="row" id="dibujoAsientos">
                        <!-- <div class="offset-md-1"></div> -->
                        <div class="col-sm-7">
                           <div id="seat-map" class="float-right">
                              <div class="front-indicator">Frontal</div>
                           </div>
                        </div>
                        <div class="col-sm-4 flex flex-column-reverse flex-sm-column">
                           <div id="legend"></div>
                        </div>

                     </div>
                  </div>
                  <div class="modal-footer justify-content-between">
                     <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                     <button name="btnActualizar" id="btnActualizar" class="btn btn-info btn-sm"
                        style="color: white">Actualizar</button>
                  </div>
               </div>
            </div>
            <!-- /.modal-content -->
         </div>
         <!-- /.modal-dialog -->
      </div>
      <!-- End Modal EDITAR-->
   </form>

   <form id="formularioImagenes" name="formularioImagenes" enctype="multipart/form-data">
      <!-- Modal EDITAR-->
      <div class="modal fade" id="modal-imagenes">
         <div class="modal-dialog modal-xl">
            <div class="modal-content">
               <div class="modal-header">
                  <h4 class="modal-title">Editar Imagenes</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="file-loading">
                     <input id="kv-explorer" name="foto" type="file" multiple>
                  </div>
               </div>
            </div>
            <!-- /.modal-content -->
         </div>
         <!-- /.modal-dialog -->
      </div>
      <!-- End Modal EDITAR-->
   </form>


   <?php include_once '../contactos/modal-verContacto.php'; ?>

</div>

<?php include_once '../../plantillas/footer.php'; ?>

<!-- SCRIPT ADICIONALES AQUI -->
<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.js"></script>
<script src="<?= $base_url ?>plugins/asiento-bus/js/jquery.seat-charts.js"></script>
<script src="<?= $base_url ?>plugins/asiento-bus/js/admin-configuracion.js"></script>
<script src="<?= $base_url ?>js/controladores/servicios/ver-servicios.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>