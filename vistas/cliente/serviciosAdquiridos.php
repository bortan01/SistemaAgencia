<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../../vistas/session/isEmpleado.php';
include_once  '../../plantillas/navbar.php'; ?>
<!--para el reloj-->
<link rel="stylesheet" type="text/css" href="<?= $base_url ?>css/bootstrap-clockpicker.css">
<link href="<?= $base_url ?>css/mdtimepicker.css" rel="stylesheet" type="text/css">
<!--para la subida de fotos al sistema-->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<!--alerta del sistema-->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<?php
include_once '../../plantillas/barra_lateral.php';
?>
<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Servicios Adquiridos</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Servicios</li>
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

               <div id="formulario">
                  <i class="fas fa-users bg-primary"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Información General</a></h3>
                     <div class="timeline-body">
                        <form id="datosOrigen-form" name="register-form" onsubmit="return false">
                           <div class="row">

                              <div class="col-sm-6">

                                 <div class="form-group">
                                    <label class="text-primary">Cliente</label>
                                    <div class="input-group">
                                       <label id="nombre_cliente"></label>
                                    </div>
                                    <div class="input-group">
                                       <input type="hidden" class="form-control" name="cliente" id="cliente"
                                          disabled="true">
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <label class="text-primary">Teléfono</label>
                                 <div class="input-group">
                                    <label id="telefono"></label>
                                 </div>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </div>

               <div id="formulario">
                  <i class="fas fa-book-reader bg-green"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Servicios Adquiridos</a></h3>

                     <div class="timeline-body">
                        <div class="col-12 col-sm-12">
                           <div class="card card-primary card-outline card-outline-tabs">
                              <div class="card-header p-0 border-bottom-0">
                                 <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                    <li class="nav-item">
                                       <a class="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill"
                                          href="#custom-tabs-four-home" role="tab" aria-controls="custom-tabs-four-home"
                                          aria-selected="true">Tours/Paquetes</a>
                                    </li>

                                    <li class="nav-item">
                                       <a class="nav-link" id="custom-tabs-four-encomiendas-tab" data-toggle="pill"
                                          href="#custom-tabs-four-encomiendas" role="tab"
                                          aria-controls="custom-tabs-four-encomiendas"
                                          aria-selected="false">Encomiendas</a>
                                    </li>
                                    <li class="nav-item">
                                       <a class="nav-link" id="custom-tabs-four-settings-tab" data-toggle="pill"
                                          href="#custom-tabs-four-settings" role="tab"
                                          aria-controls="custom-tabs-four-settings" aria-selected="false">Asesorías</a>
                                    </li>
                                    <li class="nav-item">
                                       <a class="nav-link" id="custom-tabs-four-vehiculos-tab" data-toggle="pill"
                                          href="#custom-tabs-four-vehiculos" role="tab"
                                          aria-controls="custom-tabs-four-vehiculos" aria-selected="false">Vehículos</a>
                                    </li>
                                    <li class="nav-item">
                                       <a class="nav-link" id="custom-tabs-four-cotizarvehiculos-tab" data-toggle="pill"
                                          href="#custom-tabs-four-cotizarvehiculos" role="tab"
                                          aria-controls="custom-tabs-four-cotizarvehiculos"
                                          aria-selected="false">Cotizaciones Vehículos</a>
                                    </li>
                                    <li class="nav-item">
                                       <a class="nav-link" id="custom-tabs-four-cotizarvuelos-tab" data-toggle="pill"
                                          href="#custom-tabs-four-cotizarvuelos" role="tab"
                                          aria-controls="custom-tabs-four-cotizarvuelos"
                                          aria-selected="false">Cotizaciones Vuelos</a>
                                    </li>
                                 </ul>
                              </div>
                              <div class="card-body">
                                 <div class="tab-content" id="custom-tabs-four-tabContent">
                                    <div class="tab-pane fade show active" id="custom-tabs-four-home" role="tabpanel"
                                       aria-labelledby="custom-tabs-four-home-tab">
                                       <div class="col-sm-12">
                                          <table id="add-tours" class="table table-bordered table-hover">
                                             <thead>
                                                <tr style="text-align: center;">
                                                   <th>Título</th>
                                                   <th>Fecha de reserva</th>
                                                   <th>Detalle de reserva </th>
                                                   <th>Forma de pago utilizada</th>
                                                   <th>Pago Realizado($)</th>
                                                   <th>Tipo de Viaje</th>
                                                </tr>
                                             </thead>
                                             <tbody style="text-align: center;">
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>

                                    <div class="tab-pane fade" id="custom-tabs-four-encomiendas" role="tabpanel"
                                       aria-labelledby="custom-tabs-four-encomiendas-tab">
                                       <div class="col-sm-12">
                                          <table id="add-encomiendas" class="table table-bordered table-hover">
                                             <thead>
                                                <tr style="text-align: center;">
                                                   <th>Producto</th>
                                                   <th>Dirección Origen</th>
                                                   <th>Dirección Destino</th>
                                                   <th>Fecha</th>
                                                   <th>Cantidad</th>
                                                   <th>Sub Total($)</th>
                                                </tr>
                                             </thead>
                                             <tbody style="text-align: center;">
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-four-settings" role="tabpanel"
                                       aria-labelledby="custom-tabs-four-settings-tab">
                                       <div class="col-sm-12">
                                          <table id="add-asesoria" class="table table-bordered table-hover">
                                             <thead>
                                                <tr style="text-align: center;">
                                                   <th>Título</th>
                                                   <th>Fecha de cita</th>
                                                   <th>Hora cita </th>
                                                </tr>
                                             </thead>
                                             <tbody style="text-align: center;">
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-four-vehiculos" role="tabpanel"
                                       aria-labelledby="custom-tabs-four-vehiculos-tab">
                                       <div class="col-sm-12">
                                          <table id="add-vehiculos" class="table table-bordered table-hover">
                                             <thead>
                                                <tr style="text-align: center;">
                                                   <th>ID Detalle</th>
                                                   <th>Vehiculo</th>
                                                   <th>Año</th>
                                                   <th>Placa</th>
                                                   <th>Fecha</th>
                                                   <th>Sub Total($)</th>
                                                </tr>
                                             </thead>
                                          </table>
                                       </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-four-cotizarvehiculos" role="tabpanel"
                                       aria-labelledby="custom-tabs-four-cotizarvehiculos-tab">
                                       <div class="col-sm-12">
                                          <table id="add-tabla" class="table table-bordered table-hover">
                                             <thead>
                                                <tr style="text-align: center;">
                                                   <th>Modelo de Vehiculo</th>
                                                   <th>Año</th>
                                                   <th>Fecha</th>
                                                   <th>Caracteristicas</th>
                                                   <th>Descuentos (%)</th>
                                                   <th>Sub Total($)</th>
                                                </tr>
                                             </thead>
                                          </table>
                                          <tbody id="tableBody" style="text-align: center;">
                                          </tbody>
                                       </div>
                                    </div>
                                    <div class="tab-pane fade" id="custom-tabs-four-cotizarvuelos" role="tabpanel"
                                       aria-labelledby="custom-tabs-four-cotizarvuelos-tab">
                                       <div class="col-sm-12">
                                          <table id="add-vuelos" class="table table-bordered table-hover">
                                             <thead>
                                                <tr style="text-align: center;">
                                                   <th>Ciudad de Partida</th>
                                                   <th>Fecha Partida</th>
                                                   <th>Ciudad de Llegada</th>
                                                   <th>Fecha Llegada</th>
                                                   <th>Aerolinea</th>
                                                   <th>Sub Total($)</th>
                                                </tr>
                                             </thead>
                                             <tbody id="tableBody" style="text-align: center;">
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <!-- /.card -->
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</div>

<?php
include_once '../../plantillas/footer.php';
?>


<!--alerta del sistema-->
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>

<!--validaciones del sistema-->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<!--para la mascara-->
<script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>

<!--Script de los procedimientos del sistema-->
<script src="<?= $base_url ?>js/controladores/client/mostrarServiciosAdquiridos.js"></script>

<?php include_once '../../plantillas/cierre.php'; ?>