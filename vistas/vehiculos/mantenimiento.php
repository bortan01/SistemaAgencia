<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php';
?>

<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<!-- iCheck for checkboxes -->
<link rel="stylesheet" href="<?= $base_url ?>plugins/icheck-bootstrap/icheck-bootstrap.min.css">

<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>



<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Mantenimiento de Vehiculos</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Mantenimiento</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <form id="register-mantenimiento" name="register-form" onsubmit="return false">

         <div class="row">
            <div class="col-md-12">
               <div class="timeline">
                  <!-- timeline time label -->

                  <!-- /.timeline-label -->
                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-car bg-blue"></i>
                     <div class="timeline-item">

                        <h3 class="timeline-header"><a href="#">Datos Generales:</a></h3>

                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-sm-8">
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Vehiculo</label>
                                    <div class="input-group">
                                       <select name="id_placa" id="id_placa"
                                          class="select2 select2-hidden-accessible form-control"
                                          data-placeholder="Seleccione" style="width: 100%;">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Fecha</label>
                                    <input type="date" class="form-control" name="fecha" id="fecha">
                                 </div>
                              </div>
                              <div class="col-sm-8">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Lugar</label>
                                    <input type="text" class="form-control" name="lugar" id="lugar"
                                       placeholder="Digite nombre del lugar donde realizo el mantenimiento">
                                 </div>
                              </div>


                              <div class="col-sm-4">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Precio de Mantenimiento</label>
                                    <input type="number" class="form-control" min="0" name="precio" id="precio">
                                 </div>
                              </div>
                           </div>

                        </div>

                     </div>
                  </div>
                  <!-- END timeline item -->
                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-wrench bg-green"></i>
                     <div class="timeline-item">

                        <h3 class="timeline-header no-border"><a href="#">Adicional</a></h3>
                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-sm-7">
                                 <div class="form-group">
                                    <label>Servicios Realizados</label>
                                    <div class="select2-purple">
                                       <select class="select2" multiple="multiple" name="mantenimiento_realizado"
                                          id="mantenimiento_realizado" data-placeholder="Seleccione"
                                          data-dropdown-css-class="select2-purple" style="width: 100%;">
                                          <option>Cambio de Aceite </option>
                                          <option>Limpieza de Filtros </option>
                                          <option>Lavado </option>
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Nuevo Servicio</label>
                                    <input type="text" class="form-control" name="insertarMantenimiento"
                                       id="insertarMantenimiento" placeholder="Insertar Nuevo Servicio Realizado"
                                       autocomplete="off">
                                 </div>

                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" name="agregarServicio"
                                       id="agregarServicio" style="margin-top:8px;"
                                       onclick="myFunction()">Agregar</button>
                                 </span>

                              </div>
                              <div class="col-sm-7">
                                 <div class="form-group">
                                    <label>Cambio de Piezas</label>
                                    <div class="select2-danger">
                                       <select class="select2" multiple="multiple" name="piezas_cambiadas"
                                          id="piezas_cambiadas" data-placeholder="Seleccione"
                                          data-dropdown-css-class="select2-danger" style="width: 100%;">
                                          <option>Reemplazo de Llanta </option>
                                          <option>Reemplazo de Frenos </option>
                                          <option>Reemplazo de Luces </option>

                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <!-- text input -->
                                 <div class="form-group">
                                    <label>Nuevo Cambio de Pieza</label>
                                    <input type="text" class="form-control" name="insertarPieza" id="insertarPieza"
                                       placeholder="Insertar Nuevo Pieza" autocomplete="off">
                                 </div>

                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" name="agregarPieza"
                                       id="agregarServicio" style="margin-top:8px;"
                                       onclick="CambioPieza()">Agregar</button>
                                 </span>

                              </div>

                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- END timeline item -->

                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-comments bg-yellow"></i>
                     <div class="timeline-item">

                        <h3 class="timeline-header"><a href="#">Comentarios</a> Incidentes que ocurren
                           durante
                           el
                           mantenimiento</h3>
                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-sm-12">
                                 <div class="form-group">
                                    <textarea class="form-control" rows="3" id="comentarios" name="comentarios"
                                       placeholder="Describir incidentes"></textarea>
                                 </div>
                              </div>
                           </div>

                           <div class="col-sm-6">
                              <!-- text input -->
                              <div class="hidden">
                                 <label name="detalle" id="detalle">Ingresó Mantenimiento de un Vehículo</label>
                              </div>
                           </div>
                           <div class="timeline-footer" style="text-align: right;">
                              <button name="btnGuardar" id="btnGuardar" class="btn btn-info btn-sm"
                                 style="color: white">Guardar</button>
                              <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                           </div>

                        </div>
                     </div>
                  </div>
               </div>
               <!-- END timeline item -->
            </div>
         </div>
      </form>
   </section>
</div>

<?php
  include_once '../../plantillas/footer.php';
?>

<script>
$(function() {
   $('.select2').select2()

   //Initialize Select2 Elements
   $('.select2bs4').select2({
      theme: 'bootstrap4'
   })

   $("input[data-bootstrap-switch]").each(function() {
      $(this).bootstrapSwitch('state', $(this).prop('checked'));
   });

})
</script>


<script>
function myFunction() {
   let x = $("#insertarMantenimiento").val();
   let seleccion = $("<option></option>").val(x).text(x);
   $("#mantenimiento_realizado").append(seleccion).trigger('change');
}

function CambioPieza() {
   let x = $("#insertarPieza").val();
   let seleccion = $("<option></option>").val(x).text(x);
   $("#piezas_cambiadas").append(seleccion).trigger('change');
}
</script>



<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboModelo.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboPlaca.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/insertarMantenimiento.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
