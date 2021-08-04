<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php';
include_once '../../plantillas/cabecera.php';
?>

<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<link rel="stylesheet" href="<?= $base_url ?>plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css">


<link rel="stylesheet" href="<?= $base_url ?>plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">

<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
    type="text/css" />


<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>


<div class="content-wrapper" style="min-height: 1185.73px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Registro de Vehículos</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Registro</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
            <div class="row">
                <div class="col-md-12">
                    <div class="timeline">
                        <div>
                            <i class="fas fa-car bg-blue"></i>
                            <div class="timeline-item">

                                <h3 class="timeline-header"><a href="#">Datos Generales</a></h3>

                                <div class="timeline-body">
                                    <div class="row">


                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Renta Cars</label>
                                                <div class="input-group">
                                                    <select name="id_renta" id="id_renta"
                                                        class="select2 select2-hidden-accessible form-control"
                                                        data-placeholder="Seleccione" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-3">
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
                                        <div class="col-sm-3">
                                            <div class="form-group">
                                                <label>Año</label>
                                                <input type="number" class="form-control" min="2010"
                                                    max=<?php echo date("Y"); ?> name="anio" id="anio"
                                                    autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Placa</label>
                                                <input type="text" class="form-control" placeholder="Introduzca placa"
                                                    name="placa" id="placa" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- select -->

                                            <div class="form-group multiple-form-group input-group">
                                                <label>Combustible</label>
                                                <div class="input-group">
                                                    <select name="comboCombustible" id="comboCombustible"
                                                        class="select2 select2-hidden-accessible form-control"
                                                        data-placeholder="Seleccione" style="width: 100%;">
                                                        <option>Gasolina</option>
                                                        <option>Diesel</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Color</label>
                                                <br>
                                                <input type="color" class="form-control" name="colorAuto"
                                                    id="colorAuto">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Kilometraje</label>
                                                <input type="number" class="form-control" min=10 name="kilometraje"
                                                    id="kilometraje" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <!-- select -->
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Transmición</label>
                                                <div class="input-group">
                                                    <select name="id_transmision" id="id_transmision"
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
                                                    data-toggle="modal" data-target="#modal-transmision"
                                                    style="margin-top: 10px; width: 100%;">+</button>
                                            </span>
                                        </div>
                                        <div class="col-sm-2">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Precio Diario</label>
                                                <input type="number" class="form-control" min=1 name="precio"
                                                    id="precio" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="form-group">
                                                <label>Pasajeros</label>
                                                <input type="number" class="form-control" min=1 max=60 name="pasajero"
                                                    id="pasajero" autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-2">
                                            <div class="form-group">
                                                <label>Puertas</label>
                                                <input type="number" class="form-control" min=1 max=5 name="puertas"
                                                    id="puertas" autocomplete="off">
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <!-- select -->
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Categoría</label>
                                                <div class="input-group">
                                                    <select name="id_categoria" id="id_categoria"
                                                        class="select2 select2-hidden-accessible form-control"
                                                        data-placeholder="Seleccione" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- END timeline item -->
                        <div>
                            <i class="fas fa-image bg-red"></i>
                            <div class="timeline-item">

                                <h3 class="timeline-header no-border"><a href="#">Galería de Imagenes</a></h3>
                                <div class="timeline-body">

                                    <div class="row">
                                        <div class="col-sm-12">

                                            <label>Seleccione Imagenes</label>
                                            <div class="file-loading">
                                                <input type="file" multiple name="fotos[]" id="fotos">
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- timeline item -->
                        <div>
                            <i class="fas fa-user bg-green"></i>
                            <div class="timeline-item">

                                <h3 class="timeline-header no-border"><a href="#">Opciones Avanzadas</a></h3>
                                <div class="timeline-body">
                                    <div class="row">

                                        <div class="col-sm-7">
                                            <div class="form-group">
                                                <label>Opciones Avanzadas</label>
                                                <div class="select2-danger">
                                                    <select class="select2" multiple="multiple" name="opc_avanzadas"
                                                        id="opc_avanzadas" data-placeholder="Seleccione"
                                                        data-dropdown-css-class="select2-danger" style="width: 100%;">
                                                        <option>Aire Acondicionado </option>
                                                        <option>Wifi </option>
                                                        <option>Equipo de Sonido </option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Nueva Opción</label>
                                                <input type="text" class="form-control" name="insertarOpc"
                                                    id="insertarOpc" placeholder="Insertar Nueva Opcion"
                                                    autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-0.7">
                                            <br>
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-add"
                                                    name="agregarOpcion" id="agregarOpcion" style="margin-top:8px;"
                                                    onclick="CambioOpciones()">Agregar</button>
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

                                <h3 class="timeline-header"><a href="#"> Información Adicional</a>
                                </h3>
                                <div class="timeline-body">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <textarea class="form-control" rows="3" id="descripcion"
                                                    name="descripcion"
                                                    placeholder="Digite Descripción del Vehiculo"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <textarea class="form-control" rows="3" id="detalleVehiculo" name="detalleVehiculo"
                                                    placeholder="Digite Detalles Adicionales del Vehiculo"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <!-- text input -->
                                        <div class="hidden">
                                            <label name="detalle" id="detalle">Registró un Vehículo</label>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="timeline-footer" style="text-align: right;">
                                        <button name="btnguardar" id="btnguardar" class="btn btn-info btn-sm"
                                            style="color: white">Guardar</button>
                                        <button class="btn btn-danger btn-sm" style="color: white">Cancelar</button>
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
  include_once './modal-transmision.php';
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

})


function CambioOpciones() {
    let x = $("#insertarOpc").val();
    let seleccion = $("<option></option>").val(x).text(x);
    $("#opc_avanzadas").append(seleccion).trigger('change');
}
</script>
<!-- jquery-validation -->

<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>

<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboMarca.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboRentaCars.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboModelo.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboTransmision.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/comboCategoria.js"></script>

<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>

<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/vehiculos/insertarVehiculo.js"></script>

<script src="<?= $base_url ?>plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>