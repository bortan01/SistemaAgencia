<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php';
?>

<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<link rel="stylesheet" href="<?= $base_url ?>plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>css/mdtimepicker.css" rel="stylesheet" type="text/css"> <!-- reloj -->
<link rel="stylesheet" href="<?= $base_url ?>plugins/icheck-bootstrap/icheck-bootstrap.min.css">

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
                    <h1>Cotización de Vuelo</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Cotización de Vuelo</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <form id="register-cotizarv" name="register-form" onsubmit="return false">
            <div class="row">
                <div class="col-md-12">
                    <div class="timeline">

                        <div>
                            <i class="fas fa-plane bg-blue"></i>
                            <div class="timeline-item">

                                <h3 class="timeline-header"><a href="#">Datos Generales</a></h3>

                                <div class="timeline-body">
                                    <div class="row">

                                        <div class="col-sm-11">
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
                                                <button type="button" class="btn btn-success btn-add"
                                                    data-toggle="modal" data-target="#modalAgregarCliente"
                                                    style="margin-top: 10px; width: 100%;">+</button>
                                            </span>
                                        </div>
                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Punto de Partida</label>
                                                <input type="text" class="form-control" name="ciudad_partida"
                                                    id="ciudad_partida" placeholder="Digite nombre del Lugar">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Fecha</label>
                                                <input type="date" class="form-control" name="fechaPartida"
                                                    id="fechaPartida">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>Hora de Llegada</label>
                                            <div class="input-group clockpicker" data-autoclose="true">
                                                <input type="text" id="timepicker" name="start" class="form-control"
                                                    value="08:00" />

                                            </div>

                                        </div>

                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Punto de Llegada</label>
                                                <input type="text" class="form-control" name="ciudad_llegada"
                                                    id="ciudad_llegada" placeholder="Digite nombre del Lugar">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Fecha</label>
                                                <input type="date" class="form-control" name="fechaLlegada"
                                                    id="fechaLlegada">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <label>Hora de Llegada</label>
                                            <div class="input-group clockpicker" data-autoclose="true">
                                                <input type="text" id="timepicker2" name="start" class="form-control"
                                                    value="08:00" />

                                            </div>

                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Adultos (+12 años)</label>
                                                <input type="number" class="form-control" min="0" max="100"
                                                    name="adultos" id="adultos">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Niños (5 a 11 años)</label>
                                                <input type="number" class="form-control" min="0" max="10" name="ninos"
                                                    id="ninos">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Bebés (0 a 4 años)</label>
                                                <input type="number" class="form-control" min="0" max="3" name="bebes"
                                                    id="bebes">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Cantidad de Maletas</label>
                                                <input type="number" class="form-control" min="0" max="3" name="maletas"
                                                    id="maletas">
                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>*En caso que el bebe viaje solo, favor detallarlo</label>
                                                <textarea class="textarea" name="detalleBebe" id="detalleBebe"
                                                    placeholder="Ejemplo: La bebe Casey Henriquez de 10 meses viaja sola, encargada responsable: Aeromoza Beatriz Ponce"
                                                    style="width: 100%; height: 50px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END timeline item -->

                        <!-- timeline item -->
                        <div>
                            <i class="fas fa-luggage-cart bg-green"></i>
                            <div class="timeline-item">

                                <h3 class="timeline-header no-border"><a href="#">Opciones Avanzadas</a></h3>
                                <div class="timeline-body">
                                    <div class="row">


                                        <div class="col-sm-3">
                                            <!-- select -->
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Aerolinea</label>
                                                <div class="input-group">
                                                    <select name="idaerolinea" id="idaerolinea"
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
                                                    data-toggle="modal" data-target="#modal-aerolinea"
                                                    style="margin-top: 10px; width: 100%;">+</button>
                                            </span>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- select -->
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Clase</label>
                                                <div class="input-group">
                                                    <select name="idclase" id="idclase"
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
                                                    data-toggle="modal" data-target="#modal-tipoClase"
                                                    style="margin-top: 10px; width: 100%;">+</button>
                                            </span>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- select -->
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Tipo de Viaje</label>
                                                <div class="input-group">
                                                    <select name="idtipo_viaje" id="idtipo_viaje"
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
                                                    data-toggle="modal" data-target="#modal-tipoViaje"
                                                    style="margin-top: 10px; width: 100%;">+</button>
                                            </span>
                                        </div>


                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <label>Opciones Avanzadas</label>
                                                <div class="select2-danger">
                                                    <select class="select2" multiple="multiple" name="opc_avanzadas"
                                                        id="opc_avanzadas" data-placeholder="Seleccione"
                                                        data-dropdown-css-class="select2-danger" style="width: 100%;">
                                                        <option>Vuelo sin Escalas</option>
                                                        <option>Misma Aerolinea</option>
                                                        <option>Equipaje Extra</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Nuevo Opción</label>
                                                <input type="text" class="form-control" name="insertarOpcion"
                                                    id="insertarOpcion" placeholder="Insertar Nueva Opcion"
                                                    autocomplete="off">
                                            </div>

                                        </div>
                                        <div class="col-sm-1">
                                            <br>
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-add"
                                                    name="agregarOpcion" id="agregarOpcion"
                                                    style="margin-top: 10px; width: 100%;"
                                                    onclick="OpcAvanzada()">+</button>
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

                                <h3 class="timeline-header"><a href="#">Condiciones</a></h3>
                                <div class="timeline-body">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group" id="desborde">
                                                <p>
                                                    <label name="condiciones" id="condiciones"></label>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <!-- text input -->
                                    <div class="hidden">
                                        <label name="detalle" id="detalle">Realizó Cotización de Vuelo</label>
                                    </div>
                                </div>

                                <div class="timeline-footer" style="text-align: right;">
                                    <button name="btnGuardarCotizacion" id="btnGuardarCotizacion"
                                        class="btn btn-info btn-sm" style="color: white">Guardar</button>
                                    <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</div>


<!-- END timeline item -->

<?php
include_once '../cliente/modalCliente.php';
 include_once './modal-aerolinea.php';
 include_once './modal-tipoClase.php';
 include_once './modal-tipoViaje.php';
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

<script>
function OpcAvanzada() {
    let x = $("#insertarOpcion").val();
    let seleccion = $("<option></option>").val(x).text(x);
    $("#opc_avanzadas").append(seleccion).trigger('change');
}
</script>

<!-- jquery-validation -->
<script src="<?= $base_url ?>js/mdtimepicker.js"></script> <!-- reloj -->

<!-- INICIO DE SCRIPT PARA REGISTRO DE USUARIO -->
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<script src="<?= $base_url ?>js/controladores/client/registro-cliente.js"></script>
<script src="<?= $base_url ?>js/controladores/client/comboUsuario.js"></script>
<!-- FIN DE SCRIPT PARA REGISTRO DE USUARIO -->

<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>

<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/comboAerolinea.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/comboClase.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/comboViaje.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/mostrarCondiciones.js"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/vuelos/insertarCotizacion.js"></script>

<?php include_once '../../plantillas/cierre.php'; ?>