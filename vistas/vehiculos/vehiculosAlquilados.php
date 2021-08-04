<?php 
include_once '../../config/parametros.php'; 
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php'; ?>
<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />

<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?= $base_url ?>plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css">

<link href="<?= $base_url ?>css/mdtimepicker.css" rel="stylesheet" type="text/css"> <!-- reloj -->

<style>
.center {
   display: block;
   margin-left: auto;
   margin-right: auto;
   width: 75%;
}
</style>
<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>



<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Vehiculos Alquilados</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Vehiculos Alquilados</li>
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

               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <div id="" class="dataTables_wrapper dt-bootstrap4">
                     <div class="row">
                        <div class="col-sm-12">
                           <table id="tabla_alquilados" class="table table-bordered table-striped">
                              <thead style="text-align: center;">
                                 <tr>
                                    <th>ID Alquiler</th>
                                    <th>Cliente</th>
                                    <th>Vehiculo</th>
                                    <th>Precio</th>
                                    <th>Fecha - Hora</th>
                                    <th>Acciones</th>
                                 </tr>
                              </thead>
                              <!-- /.inicio de loading -->
                              <div class="overlay-wrapper">
                                 <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

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

                  </div>
               </div>
               <!-- /.card-body -->
            </div>
            <!-- /.card -->
         </div>
         <!-- /.col -->
      </div>
      <!-- /.row -->
   </section>
</div>
<!-- End Modal Mostrar-->



<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
   <!-- Modal EDITAR-->
   <div class="modal fade" id="modal-editar">
      <div class="modal-dialog modal-lg modal-dialog-centered">
         <div class="modal-content">

            <div class="overlay-wrapper">

               <div class="modal-header">
                  <h4 class="modal-title">Regresar Vehiculo</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="row">

                  </div>
                  <div class="row">
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Id Alquiler</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="idDetalle" name="idDetalle" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Total</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="total" name="total" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <div class="form-group">
                           <label>Cliente</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="cliente" name="cliente" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>

                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Placa</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="placa" name="placa" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Año</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="anio" name="anio" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Modelo</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="modelo" name="modelo" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Kilometraje</label>
                           <div class="input-group">
                              <input type="number" class="form-control" id="kilometraje" name="kilometraje">
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>


                     <div class="col-sm-6">
                        <div class="form-group">
                           <label>Dirección de Recogida</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="recogida" name="recogida" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <div class="form-group">
                           <label>Dirección de Devolución</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="devolucion" name="devolucion" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-12">
                        <div class="form-group">
                           <label>Servicios Adquiridos</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="servicios" name="servicios" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-12">
                        <div class="form-group">
                           <label>Fecha - Hora (Recogida/Devolución) </label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="fechaHora" name="fechaHora" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <!-- text input -->
                        <div class="form-group">
                           <label>Fecha de Devolución</label>
                           <input type="date" class="form-control" name="fechaDe" id="fechaDe">
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <label>Hora de Devolución</label>
                        <div class="input-group clockpicker" data-autoclose="true">
                           <input type="text" id="timepicker" name="start" class="form-control" value="08:00" />
                        </div>


                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Intereses (%)</label>
                           <div class="input-group">
                              <input type="number" class="form-control" id="porcentaje" name="porcentaje" min=0
                                 value="5">
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Total a Pagar</label>
                           <div class="input-group">
                              <input type="text" class="form-control" id="pagar" name="pagar" disabled>
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>



                  </div>
                  <div class="modal-footer justify-content-between">
                     <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                     <button name="btnActualizar" id="btnActualizar" class="btn btn-info btn-sm"
                        style="color: white">Devolver</button>
                  </div>
               </div>
            </div>
            <!-- /.modal-content -->
         </div>
         <!-- /.modal-dialog -->
      </div>
      <!-- End Modal EDITAR-->
   </div>
