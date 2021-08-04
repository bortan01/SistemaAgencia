<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php';
include_once '../../plantillas/cabecera.php';
include_once  '../../plantillas/navbar.php'; ?>
<!--para el reloj-->
<link rel="stylesheet" type="text/css" href="<?= $base_url ?>css/bootstrap-clockpicker.css">
<link href="<?= $base_url ?>css/mdtimepicker.css" rel="stylesheet" type="text/css">
<!--para la subida de fotos al sistema-->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet" type="text/css" />
<!--alerta del sistema-->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet" type="text/css" />
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />

<?php
include_once '../../plantillas/barra_lateral.php';
?>
<div class="content-wrapper" style="min-height: 1185.73px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Registro de actualización de envió</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Actualización</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-md-4">
                <div class="timeline">
                    <!-- timeline item -->
                    <div id="titulo">
                        <i class="fas fa-address-book bg-blue"></i>
                        <div class="timeline-item">
                            <h3 class="timeline-header"><a href="#">Registro de información</a></h3>

                            <div class="timeline-body">
                                <form id="informacion-form" name="register-form" onsubmit="return false">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group multiple-form-group input-group">
                                                <label>Título</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" name="titulo_actu" id="titulo_actu" placeholder="Digite título">
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label>Fecha</label>
                                            <div class="input-group">
                                                <input type="date" name="fecha_actu" id="fecha_actu" class="form-control" disabled="true">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <div class="form-group">
                                                <label>Hora</label>
                                                <div class="input-group">
                                                    <div class="input-group clockpicker" data-autoclose="true">
                                                        <input type="text" id="hora_actu" name="hora_actu" class="form-control" />
                                                    </div>


                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="hidden">
                                                <label name="detalle" id="detalle">Registró un Actualización de envío</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="timeline-footer" style="text-align: right;">
                                        <button name="btn-informacion" id="btn-informacion" class="btn btn-info btn-sm" style="color: white">Guardar</button>
                                        <!-- DIV CHUCO <div id="entregar-div">-->
                                        <button name="btn-entregar" id="btn-entregar" class="btn btn-light btn-sm" style="color: white; background-color:#0E6251;">Entregar</button>
                                        <!-- DIV CHUCO </div>-->

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- END timeline item -->

                    <!-- timeline item -->
                    <div id="titulo">
                        <i class="fas fas fa-people-carry bg-red"></i>
                        <div class="timeline-item">
                            <h3 class="timeline-header"><a href="#">Historial de información</a></h3>

                            <div class="timeline-body" id="historias">


                            </div>
                        </div>

                    </div>
                    <!-- END timeline item -->
                </div>

            </div>
            <div class="col-md-8">
                <div class="timeline">
                    <!-- timeline item -->
                    <div id="formulario">
                        <i class="fas fa-address-card bg-blue"></i>
                        <div class="timeline-item">
                            <h3 class="timeline-header"><a href="#">Datos de Origen</a></h3>

                            <div class="timeline-body">
                                <form id="datosOrigen-form" name="register-form" onsubmit="return false">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group multiple-form-group input-group">
                                                <label class="text-success">Cliente</label>
                                                <div class="input-group">
                                                    <label id="nombre_cliente"></label>
                                                </div>
                                                <div class="input-group">
                                                    <input type="hidden" class="form-control" name="cliente" id="cliente" disabled="true">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="text-success">Teléfono</label>
                                            <div class="input-group">
                                                <label id="telefono"></label>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="text-success">Ciudad</label>
                                                <div class="input-group">
                                                    <label id="ciudad"></label>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="text-success">Código postal</label>
                                                <div class="input-group">
                                                    <label id="codigo"></label>
                                                </div>

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
                    <div id="formulario">
                        <i class="fas fa-people-arrows bg-red"></i>
                        <div class="timeline-item">
                            <h3 class="timeline-header"><a href="#">Datos de Destino</a></h3>

                            <div class="timeline-body">
                                <form id="datosDestino-form" name="register-form" onsubmit="return false">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group multiple-form-group input-group">
                                                <label class="text-success">Nombre Completo</label>
                                                <div class="input-group">
                                                    <label id="cliente_des"></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label class="text-success">Teléfono</label>
                                            <div class="input-group">
                                                <label id="telefono_des"></label>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="text-success">Ciudad</label>
                                                <div class="input-group">
                                                    <label id="ciudad_des"></label>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="text-success">Código postal</label>
                                                <div class="input-group">
                                                    <label id="codigo_des"></label>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="text-success">Dirección</label>
                                                <div class="input-group">
                                                    <label id="direccion"></label>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label class="text-success">Dirección alterna</label>
                                                <div class="input-group">
                                                    <label id="direccion_alterna"></label>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                    <!-- END timeline item -->
                    <!--END timeline item-->
                    <!-- timeline item -->
                    <div id="tabla">
                        <i class="fas fa-box-open bg-green"></i>
                        <div class="timeline-item">
                            <h3 class="timeline-header no-border"><a href="#">Mostrando Información de productos</a>
                            </h3>
                            <div class="timeline-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <div class="form-group">
                                                    <div class="input-group">
                                                        <input id="porcenaje" type="hidden" class="form-control">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table id="add-tabla" class="table table-bordered table-hover">
                                            <thead>
                                                <tr style="text-align: center;">
                                                    <th>Producto</th>
                                                    <th>Costo($)</th>
                                                    <th>Cantidad</th>
                                                    <th>Sub Total($)</th>
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
                            </div>
                            <br>
                            <div class="timeline-footer" style="text-align: right;">
                                <button type="button" style="margin-top: 10px;" name="" id="btnRepoteHistorial" class="btn btn-secondary" data-toggle="modal" data-target="#reporte_historial">
                                    <i class="fas fa-eye" style="color: white"></i>
                                </button>

                            </div>
                        </div>


                    </div>
                    <!-- END timeline item -->
                    <!-- /.timeline-label -->
                </div>
                <!-- END timeline item -->
            </div>
        </div>
    </section>
    <!--CODIGO DEL REPORTE-->
    <form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
        <!-- Modal Cotizacion Reporte-->
        <div class="modal fade" id="reporte_historial">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">

                    <div class="overlay-wrapper">

                        <div class="modal-header">
                            <h4 class="modal-title">Historial de envió:</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <section class="content">

                                    <div class="container-fluid" id="printDiv">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div id="page_pdf">
                                                    <table id="factura_head">
                                                        <tr>
                                                            <td class="logo_factura">
                                                                <div>
                                                                    <img src="<?= $base_url ?>img/logo-min.jpg" all rel="stylesheet" type="text/css">
                                                                </div>
                                                            </td>
                                                            <td class="info_empresa">
                                                                <div>
                                                                    <span class="h2" name="nombre_a" id="nombre_a"></span>
                                                                    <p>
                                                                    <p style="margin: 1px;display:inline;" name="direccion_a" id="direccion_a"></p>
                                                                    <p style="margin: 1px;display:inline:float:right" name="telefono_a" id="telefono_a">
                                                                    </p>
                                                                    <p name="email_a" id="email_a"></p>
                                                                    </p>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    </table>
                                                    <table id="factura_cliente">
                                                        <tr>
                                                            <td class="info_cliente">
                                                                <div class="round">
                                                                    <span class="h3">Datos Generales del Cliente
                                                                        Origen</span>
                                                                    <table class="datos_cliente">
                                                                        <thead>
                                                                            <tr>
                                                                                <td>
                                                                                    <p> </p>
                                                                                    <label>Cliente:</label>
                                                                                    <p name="nombreC" id="nombreC">
                                                                                    </p>

                                                                                </td>
                                                                                <td><label>Teléfono:</label>
                                                                                    <p name="telefonoC" id="telefonoC">
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <p> </p>
                                                                                    <label>Ciudad:</label>
                                                                                    <p name="ciudadC" id="ciudadC"></p>
                                                                                </td>
                                                                                <td><label>Código:</label>
                                                                                    <p name="codigoC" id="codigoC"></p>
                                                                                </td>
                                                                            </tr>
                                                                        </thead>
                                                                    </table>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    </table>
                                                    <table id="factura_destino">
                                                        <tr>
                                                            <td class="info_cliente">
                                                                <div class="round">
                                                                    <span class="h3">Datos Generales del Cliente
                                                                        Destino</span>
                                                                    <table class="datos_cliente">
                                                                        <thead>
                                                                            <tr>
                                                                                <td>
                                                                                    <p> </p>
                                                                                    <label>Cliente:</label>
                                                                                    <p name="nombreD" id="nombreD">
                                                                                    </p>

                                                                                </td>
                                                                                <td><label>Télefono:</label>
                                                                                    <p name="telefonoD" id="telefonoD">
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <p> </p>
                                                                                    <label>Ciudad:</label>
                                                                                    <p name="ciudadD" id="ciudadD"></p>
                                                                                </td>
                                                                                <td><label>Código:</label>
                                                                                    <p name="codigoD" id="codigoD"></p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <p> </p>
                                                                                    <label>Dirección:</label>
                                                                                    <p name="direccionD" id="direccionD"></p>
                                                                                </td>
                                                                                <td><label>Dirección Alterna:</label>
                                                                                    <p name="alternaD" id="alternaD">
                                                                                    </p>
                                                                                </td>
                                                                            </tr>
                                                                        </thead>
                                                                    </table>
                                                                </div>
                                                            </td>

                                                        </tr>
                                                    </table>
                                                    <span class="h3">Información de envió</span>
                                                    <table id="historial_envio">
                                                        <thead>
                                                            <tr>
                                                                <th class="textcenter">Descripción</th>
                                                                <th class="textcenter">Hora</th>
                                                                <th class="textcenter">Fecha</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="detalle_productos">

                                                        </tbody>

                                                    </table>
                                                    <span class="h3">Productos Enviados</span>
                                                    <table id="factura_detalle">
                                                        <thead>
                                                            <tr>
                                                                <th class="textcenter">Producto</th>
                                                                <th class="textcenter">Costo</th>
                                                                <th class="textcenter">Cantidad</th>
                                                                <th class="textcenter">Sub Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="detalle_productos">

                                                        </tbody>

                                                    </table>

                                                    <table id="factura_detalle">

                                                        <tfoot id="detalle_totales">

                                                            <tr>
                                                                <td colspan="3" class="textright"><label>Total
                                                                        Encomienda($)</label>
                                                                </td>
                                                                <td class="textcenter"><label name="descuent" id="totalEncomienda" style="font-weight: normal;"></label></td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="3" class="textright"><label>TOTAL
                                                                        ($)</label>
                                                                </td>
                                                                <td class="textcenter"><label name="tot" id="tot" style="font-weight: normal;"></label></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>

                                                </div>
                                                <div class="row no-print">
                                                    <div class="col-md-12">

                                                        <button target="_blank" id="doPrint" type="button" class="btn btn-default"><i class="fas fa-print"></i>
                                                            Imprimir</button>

                                                        <div id="editor"></div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Modal EDITAR-->
    </form>
    <!--FIN DE CODIGO DE REPORTE-->

