<?php 
include_once '../../config/parametros.php'; 
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php'; ?>
<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />

<style>
.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
}
</style>
<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>



<div class="content-wrapper" style="min-height: 1185.73px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Mantenimientos Registrados</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Mantenimientos Registrados</li>
                    </ol>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="row">
            <div class="col-12">


                <div class="card">
                    <div class="card-header">

                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div id="" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="tabla_mantenimientos" class="table table-bordered table-striped">
                                        <thead style="text-align: center;">
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Vehiculo</th>
                                                <th>Año</th>
                                                <th>Lugar</th>
                                                <th>Precio</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <!-- /.inicio de loading -->
                                        <div class="overlay-wrapper">
                                            <div id="loading" class="overlay"><i
                                                    class="fas fa-3x fa-sync-alt fa-spin"></i>

                                                <div class="text-bold pt-2">Cargando...
                                                </div>
                                            </div>
                                            <tbody id="tableBody" style="text-align: center;">
                                            </tbody>
                                        </div>
                                        <!-- /.fin de loading -->

                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </section>
</div>
<!-- End Modal Mostrar-->



<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
    <!-- Modal EDITAR-->
    <div class="modal fade" id="modal-editar">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="overlay-wrapper">

                    <div class="modal-header">
                        <h4 class="modal-title">Modificar Mantenimiento</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">

                        </div>
                        <div class="row">
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Fecha</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="fecha" name="fecha" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Vehiculo</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="vehiculo" name="vehiculo" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Año</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="anio" name="anio" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Placa</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="placa" name="placa" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Lugar donde se realizo mantenimiento</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="lugar" name="lugar"
                                            autocomplete="off">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Mantenimientos Realizados</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="mantenimientos"
                                            name="mantenimientos" autocomplete="off">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Piezas Cambiadas</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="piezas_cambiadasM"
                                            name="piezas_cambiadasM" autocomplete="off">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                        </div>


                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                        <button name="btnActualizar" id="btnActualizar" class="btn btn-info btn-sm"
                            style="color: white">Actualizar</button>
                    </div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- End Modal EDITAR-->
</form>


<form id="miFormularioReporte" name="miFormularioReporte" role="form" onsubmit="return false">
    <!-- Modal EDITAR-->
    <div class="modal fade" id="modal-reporte">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="overlay-wrapper">

                    <div class="modal-header">
                        <h4 class="modal-title">Mantenimiento Realizado:</h4>
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
                                                                <img src="<?= $base_url ?>img/logo-min.jpg" all
                                                                    rel="stylesheet" type="text/css">
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
                                                                <span class="h3">Datos Generales del Vehículo</span>
                                                                <table class="datos_cliente">
                                                                    <thead>
                                                                        <tr>
                                                                            <td>
                                                                                <p> </p>
                                                                                <label>Placa:</label>
                                                                                <p name="placaMantenimiento"
                                                                                    id="placaMantenimiento">
                                                                                </p>

                                                                            </td>
                                                                            <td><label>Año:</label>
                                                                                <p name="anioMantenimiento"
                                                                                    id="anioMantenimiento">
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <p> </p>
                                                                                <label>Marca:</label>
                                                                                <p name="marcaMantenimiento"
                                                                                    id="marcaMantenimiento"></p>
                                                                            </td>
                                                                            <td><label>Modelo:</label>
                                                                                <p name="modeloMantenimiento"
                                                                                    id="modeloMantenimiento"></p>
                                                                            </td>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table id="factura_detalle">
                                                    <thead>
                                                        <tr>
                                                            <th class="textcenter">Fecha</th>
                                                            <th class="textcenter">Lugar donde se realizó el
                                                                mantenimiento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="detalle_productos">
                                                        <tr>
                                                            <td class="textcenter"><label name="fechaMantenimiento"
                                                                    id="fechaMantenimiento"
                                                                    style="font-weight: normal;"></label></td>
                                                            <td class="textcenter"><label name="lugarMantenimiento"
                                                                    id="lugarMantenimiento"
                                                                    style="font-weight: normal;"></label></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table id="factura_detalle">
                                                    <thead>
                                                        <tr>
                                                            <th class="textcenter">Mantenimientos Realizados</th>
                                                            <th class="textcenter">Piezas Cambiadas</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="detalle_productos">
                                                        <tr>
                                                            <td class="textcenter"><label
                                                                    name="mantenimientosRealizados"
                                                                    id="mantenimientosRealizados"
                                                                    style="font-weight: normal;"></label>
                                                            </td>

                                                            <td class="textcenter"><label name="piezasMantenimiento"
                                                                    id="piezasMantenimiento"
                                                                    style="font-weight: normal;"></label>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table id="factura_detalle">
                                                    <tfoot id="detalle_totales">
                                                        <tr>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="3" class="textright"><label>TOTAL ($)</label>
                                                            </td>
                                                            <td class="textcenter"><label name="tot" id="tot"
                                                                    style="font-weight: normal;"></label></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                            <div class="row no-print">
                                                <div class="col-md-12">

                                                    <button target="_blank" id="doPrint" type="button"
                                                        class="btn btn-default"><i class="fas fa-print"></i>
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

<?php  
include_once '../../plantillas/footer.php';?>


<!-- SCRIPT ADICIONALES -->
<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/mostrarMantenimiento.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<!--Para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/controladores/agencia/mostrarInfo.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>


<?php  include_once '../../plantillas/cierre.php';?>