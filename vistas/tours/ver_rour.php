<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" rel="stylesheet">
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link href="<?= $base_url ?>css/miniatura-tabla.css" media="all" rel="stylesheet" type="text/css" />

<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Tours Registrados</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="../../home.php">Inicio</a></li>
                  <li class="breadcrumb-item active">Turs Registrados</li>
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
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <table id="tabla_servicios" class="table table-bordered table-striped">
                     <thead style="text-align: center;">
                        <tr>
                           <th>Nombre</th>
                           <th>Precio ($)</th>
                           <th>Fecha de Salida</th>
                           <th>Tipo de Tour</th>
                           <th>Acciones</th>
                           <th>id</th>

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
   <form id="formularioEditar" name="formularioEditar" role="form">
      <!-- Modal EDITAR-->
      <div class="modal fade" id="modal-editar">
         <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

               <div class="overlay-wrapper">
                  <div id="loadingActualizar" class="overlay">
                     <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                     <div class="text-bold pt-2">Cargando...
                     </div>
                  </div>
                  <div class="modal-header">
                     <h4 class="modal-title">Modificar Sitio</h4>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <div class="row">
                        <div class="col-sm-4">
                           <div class="form-group">
                              <label>Nombre del sitio turístico</label>
                              <div class="input-group">
                                 <input type="text" class="form-control" name="nombre" id="nombre">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-4">
                           <div class="form-group">
                              <label>Precio</label>
                              <div class="input-group">
                                 <input type="number" min="0" class=" form-control" name="precio_sitio"
                                    id="precio_sitio">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>

                        <div class="col-sm-4">
                           <div class="form-group">
                              <label>Tipo</label>
                              <select name="ComboTipo" id="ComboTipo"
                                 class="select2 select2-hidden-accessible form-control"
                                 data-placeholder="Seleccione el tipo" style="width: 100%;">
                              </select>
                           </div>
                        </div>
                     </div>
                     <div class="row">
                        <div class="col-sm-5">
                           <!-- text input -->
                           <div class="form-group">
                              <label>Coordenadas</label>
                              <div class="input-group">
                                 <input disabled type="text" class="form-control" name="coordenadas" id="coordenadas">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-1">
                           <br>
                           <span class="input-group-btn">
                              <button type="button" class="btn btn-success btn-add" name="btn-mapa"
                                 style="margin-top: 10px; width: 100%;" id="btn-mapa">
                                 <i class="fas fa-globe" style="color: white"></i>
                              </button>
                           </span>
                        </div>
                        <div class="col-sm-6">
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
                           <div class="form-group">
                              <label>Descripcion del Servicio</label>
                              <textarea name="descripcion" id="descripcion" class="form-control" rows="3"
                                 placeholder="Digitar aquí ..."></textarea>
                           </div>
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
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>js/controladores/turs/locales.min.js"></script>
<script src="<?= $base_url ?>js/controladores/turs/ver-tour.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>