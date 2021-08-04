<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php';

?>

<!-- ESTILOS ADICIONALES-->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<link rel="stylesheet" href="<?= $base_url ?>plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">

<link href="<?= $base_url ?>css/mdtimepicker.css" rel="stylesheet" type="text/css"> <!-- reloj -->

<!-- ESTILOS ADICIONALES DE FOTO PARA REGISTRO USUARIO-->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />

<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>

<style>
#desborde {
   width: 100%;
   overflow: hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   word-wrap: break-word;
}
</style>

<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Cotización de Vehiculo</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Cotización de Vehiculo</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <form id="register-cotizarVehiculo" name="register-form" onsubmit="return false">
         <div class="row">
            <div class="col-md-12">
               <div class="timeline">

                  <div>
                     <i class="fas fa-car bg-blue"></i>
                     <div class="timeline-item">

                        <h3 class="timeline-header"><a href="#">Datos Generales</a></h3>

                        <div class="timeline-body">
                           <div class="row">

                              <div class="col-sm-6">
                                 <!-- text input -->
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Cliente</label>
                                    <div class="input-group">
                                       <select name="id_usuario" id="comboUsuario"
                                          class="select2 select2-hidden-accessible form-control"
                                          data-placeholder="Seleccione" style="width: 100%;">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" data-toggle="modal"
                                       data-target="#modalAgregarCliente"
                                       style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>

                              <div class="col-sm-2">
                                 <!-- text input -->
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Modelo</label>
                                    <div class="input-group">
                                       <select name="id_modelo" id="id_modelo"
                                          class="select2 select2-hidden-accessible form-control"
                                          data-placeholder="Seleccione" style="width: 100%;">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" data-toggle="modal"
                                       data-target="#modal-modelo" style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>
                              <div class="col-sm-2">
                                 <div class="form-group">
                                    <label>Año</label>
                                    <input type="number" class="form-control" min=2010 max=<?php echo date("Y"); ?>
                                       name="anio" id="anio" autocomplete="off">
                                 </div>
                              </div>

                              <div class="col-sm-12">
                                 <div class="form-group">
                                    <label>Caracteristicas</label>
                                    <textarea class="textarea" name="caracteristicas" id="caracteristicas"
                                       placeholder="Digite caracteristicas del Vehiculo"
                                       style="width: 100%; height: 50px; font-size: 16px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>

                                 </div>
                              </div>

                              <div class="col-sm-6">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Dirección de Recogida</label>
                                    <input type="text" class="form-control" name="direccion_recogida"
                                       id="direccion_recogida" placeholder="Digite dirección de recogida"
                                       autocomplete="off">
                                 </div>
                              </div>
                              <div class="col-sm-3">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Fecha de Recogida</label>
                                    <input type="date" class="form-control" name="fechaRecogida" id="fechaRecogida">
                                 </div>
                              </div>
                              <div class="col-sm-3">
                                 <label>Hora de Recogida</label>
                                 <div class="input-group clockpicker" data-autoclose="true">
                                    <input type="text" id="timepicker" name="start" class="form-control"
                                       value="08:00" />

                                 </div>

                              </div>

                              <div class="col-sm-6">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Dirección de Devolución</label>
                                    <input type="text" class="form-control" name="direccion_devolucion"
                                       id="direccion_devolucion" placeholder="Digite dirección de devolución"
                                       autocomplete="off">
                                 </div>
                              </div>
                              <div class="col-sm-3">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Fecha de Devolución</label>
                                    <input type="date" class="form-control" name="fechaDevolucion" id="fechaDevolucion">
                                 </div>
                              </div>
                              <div class="col-sm-3">
                                 <label>Hora de Devolución</label>
                                 <div class="input-group clockpicker" data-autoclose="true">
                                    <input type="text" id="timepicker2" name="start" class="form-control"
                                       value="08:00" />
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <!-- text input -->
                                 <div class="hidden">
                                    <label name="detalle" id="detalle">Realizó Cotización de Vehículo</label>
                                 </div>
                              </div>

                           </div>
                           <div class="timeline-footer" style="text-align: right;">
                              <button name="btnGuardarCotizacionV" id="btnGuardarCotizacionV"
                                 class="btn btn-info btn-sm" style="color: white">Guardar</button>
                              <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </form>
   </section>

</div>

<?php
  include_once '../cliente/modalCliente.php';
  include_once './modal-modelo.php';
  include_once '../../plantillas/footer.php';
?>

<script>
$(function() {
   $('.select2').select2()

   //Initialize Select2 Elements
   $('.select2bs4').select2({
      theme: 'bootstrap4'
   })

   $('.my-colorpicker1').colorpicker()
   //color picker with addon

   $("input[data-bootstrap-switch]").each(function() {
      $(this).bootstrapSwitch('state', $(this).prop('checked'));
   });

   $(document).ready(function() {
      $('#timepicker').mdtimepicker(); //Initializes the time picker
   });

   $(document).ready(function() {
      $('#timepicker2').mdtimepicker(); //Initializes the time picker
   });

})
</script>

<!-- jquery-validation -->

<!-- INICIO DE SCRIPT PARA REGISTRO DE USUARIO -->
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<script src="<?= $base_url ?>js/controladores/client/registro-cliente.js"></script>
<script src="<?= $base_url ?>js/controladores/client/comboUsuario.js"></script>
<!-- FIN DE SCRIPT PARA REGISTRO DE USUARIO -->

<script src="<?= $base_url ?>js/mdtimepicker.js"></script> <!-- reloj -->

<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboModelo.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
<script src="<?= $base_url ?>plugins/select2/js/select2.full.min.js"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/vehiculos/insertarCotizacionAuto.js"></script>

<?php include_once '../../plantillas/cierre.php'; ?>