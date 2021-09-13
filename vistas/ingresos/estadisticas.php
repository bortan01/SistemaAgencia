<!-- INICIALIZACION -->
<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" rel="stylesheet"
   type="text/css" />
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>

<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-9">
               <h1 id="titulo">Estadísticas</h1>
            </div>
            <div class="col-sm-3">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Estadísticas</li>
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
               <div id="loadingEstadisticas" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="timeline">
                  <!-- timeline item -->
                  <div>
                     <i class="fa fa-signal bg-blue"></i>
                     <div class="timeline-item">
                        <!--<span class="time"><i class="fas fa-clock"></i> 12:05</span>-->
                        <h3 class="timeline-header"><a href="#">Ingresos</a></h3>

                        <div class="timeline-body">
                           <div class="row">
                              <div class="col-md-9">
                                 <canvas id="myChart" style="position: relative; height: 40vh; width: 80vw"></canvas>
                              </div>
                              <div class="col-md-3 d-flex align-items-center d-flex justify-content-center">
                                 <div class="form-group">
                                    <div class="input-group">
                                       <input class=" form-control" name="calendario" id="calendario">
                                    </div>
                                    <button data-periodo="personalizado" name="" id="personalizado"
                                       class="btn btn-outline-primary w-100 align-bottom mt-2">Personalizado</button>
                                    <!-- /.input group -->
                                 </div>
                              </div>
                           </div>
                           <div id="contenerdorBorones" class="row mt-3 mb-3">
                              <div class="col-md-2 ">
                                 <button data-periodo="semana" name="" id=""
                                    class="btn btn-outline-primary active w-100">Última
                                    Semana</button>
                              </div>
                              <div class="col-md-2">
                                 <button data-periodo="mes" name="" id="" class="btn btn-outline-primary w-100">Último
                                    Mes</button>
                              </div>
                              <div class="col-md-2">
                                 <button data-periodo="trimestre" name="" id=""
                                    class="btn btn-outline-primary w-100">Último Trimestre</button>
                              </div>
                              <div class="col-md-2">
                                 <button data-periodo="semestre" name="" id=""
                                    class="btn btn-outline-primary w-100">Último Semestres</button>
                              </div>
                              <div class="col-md-2">
                                 <button data-periodo="year" name="" id="" class="btn btn-outline-primary w-100">Último
                                    Año</button>
                              </div>
                              <div class="col-md-2">
                                 <button data-periodo="siempre" name="" id=""
                                    class="btn btn-outline-primary w-100">Desde Siempre</button>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
                  <!-- END timeline item -->


                  <div id="formulario">
                     <i class="fas fa-book-reader bg-green"></i>
                     <div class="timeline-item">
                        <h3 class="timeline-header"><a href="#">Detalle Ingresos</a></h3>

                        <div class="timeline-body">
                           <div class="col-12 col-sm-12">
                              <div class="card card-primary card-outline card-outline-tabs">
                                 <div class="card-header p-0 border-bottom-0">
                                    <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                       <li class="nav-item">
                                          <a class="nav-link active" id="custom-tabs-four-tours-tab" data-toggle="pill"
                                             href="#custom-tabs-four-tours" role="tab"
                                             aria-controls="custom-tabs-four-tours" aria-selected="true">Tours</a>
                                       </li>
                                       <li class="nav-item">
                                          <a class="nav-link" id="custom-tabs-four-paquetes-tab" data-toggle="pill"
                                             href="#custom-tabs-four-paquetes" role="tab"
                                             aria-controls="custom-tabs-four-paquetes"
                                             aria-selected="false">Paquetes</a>
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
                                             aria-controls="custom-tabs-four-settings"
                                             aria-selected="false">Asesorías</a>
                                       </li>
                                       <li class="nav-item">
                                          <a class="nav-link" id="custom-tabs-four-vehiculos-tab" data-toggle="pill"
                                             href="#custom-tabs-four-vehiculos" role="tab"
                                             aria-controls="custom-tabs-four-vehiculos"
                                             aria-selected="false">Vehículos</a>
                                       </li>
                                    </ul>
                                 </div>
                                 <div class="card-body">
                                    <div class="tab-content" id="custom-tabs-four-tabContent">
                                       <div class="tab-pane fade show active" id="custom-tabs-four-tours"
                                          role="tabpanel" aria-labelledby="custom-tabs-four-tours-tab">
                                          <div class="col-sm-12">
                                             <table id="tableTours" class="table table-bordered table-hover">
                                                <thead>
                                                   <tr style="text-align: center;">
                                                      <th>Cliente</th>
                                                      <th>Tour</th>
                                                      <th>Fecha de Reserva</th>
                                                      <th>Forma de pago</th>
                                                      <th>Tipo</th>
                                                      <th>Total ($)</th>
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
                                             <table id="tableEncomiendas" class="table table-bordered table-hover">
                                                <thead>
                                                   <tr style="text-align: center;">
                                                      <th>Cliente</th>
                                                      <th>Código Postal</th>
                                                      <th>Fecha</th>
                                                      <th>Total ($)</th>
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
                                             <table id="tableAsesorias" class="table table-bordered table-hover">
                                                <thead>
                                                   <tr style="text-align: center;">
                                                      <th>Título</th>
                                                      <th>Fecha de cita</th>
                                                      <th>Hora cita </th>
                                                      <th>Total ($)</th>
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
                                             <table id="tableVehiculos" class="table table-bordered table-hover">
                                                <thead>
                                                   <tr style="text-align: center;">
                                                      <th>Cliente</th>
                                                      <th>Modelo</th>
                                                      <th>Placa</th>
                                                      <th>Fecha</th>
                                                      <th>Total ($)</th>
                                                   </tr>
                                                </thead>
                                                <tbody style="text-align: center;">
                                                </tbody>
                                             </table>
                                          </div>
                                       </div>
                                       <div class="tab-pane fade" id="custom-tabs-four-paquetes" role="tabpanel"
                                          aria-labelledby="custom-tabs-four-paquetes-tab">
                                          <div class="col-sm-12">
                                             <table id="tablePaquetes" class="table table-bordered table-hover">
                                                <thead>
                                                   <tr style="text-align: center;">
                                                      <th>Cliente</th>
                                                      <th>Paquete</th>
                                                      <th>Fecha de Reserva</th>
                                                  <!--<th>Forma de pago</th> -->
                                                      <th>Tipo</th>
                                                      <th>Total ($)</th>
                                                   </tr>
                                                </thead>
                                                <tbody style="text-align: center;">
                                                </tbody>
                                             </table>
                                             <tbody id="" style="text-align: center;">
                                             </tbody>
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
      </div>
   </section>
</div>
<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script src="<?= $base_url ?>/plugins/sweetalert2/sweetalert2.js"></script>
<script src="<?= $base_url ?>js/controladores/ingresos/char.js"></script>
<script src="<?= $base_url ?>js/controladores/ingresos/estadisticas.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>