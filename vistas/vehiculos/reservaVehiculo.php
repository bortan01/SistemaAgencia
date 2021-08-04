<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php';
include_once  '../../plantillas/navbar.php'; ?>
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
                    <h1>Reserva de Vehiculo</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Reservar</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <form id="register-reserva" name="register-form" onsubmit="return false">
            <div class="row">
                <div class="col-md-12">
                    <div class="timeline">
                        <!-- timeline time label -->
                        <div class="time-label">
                            <span class="bg-red">Información</span>
                        </div>
                        <!-- /.timeline-label -->
                        <!-- timeline item -->
                        <div>
                            <i class="fas fa-users bg-gradient-blue"></i>
                            <div class="timeline-item">
                                <!--<span class="time"><i class="fas fa-clock"></i> 12:05</span>-->
                                <h3 class="timeline-header"><a href="#">Datos Generales:</a></h3>

                                <div class="timeline-body">
                                    <div class="row">
                                        <div class="col-sm-11">
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Seleccione Cliente</label>
                                                <div class="input-group">
                                                    <select name="comboUsuario" id="comboUsuario"
                                                        class="select2 select2-hidden-accessible form-control"
                                                        data-placeholder="Seleccione" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <br>
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-add"
                                                    data-toggle="modal" data-target="#modalAgregarCliente"
                                                    style="margin-top: 10px; width: 100%;">+</button>
                                            </span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <!-- END timeline item -->

                        <!-- timeline item -->
                        <div id="formulario">
                            <i class="fas fa-calendar-alt bg-green"></i>
                            <div class="timeline-item">
                                <h3 class="timeline-header"><a href="#">Opciones Adicionales</a></h3>

                                <div class="timeline-body">
                                    <form id="datosGenerales-form" name="register-form" onsubmit="return false">
                                        <div class="row">

                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="cars">Dirección de Recogida</label>
                                                    <input name="direccionR" id="direccionR" type="text"
                                                        class="form-control"
                                                        placeholder="Digite la dirección de recogida">
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="cars">Dirección de Devolución</label>
                                                    <input name="direccionD" id="direccionD" type="text"
                                                        class="form-control"
                                                        placeholder="Digite la dirección de devolución">
                                                </div>
                                            </div>
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label for="cars">Fecha y Hora</label>
                                                    <div class="input-group">
                                                        <input class=" form-control" name="fecha_salida"
                                                            id="fecha_salida">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group multiple-form-group input-group">
                                                    <label>Seleccione los Servicios Adicionales</label>
                                                    <div class="input-group">
                                                        <select name="comboServicio" id="comboServicio"
                                                            class="select2 select2-hidden-accessible form-control"
                                                            data-placeholder="Seleccione" style="width: 100%;">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <div class="form-group">
                                                    <label for="cars">Costo($)</label>
                                                    <input name="costo" id="costo" type="text" class="form-control"
                                                        placeholder="Costo" disabled>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <div class="form-group">
                                                    <label for="cars">Cantidad</label>
                                                    <input name="cantidad" id="cantidad" type="number" min="1" value="1"
                                                        class="form-control" placeholder="Cantidad">
                                                </div>
                                            </div>

                                            <div class="col-sm-3">
                                                <div class="form-group" id="mostrar">

                                                </div>
                                            </div>
                                        </div>
                                        <div class="timeline-footer" style="text-align: right;">
                                            <a class="btn btn-info btn-sm" id="agregarTabla"
                                                style="color: white">Agregar</a>

                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <!-- END timeline item -->
                        <!-- timeline item -->
                        <div id="tabla-servicios">
                            <i class="fas fa-clipboard-list bg-red"></i>
                            <div class="timeline-item">
                                <h3 class="timeline-header no-border"><a href="#">Agregando Información</a></h3>
                                <div class="timeline-body">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div id="adicionados"></div>
                                            <table id="add-tablaR" class="table table-bordered table-hover">
                                                <thead>
                                                    <tr style="text-align: center;">
                                                        <th>Servicio</th>
                                                        <th>Costo</th>
                                                        <th>Cantidad</th>
                                                        <th>Sub Total</th>
                                                        <th>Acción</th>
                                                        <th>id</th>
                                                        <th>contador</th>
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
                                            <label class="text-primary "> Alquiler de Vehiculo: </label>
                                        </div>
                                        <div class="col-md-3  ">
                                            <label id="totalVehiculo" class="text-primary "> $0</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-1 col-md-offset-1"> </div>
                                        <div class="col-md-3  ">
                                            <label class="text-success "> Otros Servicios: </label>
                                        </div>
                                        <div class="col-md-3  ">
                                            <label id="totalServicios" class="text-success "> $0</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-1 col-md-offset-1"> </div>
                                        <div class="col-md-3  ">
                                            <label class="text-danger "> Total de cliente: </label>
                                        </div>
                                        <div class="col-md-3  ">
                                            <label id="totalCliente" class="text-danger "> $0</label>
                                            <input type="hidden" id="emergencia">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-sm-6">
                                    <!-- text input -->
                                    <div class="hidden">
                                        <label name="detalle" id="detalle">Realizó Reserva de Vehículo</label>
                                    </div>
                                </div>
                                <br> <br>
                                <div class="timeline-footer" style="text-align: right;">
                                    <button name="btnGuardar" id="btnGuardar" class="btn btn-info btn-sm"
                                        style="color: white">Guardar</button>
                                    <button class="btn btn-danger btn-sm" style="color: white">Cancelar</button>
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
include_once '../cliente/modalCliente.php';
include_once '../../plantillas/footer.php';
?>


<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>

<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>

<script src="<?= $base_url ?>js/controladores/vehiculos/comboServicio.js"></script>
<script src="<?= $base_url ?>js/controladores/client/comboUsuario.js"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/vehiculos/reservaVehiculo.js"></script>

<?php include_once '../../plantillas/cierre.php'; ?>