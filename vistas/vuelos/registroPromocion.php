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
                    <h1>Promoción de Vuelo</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Promoción de Vuelo</li>
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
                            <i class="fas fa-plane bg-blue"></i>
                            <div class="timeline-item">

                                <h3 class="timeline-header"><a href="#">Datos Generales</a></h3>

                                <div class="timeline-body">
                                    <div class="row">


                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Nombre de Promoción</label>
                                                <input type="text" class="form-control" name="nombrePromocion"
                                                    id="nombrePromocion" placeholder="Digite nombre de la Promoción">
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>País</label>
                                                <input type="text" class="form-control" name="nombrePais"
                                                    id="nombrePais" placeholder="Digite nombre del País">
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Lugar de Salida</label>
                                                <input type="text" class="form-control" name="salida" id="salida"
                                                    placeholder="Digite lugar de salida">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Fecha Disponible</label>
                                                <input type="date" class="form-control" name="fechaDisponible"
                                                    id="fechaDisponible">
                                            </div>
                                        </div>
                                        <div class="col-sm-3">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>Precio</label>
                                                <input type="number" class="form-control" name="precioPromocion"
                                                    id="precioPromocion" min=1>
                                            </div>
                                        </div>
                                        <div class="col-sm-5">
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
                                        <div class="col-sm-5">
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
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Descripción de Promoción</label>
                                                <textarea class="textarea" name="desPromocion" id="desPromocion"
                                                    placeholder="Describa en que consiste la promoción"
                                                    style="width: 100%; height: 50px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
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
                                <div class="col-sm-6">
                                    <!-- text input -->
                                    <div class="hidden">
                                        <label name="detalle" id="detalle">Registro Promoción de Vuelo</label>
                                    </div>
                                </div>

                                <div class="timeline-footer" style="text-align: right;">
                                    <button name="btnguardar" id="btnguardar" class="btn btn-info btn-sm"
                                        style="color: white">Guardar</button>
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

 include_once './modal-aerolinea.php';
 include_once './modal-tipoClase.php';
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
<!-- jquery-validation -->

<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>

<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/comboAerolinea.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/comboClase.js"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/vuelos/insertarPromocion.js"></script>

<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>

<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>



<?php include_once '../../plantillas/cierre.php'; ?>