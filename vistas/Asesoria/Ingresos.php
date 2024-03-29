<?php include_once '../../config/parametros.php'; 
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php'; ?>

<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<!--para la subida de fotos al sistema-->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
    type="text/css" />
<!--alerta del sistema-->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />

<!--COTINUANDO CON LA INICIALIZACION -->

<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Ingresos Por Asesoría</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Ingresos por Asesoría</li>
                        <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                            id="botonAyudaIngresoAsesoria"> <i class="fas fa-question"></i></button>
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
                    <!-- timeline item -->
                    <div id="formulario">
                        <i class="fas fa-calendar-check bg-blue"></i>
                        <div class="timeline-item">
                            <h3 class="timeline-header"><a href="#">Ingrese las fechas a consultar</a></h3>
                            <div class="timeline-body">
                                <form id="datosOrigen-form" name="register-form" onsubmit="return false">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label>Fecha Inicio</label>
                                            <div class="input-group">
                                                <input type="date" name="fechaInicio" id="fechaInicio"
                                                    class="form-control" autocomplete="off"
                                                    placeholder="(503)7232-2345">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Fecha Fin</label>
                                                <div class="input-group">
                                                    <input type="date" class="form-control" name="fechaFin"
                                                        id="fechaFin" placeholder="Digite la ciudad de origen">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col col-lg-12" style="text-align: right;">
                                            <div class="timeline-footer">
                                                <a class="btn btn-info btn-sm" id="procesar"
                                                    style="color: white">Procesar</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- END timeline item -->
                    <!-- timeline item -->
                    <div id="tabla">
                        <i class="fas fa-hand-holding-usd bg-green"></i>
                        <div class="timeline-item">
                            <h3 class="timeline-header no-border"><a href="#">Mostrando Información</a></h3>
                            <div class="timeline-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <div class="form-group">
                                                    <label>Precio de Asesoría</label>
                                                    <div class="input-group">
                                                        <input id="precio" type="text" class="form-control" value="1">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table id="tabla-ingresos" class="table table-bordered table-hover">
                                            <thead>
                                                <tr style="text-align: center;">
                                                    <th>Cliente</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-1 col-md-offset-1"> </div>
                                    <div class="col-md-3  ">
                                        <label class="text-primary "> Asesorías Totales: </label>
                                    </div>
                                    <div class="col-md-3  ">
                                        <label id="asoriasTotales" class="text-primary "> 0</label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-1 col-md-offset-1"> </div>
                                    <div class="col-md-3  ">
                                        <label class="text-success ">Total de Ingresos: </label>
                                    </div>
                                    <div class="col-md-3  ">
                                        <label id="totalIngresos" class="text-success "> $0</label>
                                    </div>
                                </div>
                            </div>
                            <br> <br>
                        </div>
                    </div>
                    <!-- END timeline item -->
                    <!-- /.timeline-label -->
                </div>
                <!-- END timeline item -->
            </div>
        </div>
    </section>

</div>
<!-- /.content-wrapper -->
<?php 
include_once '../../vistas/ayuda/modal-ayuda.php';
include_once '../../plantillas/footer.php';?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<!--alerta del sistema-->
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<!--validaciones del sistema-->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<!--para la mascara-->
<script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>
<!--procesos del sistema-->
<script src="<?= $base_url ?>js/controladores/asesorias/ingresos.js"></script>

<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>