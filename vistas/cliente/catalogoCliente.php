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
<!-- PARA HACER EL HOVER DE LA FOTO DE PERFIL -->
<link href="<?= $base_url ?>css/hover.css" media="all" rel="stylesheet" type="text/css" />

<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Catálogo de Usuarios</h1>
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
                  <div class="row">
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioUsuario" id="radioUsuarioCliente"
                           value="CLIENTE" checked>
                        <label class="form-check-label" for="radioUsuarioCliente">
                           CLIENTES
                        </label>
                     </div>
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioUsuario" id="radioUsuarioEmpleado"
                           value="EMPLEADO">
                        <label class="form-check-label" for="radioUsuarioEmpleado">
                           EMPLEADOS
                        </label>
                     </div>
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioUsuario" id="radioUsuarioCars"
                           value="RENTA CARS">
                        <label class="form-check-label" for="radioUsuarioCars">
                           RENTA CARS
                        </label>
                     </div>
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioUsuario" id="radioUsuarioInactivo"
                           value="INACTIVOS">
                        <label class="form-check-label" for="radioUsuarioInactivo">
                           INACTIVOS
                        </label>
                     </div>
                  </div>
               </div>
               <!-- /.card-header -->

               <div class="card-body">
                  <table id="tabla_cliente" class="table table-bordered table-striped">
                     <thead style="text-align: center;">
                        <tr>
                           <th>Foto de Perfil</th>
                           <th>Nombre</th>
                           <th>Correo</th>
                           <th>Célular</th>
                           <th>DUI</th>
                           <th>Acciones</th>
                           <th>Url Foto</th>
                           <th>Nivel</th>
                           <th>activo</th>
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
                     <h4 class="modal-title">Modificar Datos</h4>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <div class="row">
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Nombre de Cliente</label>
                              <div class="input-group">
                                 <input type="text" class="form-control" name="nombreCliente" id="nombreCliente">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Correo Electronico</label>
                              <div class="input-group">
                                 <input type="text" class="form-control" name="correo" id="correo" disabled>
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>

                     </div>
                     <div class="row">
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Dui</label>
                              <div class="input-group">
                                 <input type="text" class="form-control" id="dui" name="dui">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Célular</label>
                              <div class="input-group">
                                 <input type="text" class="form-control" id="celular" name="celular">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>

                     </div>
                     <div class="row">
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Contraseña</label>
                              <div class="input-group">
                                 <input type="password" class="form-control" name="password1" id="password1">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Repetir Contraseña</label>
                              <div class="input-group">
                                 <input type="password" class="form-control" name="password2" id="password2">
                              </div>
                              <!-- /.input group -->
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
                  <h4 class="modal-title">Documentos Personales</h4>
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

   <form id="formulario_perfil" name="formulario_perfil" enctype="multipart/form-data">
      <div class="modal fade" id="modal-perfil">
         <!-- Modal EDITAR-->
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                  <h4 class="modal-title">Selecciona una Foto</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <div class="col-sm-3">

                     </div>
                     <div class="col-sm-9">
                        <div class="form-group">
                           <div class="kv-avatar">
                              <div class="file-loading">
                                 <input id="foto" name="foto" type="file">
                              </div>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                  </div>
               </div>
               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="actualizarFotoPerfil" id="actualizarFotoPerfil" class="btn btn-info btn-sm"
                     style="color: white">Actualizar</button>
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
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.js"></script>
<script src="<?= $base_url ?>js/controladores/client/catalogo-cliente.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>