</form>
<form id="miFormularioReporte" name="miFormularioReporte" role="form" onsubmit="return false">
   <!-- Modal EDITAR-->
   <div class="modal fade" id="modal-cotizacion">
      <div class="modal-dialog modal-lg modal-dialog-centered">
         <div class="modal-content">

            <div class="overlay-wrapper">

               <div class="modal-header">
                  <h4 class="modal-title">Información de Alquiler:</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <section class="content">

                        <div class="container-fluid" id="printDiv">
                           <div class="row">
                              <div class="col-md-12">
                                 <div id="page_pdf">
                                    <table id="factura_head">
                                       <tr>
                                          <td class="logo_factura">
                                             <div>
                                                <img src="<?= $base_url ?>img/logo-min.jpg" all rel="stylesheet"
                                                   type="text/css">
                                             </div>
                                          </td>
                                          <td class="info_empresa">
                                             <div>
                                                <span class="h2">Agencia de Viajes Martínez Travels &
                                                   Tours</span>
                                                <p>Segunda Avenida Sur, Barrio El Centro, #4D a 150mts
                                                   del Parquecito Infantil<br>Teléfono: +(503) 2319
                                                   2338<br>info.ventas@martineztraveltours.com</p>

                                             </div>
                                          </td>

                                       </tr>
                                    </table>
                                    <table id="factura_cliente">
                                       <tr>
                                          <td class="info_cliente">
                                             <div class="round">
                                                <span class="h3">Datos Generales del Cliente</span>
                                                <table class="datos_cliente">
                                                   <thead>
                                                      <tr>
                                                         <td>
                                                            <p> </p>
                                                            <label>Cliente:</label>
                                                            <p name="nombreC" id="nombreC">
                                                            </p>

                                                         </td>
                                                         <td><label>DUI:</label>
                                                            <p name="dui-cliente" id="dui-cliente">
                                                            </p>
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                         <td>
                                                            <p> </p>
                                                            <label>Teléfono:</label>
                                                            <p name="telefonoC" id="telefonoC"></p>
                                                         </td>
                                                         <td><label>Email:</label>
                                                            <p name="emailC" id="emailC"></p>
                                                         </td>
                                                      </tr>
                                                   </thead>
                                                </table>
                                             </div>
                                          </td>

                                       </tr>
                                    </table>

                                    <table id="factura_detalle">
                                       <thead>
                                          <tr>
                                             <th class="textcenter">Placa</th>
                                             <th class="textcenter">Vehiculo</th>
                                             <th class="textcenter">Año</th>
                                             <th class="textcenter">Kilometraje Actual</th>

                                          </tr>
                                       </thead>
                                       <tbody id="detalle_productos">

                                          <tr>
                                             <td class="textcenter"><label name="placaAuto" id="placaAuto"
                                                   style="font-weight: normal;"></label>
                                             </td>
                                             <td class="textcenter"><label name="nombreVehiculo" id="nombreVehiculo"
                                                   style="font-weight: normal;"></label></td>
                                             <td class="textcenter"><label name="anioA" id="anioA"
                                                   style="font-weight: normal;"></label></td>
                                             <td class="textcenter"><label name="kilometrajeA" id="kilometrajeA"
                                                   style="font-weight: normal;"></label></td>

                                          </tr>

                                       </tbody>

                                    </table>

                                    <table id="factura_detalle">
                                       <thead>
                                          <tr>
                                             <th class="textcenter">Dirección de Recogida</th>
                                             <th class="textcenter">Dirección de Devolución</th>

                                          </tr>
                                       </thead>
                                       <tbody id="detalle_productos">

                                          <tr>
                                             <td class="textcenter"><label name="direccion_recogidaC"
                                                   id="direccion_recogidaC" style="font-weight: normal;"></label></td>
                                             <td class="textcenter"><label name="direccion_devolucionC"
                                                   id="direccion_devolucionC" style="font-weight: normal;"></label>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>

                                    <table id="factura_detalle">
                                       <thead>
                                          <tr>
                                             <th class="textcenter">Fecha - Hora (Recogida/Devolución)
                                             </th>

                                          </tr>
                                       </thead>
                                       <tbody id="detalle_productos">

                                          <tr>
                                             <td class="textcenter"><label name="fecha-hora" id="fecha-hora"
                                                   style="font-weight: normal;"></label></td>

                                          </tr>
                                       </tbody>
                                    </table>
                                    <table id="servicios">
                                       <thead>
                                          <tr>
                                             <th class="textcenter">Cantidad
                                             </th>
                                             <th class="textcenter">Servicio Adicional
                                             </th>
                                             <th class="textcenter">Precio
                                             </th>

                                          </tr>
                                       </thead>
                                       <tbody id="detalle_productosServicios">

                                       </tbody>
                                    </table>



                                    <table id="factura_detalle">

                                       <tfoot id="detalle_totales">
                                          <tr>
                                             <td colspan="3" class="textright"><label>TOTAL A PAGAR
                                                   ($)</label>
                                             </td>
                                             <td class="textcenter"><label name="tot" id="tot"
                                                   style="font-weight: normal;"></label></td>
                                          </tr>
                                       </tfoot>
                                    </table>

                                    <div>
                                       <p class="nota">En caso de que la devolución del vehiculo sea uno o
                                          más dias despues de la fecha
                                          <br>establecida, se le aplicará un porcentaje de pago extra
                                          sobre el monto total.
                                       </p>
                                       <h5 class="label_gracias">¡Disfruta de Viajes Inolvidables!</h5>
                                    </div>
                                 </div>
                                 <div class="row no-print">
                                    <div class="col-md-12">

                                       <button target="_blank" id="doPrint" type="button" class="btn btn-default"><i
                                             class="fas fa-print"></i>
                                          Imprimir</button>

                                       <div id="editor"></div>

                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </section>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- End Modal EDITAR-->
</form>


<?php  
include_once '../../plantillas/footer.php';?>

<script>
$(function() {
   $('.my-colorpicker1').colorpicker()
   //color picker with addon
   $(document).ready(function() {
      $('#timepicker').mdtimepicker(); //Initializes the time picker
   });

})
</script>

<!-- SCRIPT ADICIONALES -->
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/vehiculos-alquilados.js"></script>


<script src="<?= $base_url ?>js/mdtimepicker.js"></script> <!-- reloj -->
<script src="<?= $base_url ?>plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>
<script src="<?= $base_url ?>plugins/select2/js/select2.full.min.js"></script>

<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>

<!--Para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>


<?php  include_once '../../plantillas/cierre.php';?>