</div>

<?php
include_once '../../plantillas/footer.php';
?>
<script type="text/javascript">
    $(document).on('click', '#producto-add', function() {
        $('#add-producto').modal('show');
        $('#loadingActualizar').hide();
    });

    $(document).ready(function() {
        $('#hora_actu').mdtimepicker(); //Initializes the time picker
    });

    ///fecha actual y hora
    let fechaActu = new Date(); //Fecha actual
    let mesActu = fechaActu.getMonth() + 1; //obteniendo mes
    let diaActu = fechaActu.getDate(); //obteniendo dia
    let anoActu = fechaActu.getFullYear(); //obteniendo año
    let horaActu = fechaActu.getHours();
    let minutosActu = fechaActu.getMinutes();
    if (diaActu < 10)
        diaActu = '0' + diaActu; //agrega cero si el menor de 10
    if (mesActu < 10)
        mesActu = '0' + mesActu //agrega cero si el menor de 10
    document.getElementById('fecha_actu').value = anoActu + "-" + mesActu + "-" + diaActu;
    document.getElementById('hora_actu').value = horaActu + ":" + minutosActu
</script>

<!--alerta del sistema-->
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<!--********************reloj********************-->
<script src="<?= $base_url ?>js/mdtimepicker.js"></script>
<!--validaciones del sistema-->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<!--para la mascara-->
<script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>
<!--para las subida de fotos-->
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<!--Script de los procedimientos del sistema-->
<script type="text/javascript" src="<?= $base_url ?>js/controladores/agencia/mostrarInfo.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/actu-envio-procesos.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script type="text/javascript" src="<?= $base_url ?>js/controladores/encomienda/combo-unidad.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/producto.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/insertar-unidad.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/insertar-productoEnco.js"></script>
<!--Para los reportes-->
<script type="text/javascript" src="<?= $base_url ?>js/imprimir.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>