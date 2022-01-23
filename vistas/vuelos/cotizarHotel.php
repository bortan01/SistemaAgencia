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

.add-margin {
    margin-right: 600px
}
</style>

<div class="content-wrapper" style="min-height: 1185.73px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Cotización de Hotel</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Cotización de Hotel</li>
                        <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                            id="botonAyudaCotizarHotel"> <i class="fas fa-question"></i></button>
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
                    <div class="overlay-wrapper">
                        <div id="loadingCotizarVehiculo" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                            <div class="text-bold pt-2">Cargando...
                            </div>
                        </div>
                        <div class="timeline">
                            <div>
                                <i class="fas fa-user bg-blue"></i>
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

                                        </div>
                                        <div class="row">
                                            <div class="col-sm-11">
                                                <!-- text input -->
                                                <div class="form-group multiple-form-group input-group">
                                                    <label>Hotel</label>
                                                    <div class="input-group">
                                                        <select name="id_hotel" id="comboHotel"
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
                                                        data-toggle="modal" data-target="#modalAgregarHotel"
                                                        style="margin-top: 10px; width: 100%;">+</button>
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                        <div class="col-sm-12">
                                       <div class="form-group">
                                          <label for="cars">Fecha de Entrada y Salida</label>
                                          <div class="input-group">
                                             <input class=" form-control" name="fecha_salida" id="fecha_salida">
                                          </div>
                                       </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <i class="fas fa-bed bg-green"></i>
                                <div class="timeline-item">
                                    <h3 class="timeline-header no-border"><a href="#">Habitaciones:</a></h3>
                                    <div class="timeline-body">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-star" style="color:#ffc107"></i><label>Suite
                                                        Principal</label>
                                                    <input type="number" class="form-control" name="suite" id="suite"
                                                        min=0>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#28a745"></i><label>Habitación
                                                        Individual</label>
                                                    <input type="number" class="form-control" name="individual"
                                                        id="individual" min=0>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#c82333"></i><i
                                                        class="fas fa-user" style="color:#c82333"></i> <label>Habitación
                                                        doble</label>
                                                    <input type="number" class="form-control" name="doble" id="doble"
                                                        min=0>
                                                </div>
                                            </div>

                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#28a745"></i> <i
                                                        class="fas fa-user" style="color:#28a745"></i></i>
                                                    <label>Habitación Doble</label>
                                                    <input type="number" class="form-control" name="doble-indivudual"
                                                        id="doble-indivudual" min=0>
                                                </div>
                                            </div>

                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#28a745"></i> <i
                                                        class="fas fa-user" style="color:#28a745"></i> <i
                                                        class="fas fa-user" style="color:#28a745"></i><label>Habitación
                                                        Triple</label>
                                                    <input type="number" class="form-control" name="triple-individual"
                                                        id="triple-individual" min=0>
                                                </div>
                                            </div>

                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#c82333"></i><i
                                                        class="fas fa-user" style="color:#c82333"></i> <i
                                                        class="fas fa-user" style="color:#28a745"></i><label>Habitación
                                                        Triple</label>
                                                    <input type="number" class="form-control" name="triple" id="triple"
                                                        min=0>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#28a745"></i> <i
                                                        class="fas fa-user" style="color:#28a745"></i> <i
                                                        class="fas fa-user" style="color:#28a745"></i> <i
                                                        class="fas fa-user" style="color:#28a745"></i><label>Habitación
                                                        Cuádruple </label>
                                                    <input type="number" class="form-control" name="cuatro-individual"
                                                        id="cuatro-individual" min=0>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#c82333"></i><i
                                                        class="fas fa-user" style="color:#c82333"></i> <i
                                                        class="fas fa-user" style="color:#c82333"></i><i
                                                        class="fas fa-user" style="color:#c82333"></i><label>Habitación
                                                        Cuádruple</label>
                                                    <input type="number" class="form-control" name="cuatro-doble"
                                                        id="cuatro-doble" min=0>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#28a745"></i><label>Cama
                                                        Individual Extra</label>
                                                    <input type="number" class="form-control" name="extra" id="extra"
                                                        min=0>
                                                </div>
                                            </div>
                                            <div class="col-sm-4"
                                                style="display: flex; align-items: center;  justify-content: center;">
                                                <div class="form-group">
                                                    <i class="fas fa-star" style="color:#ffc107"></i><label>Cama Doble
                                                        (Matrimonial)</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-4"
                                                style="display: flex; align-items: center;  justify-content: center;">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#28a745"></i><label>Camas
                                                        Individuales</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-4"
                                                style="display: flex; align-items: center;  justify-content: center;">
                                                <div class="form-group">
                                                    <i class="fas fa-user" style="color:#c82333"></i><i
                                                        class="fas fa-user" style="color:#c82333"></i><label>Camas
                                                        Dobles</label>
                                                </div>
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
                                    <h3 class="timeline-header"><a href="#">Servicios Adicionales</a></h3>
                                    <div class="timeline-body">
                                        <div class="row">
                                            <div class="col-sm-7">
                                                <div class="form-group">
                                                    <label>Servicios Adicionales</label>
                                                    <div class="select2-danger">
                                                        <select class="select2" multiple="multiple" name="opc_avanzadas"
                                                            id="opc_avanzadas" data-placeholder="Seleccione"
                                                            data-dropdown-css-class="select2-danger"
                                                            style="width: 100%;">
                                                            <option>Vista al Jardín</option>
                                                            <option>Aire acondicionado</option>
                                                            <option>Baño en suite</option>
                                                            <option>TV de pantalla plana</option>
                                                            <option>Wifi gratis</option>
                                                            <option>Artículos de tocador gratuitos</option>
                                                            <option>Baño en suite</option>
                                                            <option>Ducha</option>
                                                            <option>Caja fuerte</option>
                                                            <option>Enchufe cerca de la cama</option>
                                                            <option>Juegos de mesa/rompecabezas</option>
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
                                    <div class="col-sm-6">
                                        <!-- text input -->
                                        <div class="hidden">
                                            <label name="detalle" id="detalle">Realizó Cotización de Hotel</label>
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
            </div>
        </form>
    </section>
</div>


<!-- END timeline item -->

<?php
include_once '../../vistas/ayuda/modal-ayuda.php';
include_once '../cliente/modalCliente.php';

include_once '../../plantillas/footer.php';
?>

<script>
$(function() {
    $('.select2').select2()

    //Initialize Select2 Elements
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    })
    

})
</script>

<script>
function OpcAvanzada() {
    let x = $("#insertarOpcion").val();
    let seleccion = $("<option></option>").val(x).text(x);
    $("#opc_avanzadas").append(seleccion).trigger('change');
}
</script>

<script>
     var fecha = new Date();
        var hoy = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());

        $('#fecha_salida').daterangepicker({
            minDate: hoy,
            locale: {
                format: 'DD/MM/YYYY',
                separator: " - ",
                applyLabel: "Aplicar",
                cancelLabel: "Cancelar",
                fromLabel: "De",
                toLabel: "A",
                customRangeLabel: "Custom",
                
                daysOfWeek: [
                    "Dom",
                    "Lun",
                    "Mar",
                    "Mie",
                    "Jue",
                    "Vie",
                    "Sab"
                ],
                monthNames: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 0
            }
        });
</script>

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
<script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>

<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/vuelos/insertarCotizacion.js"></script>

<?php include_once '../../plantillas/cierre.php'; ?>