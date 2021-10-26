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
               <h1>Actualizar Costo de Envio</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="../../home.php">Inicio</a></li>
                  <li class="breadcrumb-item active">Actualizar Costo de Envio</li>
                  <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                     id="botonAyudaMostrarSitios"> <i class="fas fa-question"></i></button>
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
                  <h3 class="card-title">Actualizar Costo de Envio</h3>
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <table id="tabla_servicios" class="table table-bordered table-striped">
                     <thead style="text-align: center;">
                        <tr>
                           <th>Departamento</th>
                           <th>Municipio</th>
                           <th>Costo de Envio ($)</th>
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
   <!-- Modal EDITAR-->
   <div class="modal fade" id="modal-editar">
      <form id="formularioEditar" name="formularioEditar" role="form">
         <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

               <div class="overlay-wrapper">
                  <div id="loadingActualizar" class="overlay">
                     <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                     <div class="text-bold pt-2">Cargando...
                     </div>
                  </div>
                  <div class="modal-header">
                     <h4 class="modal-title">Modificar Costo de Envio</h4>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <div class="row">
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Municipio</label>
                              <div class="input-group">
                                 <input disabled="true" type="text" class="form-control" name="nombre" id="nombre">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Costo de Envio ($)</label>
                              <div class="input-group">
                                 <input type="number" min="0" class=" form-control" name="costo_agregado"
                                    id="costo_agregado">
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
      </form>
   </div>
   <!-- End Modal EDITAR-->


   <?php include_once '../contactos/modal-verContacto.php'; ?>


</div>

<?php
include_once '../../vistas/ayuda/modal-ayuda.php';
include_once '../../plantillas/footer.php'; ?>

<!-- SCRIPT ADICIONALES AQUI -->
<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/costoEnvio.js"></script>
<!-- CIERRE DE ETIQUETAS  -->
<?php include_once '../../plantillas/cierre.php'; ?>