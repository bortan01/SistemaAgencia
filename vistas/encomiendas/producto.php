<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../session/isEmpleado.php';
include_once  '../../plantillas/navbar.php';?>
<!--LOS SCRIPT ADICIONALES-->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<?php
include_once '../../plantillas/barra_lateral.php';
?>

<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Registrar Producto</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Registrar Producto</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-md-12">
            <div class="timeline">

               <div>
                  <i class="fas fa-box-open bg-blue"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Datos Generales</a></h3>

                     <div class="timeline-body">
                        <form id="register-form" name="register-form" onsubmit="return false">
                           <div class="row">
                              <div class="col-sm-5">
                                 <div class="form-group">
                                    <label>Nombre</label>
                                    <input name="nombre_producto" type="text" class="form-control"
                                       placeholder="Introduzca el nombre" autocomplete="off">
                                 </div>
                              </div>

                              <div class="col-sm-3">
                                 <div class="form-group">
                                    <label>Tarifa</label>
                                    <input name="tarifa" type="text" class="form-control"
                                       placeholder="Introduzca la tarifa" autocomplete="off">
                                 </div>
                              </div>

                              <div class="col-sm-3">
                                 <div class="form-group">
                                    <label>Unidad de medida</label>
                                    <div class="input-group">
                                       <select name="id_unidad" id="id_unidad"
                                          class="select2 select2-hidden-accessible form-control"
                                          data-placeholder="Seleccione" style="width: 100%;">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" id="unidad-add" name=""
                                       style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>

                           </div>
                           <div class="col-sm-6">
                              <!-- text input -->
                              <div class="hidden">
                                 <label name="detalle" id="detalle">Registró un Producto</label> 
                              </div>
                           </div>
                        </form>
                        <div class="timeline-footer" style="text-align: right;">
                           <a class="btn btn-info btn-sm" id="btn-producto" style="color: white">Guardar</a>
                           <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </div>

      <!-- ******************Modal ********************************-->
      <div class="modal fade" id="add-unidad">
         <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">

               <div class="overlay-wrapper">
                  <div id="loadingActualizar" class="overlay">
                     <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                     <div class="text-bold pt-2">Cargando...
                     </div>
                  </div>
                  <div class="modal-header">
                     <h4 class="modal-title">Nueva Unidad</h4>
                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div class="modal-body">
                     <form id="unidad-form" name="register-form" onsubmit="return false">
                        <div class="row">
                           <div class="col-sm-3"></div>
                           <div class="col-sm-12">
                              <div class="form-group">
                                 <label>Nombre</label>
                                 <input name="unidad_medida" type="text" class="form-control"
                                    placeholder="Ejemplo: Libra" autocomplete="off">
                              </div>
                           </div>
                           <div class="col-sm-3"></div>
                        </div>
                     </form>

                  </div>

                  <div class="modal-footer justify-content-between">
                     <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                     <button name="btn-producto" id="btn-unidad" class="btn btn-info btn-sm"
                        style="color: white">Guardar</button>
                  </div>

               </div>

            </div>
         </div>
         <!-- /.modal-content -->
      </div>

      <!-- ******************Modal ********************************-->

   </section>
</div>

<script type="text/javascript">
$(document).on('click', '#unidad-add', function() {
   $('#add-unidad').modal('show');
   $('#loadingActualizar').hide();
});
</script>


<?php
  include_once '../../plantillas/footer.php';
?>

<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/insertar-producto.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/insertar-unidad.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/combo-unidad.js"></script>

<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>

<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>