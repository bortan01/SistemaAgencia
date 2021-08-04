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
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper" style="min-height: 1185.73px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Registrar Sitio Turísticos</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="../../home.php">Inicio</a></li>
                        <li class="breadcrumb-item active">Registrar Sitio Turísticos</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <form id="miFormularioSitio" enctype="multipart/form-data" name="miFormularioSitio" role="form">
            <div class="row">
                <!-- <div class="offset-md-1"></div> -->
                <div class="col-md-12">
                    <div class="overlay-wrapper">
                        <div id="loadingSitio" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

                            <div class="text-bold pt-2">Cargando...
                            </div>
                        </div>
                        <div class="timeline">
                            <!-- timeline item -->
                            <div>
                                <i class="fas fa-umbrella-beach bg-blue"></i>
                                <div class="timeline-item">

                                    <h3 class="timeline-header"><a href="#">Datos Generales:</a></h3>

                                    <div class="timeline-body">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Nombre del sitio turístico</label>
                                                    <div class="input-group">
                                                        <input type="text"
                                                            placeholder="Digite el nombre del sitio Turístiico"
                                                            class="form-control" name="nombreSitio" id="nombreSitio">
                                                    </div>
                                                    <!-- /.input group -->
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label>Precio</label>
                                                    <div class="input-group">
                                                        <input type="number" min="0" class=" form-control"
                                                            name="precioSitio" value="1" id="precioSitio">
                                                    </div>
                                                    <!-- /.input group -->
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <div class="form-group">
                                                    <label>Tipo</label>
                                                    <select name="ComboTipoSitio" id="ComboTipoSitio"
                                                        class="select2 select2-hidden-accessible form-control"
                                                        data-placeholder="Seleccione el tipo" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-1">
                                                <br>
                                                <span class="input-group-btn">
                                                    <button type="button" class="btn btn-success btn-add"
                                                        id="btn-nuevoTipoSitio" name="btn-nuevoTipoSitio"
                                                        style="margin-top: 10px; width: 100%;">+</button>
                                                </span>
                                            </div>

                                            <div class="col-sm-5">
                                                <div class="form-group multiple-form-group input-group">
                                                    <label>Contacto</label>

                                                    <div class="input-group">
                                                        <select name="contacto_sitio" id="contacto_sitio"
                                                            class="select2 select2-hidden-accessible form-control"
                                                            data-placeholder="Seleccione el tipo" style="width: 100%;">
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-1">
                                                <br>
                                                <span class="input-group-btn">
                                                    <button type="button" class="btn btn-success btn-add"
                                                        id="btn-nuevoContactoSitio" name="btn-nuevoContactoSitio"
                                                        style="margin-top: 10px; width: 100%;">+</button>
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <!-- END timeline item -->
                            <!-- timeline item -->
                            <div>
                                <i class="fas fa-comments bg-red"></i>
                                <div class="timeline-item">

                                    <h3 class="timeline-header no-border"><a href="#">Información Adicional</a></h3>
                                    <div class="timeline-body">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="form-group">
                                                    <label>Descripción del Servicio</label>
                                                    <textarea name="descripcionSitio" id="descripcionSitio"
                                                        class="form-control" rows="3"
                                                        placeholder="Digitar aquí ..."></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <i class="fas fa-image bg-green"></i>
                                <div class="timeline-item">

                                    <h3 class="timeline-header no-border"><a href="#">Galería de Imágenes</a></h3>
                                    <div class="timeline-body">

                                        <div class="row">
                                            <div class="col-sm-12">

                                                <label>Seleccione Imágenes</label>
                                                <div class="file-loading">
                                                    <input type="file" multiple name="fotosSitios[]" id="fotosSitios">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-6">
                                        <!-- text input -->
                                        <div class="hidden">
                                            <label name="detalle" id="detalle">Registró Sitio Turístico</label>
                                        </div>
                                    </div>
                                    <!-- END TIME LINE BODY -->
                                    <div class="timeline-footer" style="text-align: right;">
                                        <button name="btnguardarSitio" id="btnguardarSitio" class="btn btn-info btn-sm"
                                            style="color: white">Guardar</button>
                                        <button class="btn btn-danger btn-sm" style="color: white">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- END timeline item -->
        </form>
    </section>
    <?php include_once './registro_tipo.php' ?>
    <?php include_once '../contactos/modal-contacto.php' ?>

</div>



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
<script src="<?= $base_url ?>plugins/asiento-bus/js/jquery.seat-charts.js"></script>
<script src="<?= $base_url ?>plugins/asiento-bus/js/admin-configuracion.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/sitios/registro-sitio.js"></script>
<script src="<?= $base_url ?>js/controladores/contactos/registro-contacto.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>