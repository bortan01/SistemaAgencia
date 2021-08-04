<!-- INICIALIZACION -->
<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" rel="stylesheet"
   type="text/css" />
<link rel=" stylesheet" type="text/css" href="<?= $base_url ?>plugins/asiento-bus/css/jquery.seat-charts.css">
<link rel=" stylesheet" type="text/css" href="<?= $base_url ?>plugins/asiento-bus/css/reserva.css">
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>

<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-9">
               <h1 id="titulo">Reservar Paquete</h1>
            </div>
            <div class="col-sm-3">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Reservar Paquete</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>
   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-md-12">
            <div class="overlay-wrapper">
               <div id="loadingReservaTur" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="timeline">
                  <!-- timeline time label -->
                  <div class="time-label">
                     <span class="bg-red">Registrar Reserva</span>
                  </div>
                  <!-- /.timeline-label -->
                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-map-marked-alt bg-blue"></i>
                     <div class="timeline-item">
                        <!--<span class="time"><i class="fas fa-clock"></i> 12:05</span>-->
                        <h3 class="timeline-header"><a href="#">Datos Generales:</a></h3>

                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-sm-11">
                                 <div class="form-group">
                                    <label>Seleccione el Cliente</label>
                                    <select name="comboUsuario" id="comboUsuario"
                                       class="select2 select2-hidden-accessible form-control"
                                       data-placeholder="Seleccione el tipo" style="width: 100%;">
                                    </select>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" id="btnNuevoCliente"
                                       name="btnNuevoCliente" style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>

                           </div>
                        </div>

                     </div>
                  </div>
                  <!-- END timeline item -->
                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-shuttle-van bg-red"></i>
                     <div class="timeline-item">
                        <!--<span class="time"><i class="fas fa-clock"></i> 5 mins ago</span>-->
                        <h3 class="timeline-header no-border"><a href="#">Opciones de Asientos</a></h3>
                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-sm-4">
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Seleccione su asiento</label>
                                    <div class="input-group">
                                       <select id="comboAsiento" name="comboAsiento"
                                          class="select2 select2-hidden-accessible form-control"
                                          data-placeholder="Seleccione su Asiento" style="width: 100%;">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <div class="form-group">
                                    <label>Precio ($)</label>
                                    <div class="input-group">
                                       <input type="number" min="0" class=" form-control" disabled="true"
                                          name="costoPasaje" id="costoPasaje">
                                    </div>
                                    <!-- /.input group -->
                                 </div>
                              </div>
                              <div class="col-sm-4">
                                 <div class="form-group">
                                    <label>Cantidad</label>
                                    <div class="input-group">
                                       <input type="number" min="0" class=" form-control" value="1"
                                          name="cantidadAsientos" id="cantidadAsientos">
                                    </div>
                                    <!-- /.input group -->
                                 </div>
                              </div>

                           </div>

                        </div>
                        <div class="timeline-footer">
                           <div class="row">
                              <div class="col-md-1 col-md-offset-1"> </div>
                              <div class="col-md-3  ">
                                 <label class="text-success ">Cupos Disponibles</label>
                              </div>
                              <div class="col-md-3  ">
                                 <label id="cupos" class="text-success "> 0</label>
                              </div>
                           </div>
                           <div style="text-align: right;">
                              <button id="btnAgregarAsiento" class="btn btn-info btn-sm"
                                 style="color: white">Agregar</button>
                           </div>

                        </div>
                     </div>
                  </div>
                  <!-- END timeline item -->
                  <!-- timeline item -->
                  <div>
                     <i class="fas fa-list bg-green"></i>
                     <div class="timeline-item">
                        <!--<span class="time"><i class="fas fa-clock"></i> 27 mins ago</span>-->
                        <h3 class="timeline-header"><a href="#">Detalle</a>
                        </h3>
                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-sm-12">
                                 <table id="tablaAsientos" class="table table-bordered table-hover">

                                    <thead>
                                       <tr style="text-align: center;">
                                          <th>id</th>
                                          <th>Tipo de Asiento</th>
                                          <th>Costo ($)</th>
                                          <th>Cantidad</th>
                                          <th>SubTotal</th>
                                          <th>Eliminar</th>

                                       </tr>
                                    </thead>
                                    <tbody style="text-align: center;">

                                    </tbody>

                                 </table>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-md-1 col-md-offset-1"> </div>
                              <div class="col-md-3  ">
                                 <label class="text-primary "> Total de Reserva: </label>
                              </div>
                              <div class="col-md-3  ">
                                 <label id="totalPago" class="text-primary "> $0</label>
                              </div>
                           </div>
                           <div class="row">
                              <div class="col-md-1 col-md-offset-1"> </div>
                              <div class="col-md-3  ">
                                 <label class="text-danger "> Asientos a Reservar</label>
                              </div>
                              <div class="col-md-3  ">
                                 <label id="asientosAReservar" class="text-danger"> 0</label>
                              </div>
                           </div>

                        </div>
                     </div>
                  </div>
                  <!-- END timeline item -->
                  <!-- timeline item -->
                  <div id="item_asiento">
                     <i class="fas fa-chair bg-yellow"></i>
                     <div class="timeline-item">
                        <!--<span class="time"><i class="fas fa-clock"></i> 5 mins ago</span>-->
                        <h3 class="timeline-header no-border"><a href="#">Ubicación de Asientos</a></h3>
                        <div class="timeline-body">
                           <div class="row" id="dibujoAsientos">
                              <!-- <div class="offset-md-1"></div> -->
                              <div class="col-sm-6">
                                 <div id="seat-map" class="float-right">
                                    <div class="front-indicator">Frontal</div>
                                 </div>
                              </div>
                              <div class="col-sm-4 flex flex-column-reverse flex-sm-column">
                                 <div id="legend"></div>
                              </div>
                           </div>
                        </div>
                        <div class="col-sm-6">
                           <!-- text input -->
                           <div class="hidden">
                              <label name="detalle" id="detalle">Reservo un Paquete Turístico</label>
                           </div>
                        </div>
                        <div class="timeline-footer" style="text-align: right;">
                           <button name="btnguardarReserva" id="btnguardarReserva" class="btn btn-info btn-sm"
                              style="color: white">Guardar</button>
                           <button class="btn btn-danger btn-sm" style="color: white">Cancelar</button>
                        </div>
                     </div>
                  </div>
                  <!-- END timeline item -->
               </div>
            </div>
         </div>
      </div>
   </section>
</div>
<?php include_once '../cliente/modalCliente.php'  ?>
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
<script src="<?= $base_url ?>plugins/asiento-bus/js/jquery.seat-charts.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/turs/reserva-tour.js"></script>
<script src="<?= $base_url ?>js/controladores/client/registro-cliente.js"></script>

<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>