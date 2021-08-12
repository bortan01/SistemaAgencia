<!-- INICIALIZACION -->
<?php
include_once '../../config/parametros.php';
include_once '../session/isRentaCard.php';
include_once '../../plantillas/cabecera.php';
?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" rel="stylesheet">
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link href="<?= $base_url ?>css/miniatura-tabla.css" media="all" rel="stylesheet" type="text/css" />
<!-- PARA HACER EL HOVER DE LA FOTO DE PERFIL -->
<link href="<?= $base_url ?>css/hover.css" media="all" rel="stylesheet" type="text/css" />

<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Actualizar Mis Información</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="../../home.php">Inicio</a></li>
                  <li class="breadcrumb-item active">Registrar Usuario</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <section class="content">
      <form id="miFormularioCliente" enctype="multipart/form-data" name="miFormularioCliente" role="form">
         <div class="row">
            <div class="col-md-12">
               <div class="overlay-wrapper">
                  <div id="loadingCliente" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                     <div class="text-bold pt-2">Cargando...
                     </div>
                  </div>
                  <!-- START timeline item -->
                  <div class="timeline">
                     <!-- timeline item -->
                     <div>
                        <i class="fas fa-users bg-blue"></i>
                        <div class="timeline-item">
                           <h3 class="timeline-header"><a href="#">Datos Personales</a></h3>
                           <div class="timeline-body">
                              <div class="row">
                                 <div class="col-sm-9">
                                    <div class="row">
                                       <div class="col-sm-6">
                                          <div class="form-group">
                                             <label>Nombre de Cliente</label>
                                             <div class="input-group">
                                                <input type="text" class="form-control" name="nombreCliente"
                                                   placeholder="Digite Nombre" id="nombreCliente">
                                             </div>
                                             <!-- /.input group -->
                                          </div>
                                       </div>
                                       <div class="col-sm-6">
                                          <div class="form-group">
                                             <label>Correo Electronico</label>
                                             <div class="input-group">
                                                <input placeholder="Digite Correo Electronico" type="text"
                                                   class="form-control" disabled='true' name="correo" id="correo">
                                             </div>
                                             <!-- /.input group -->
                                          </div>
                                       </div>
                                    </div>
                                    <div class="row">
                                       <div class="col-sm-6">
                                          <div class="form-group">
                                             <label>Dui (opcional)</label>
                                             <div class="input-group">
                                                <input placeholder="12345678-9" type="text" class="form-control"
                                                   id="dui" name="dui">
                                             </div>
                                             <!-- /.input group -->
                                          </div>
                                       </div>
                                       <div class="col-sm-6">
                                          <div class="form-group">
                                             <label>Célular (opcional)</label>
                                             <div class="input-group">
                                                <input placeholder="(+503)8765-4321" type="text" class="form-control"
                                                   id="celular" name="celular">
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
                                                <input placeholder="Digite Contraseña" type="password"
                                                   class="form-control" name="password1" id="password1">
                                             </div>
                                             <!-- /.input group -->
                                          </div>
                                       </div>
                                       <div class="col-sm-6">
                                          <div class="form-group">
                                             <label>Repetir Contraseña</label>
                                             <div class="input-group">
                                                <input type="password" placeholder="Repita Contraseña"
                                                   class="form-control" name="password2" id="password2">
                                             </div>
                                             <!-- /.input group -->
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="col-sm-3 d-flex justify-content-center" style="margin: auto;">
                                    <div id="conteinerImagen" class="form-group">
                                       <div class="hovereffect">
                                          <img id="currentPhoto" class="img-responsive rounded" src="" alt="">
                                          <div class="my-overlay">
                                             <p>
                                                <a name="camara" href="#">
                                                   <i class="fas fa-camera" style="color: white;"></i>
                                                </a>
                                             </p>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <br> <br>
                              <div class="timeline-footer" style="text-align: right;">
                                 <button name="btnActualizar" id="btnActualizar" class="btn btn-info btn-sm"
                                    style="color: white">Actualizar</button>
                                 <button class="btn btn-danger btn-sm" style="color: white">Cancelar</button>
                              </div>
                           </div>
                        </div>
                        <!-- END timeline item -->
                     </div>
                     <!-- END timeline item -->
                  </div>
               </div>
            </div>
         </div>
      </form>
   </section>
</div>

<form id="formulario_perfil" name="formulario_perfil" enctype="multipart/form-data">
   <div class="modal fade" id="modal-perfil">
      <!-- Modal EDITAR-->
      <div class="modal-dialog" style="max-width: 35%;">
         <div class="modal-content">
            <div class="overlay-wrapper">
               <div id="loadingFotoPerfil" class="overlay">
                  <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
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
                                 <input style="width: 180px;" id="foto" name="foto" type="file">
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
         </div>
         <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
   </div>
   <!-- End Modal EDITAR-->
</form>
<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.js"></script>
<script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>
<script src="<?= $base_url ?>js/controladores/client/updateInfo.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>