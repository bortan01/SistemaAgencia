<?php 
include_once '../../config/parametros.php'; 
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php';
?>
<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/mdtimepicker.css" rel="stylesheet" type="text/css"> <!-- reloj -->
<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>

<style>
.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
}

.hidden {
    display: none;
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
                    <h1>Cotizaciones de Vehiculos Registradas</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Cotizaciones Registradas</li>
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
                        <h3 class="card-title">Datos Generales</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div id="" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="tabla_cotizacionesA" class="table table-bordered table-striped">
                                        <thead style="text-align: center;">
                                            <tr>
                                                <th>Cliente</th>
                                                <th>Vehiculo</th>
                                                <th>Año</th>
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


<form id="formularioEditar" name="formularioEditar" role="form" onsubmit="return false">
    <!-- Modal EDITAR-->
    <div class="modal fade" id="modal-editar">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="overlay-wrapper">
                    <div id="loadingActualizar" class="overlay">
                        <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                        <div class="text-bold pt-2">Cargando...
                        </div>
                    </div>
                    <div class="modal-header">
                        <h4 class="modal-title">Modificar Cotización</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Cliente</label>
                                    <div class="input-group">
                                        <input id="nombre" name="nombre" type="text" class="form-control" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Vehículo</label>
                                    <div class="input-group">
                                        <input id="nombreVehiculo" name="nombreVehiculo" type="text"
                                            class="form-control" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Año</label>
                                    <div class="input-group">
                                        <input id="anio" name="anio" type="text" class="form-control" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Dirección de Recogida</label>
                                    <div class="input-group">
                                        <input id="direccion_recogida" name="direccion_recogida" type="text"
                                            class="form-control">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Fecha</label>
                                    <div class="input-group">
                                        <input id="fechaRecogida" name="fechaRecogida" type="text" class="form-control"
                                            disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Hora Recogida</label>
                                    <div class="input-group clockpicker" data-autoclose="true">
                                        <input type="text" id="HoraRecogida" name="HoraRecogida" class="form-control"
                                            value="08:00" />

                                    </div>

                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Dirección de Devolución</label>
                                    <div class="input-group">
                                        <input id="direccion_devolucion" name="direccion_devolucion" type="text"
                                            class="form-control">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Fecha</label>
                                    <div class="input-group">
                                        <input id="fechaDevolucion" name="fechaDevolucion" type="text"
                                            class="form-control" disabled>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Hora Devolución</label>
                                    <div class="input-group clockpicker" data-autoclose="true">
                                        <input type="text" id="HoraDevolucion" name="HoraDevolucion"
                                            class="form-control" value="08:00" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Características</label>
                                    <textarea class="textarea" name="caracteristicas" id="caracteristicas"
                                        style="width: 100%; height: 50px; font-size: 16px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Descuentos (%)</label>
                                    <div class="input-group">
                                        <input id="descuentosA" name="descuentosA" type="number" min=0
                                            class="form-control">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Total ($)</label>
                                    <div class="input-group">
                                        <input id="totalA" name="totalA" type="number" min=0 class="form-control">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Respuesta</label>
                                    <textarea class="textarea" name="respuestaA" id="respuestaA"
                                        style="width: 100%; height: 50px; font-size: 16px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
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

<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
    <!-- Modal Cotizacion Reporte-->
    <div class="modal fade" id="modal-cotizacion">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="overlay-wrapper">

                    <div class="modal-header">
                        <h4 class="modal-title">Cotización:</h4>
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
                                                                <p style="margin: 1px;display:inline;"
                                                                    name="direccion_a" id="direccion_a"></p>
                                                                <p style="margin: 1px;display:inline:float:right"
                                                                    name="telefono_a" id="telefono_a">
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
                                                                <span class="h3">Datos Generales del Cliente</span>
                                                                <table class="datos_cliente">
                                                                    <thead>
                                                                        <tr>
                                                                            <td>
                                                                                <p> </p>
                                                                                <label>Cliente:</label>
                                                                                <p name="nombreC" id="nombreC">
                                                                                </p>

                                                                            </td>
                                                                            <td><label>DUI:</label>
                                                                                <p name="dui-cliente" id="dui-cliente">
                                                                                </p>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <p> </p>
                                                                                <label>Teléfono:</label>
                                                                                <p name="telefonoC" id="telefonoC"></p>
                                                                            </td>
                                                                            <td><label>Email:</label>
                                                                                <p name="emailC" id="emailC"></p>
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
                                                            <th class="textcenter">Vehiculo</th>
                                                            <th class="textcenter">Año</th>
                                                            <th class="textcenter">Caracteristicas</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="detalle_productos">

                                                        <tr>
                                                            <td class="textcenter"><label name="nombreVehiculoC"
                                                                    id="nombreVehiculoC"
                                                                    style="font-weight: normal;"></label></td>
                                                            <td class="textcenter"><label name="anioC" id="anioC"
                                                                    style="font-weight: normal;"></label></td>
                                                            <td class="textcenter"><label name="caracteristicasC"
                                                                    id="caracteristicasC"
                                                                    style="font-weight: normal;"></label></td>

                                                        </tr>

                                                    </tbody>

                                                </table>

                                                <table id="factura_detalle">
                                                    <thead>
                                                        <tr>
                                                            <th class="textcenter">Dirección de Recogida</th>
                                                            <th class="textcenter">Fecha</th>
                                                            <th class="textcenter">Hora</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="detalle_productos">

                                                        <tr>
                                                            <td class="textcenter"><label name="direccion_recogidaC"
                                                                    id="direccion_recogidaC"
                                                                    style="font-weight: normal;"></label></td>
                                                            <td class="textcenter"><label name="fechaRecogidaC"
                                                                    id="fechaRecogidaC"
                                                                    style="font-weight: normal;"></label></label></td>
                                                            <td class="textcenter"><label name="HoraRecogidaC"
                                                                    id="HoraRecogidaC"
                                                                    style="font-weight: normal;"></label></label></td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table id="factura_detalle">
                                                    <thead>
                                                        <tr>
                                                            <th class="textcenter">Dirección de Devolución</th>
                                                            <th class="textcenter">Fecha</th>
                                                            <th class="textcenter">Hora</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody id="detalle_productos">

                                                        <tr>
                                                            <td class="textcenter"><label name="direccion_devolucionC"
                                                                    id="direccion_devolucionC"
                                                                    style="font-weight: normal;"></label>
                                                            </td>
                                                            <td class="textcenter"><label name="fechaDevolucionC"
                                                                    id="fechaDevolucionC"
                                                                    style="font-weight: normal;"></label></td>
                                                            <td class="textcenter"><label name="HoraDevolucionC"
                                                                    id="HoraDevolucionC"
                                                                    style="font-weight: normal;"></label>
                                                            </td>


                                                        </tr>
                                                    </tbody>
                                                </table>



                                                <table id="factura_detalle">

                                                    <tfoot id="detalle_totales">

                                                        <tr>
                                                            <td colspan="3" class="textright"><label>DESCUENTOS
                                                                    (%)</label>
                                                            </td>
                                                            <td class="textcenter"><label name="descuent" id="descuent"
                                                                    style="font-weight: normal;"></label></td>
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

<!-- /.MODALES DE BOTONES -->
<!-- /.Cierre de MODAL -->


<?php 
 
 include_once '../../plantillas/footer.php';?>


<script>
$(function() {


    $(document).ready(function() {
        $('#HoraRecogida').mdtimepicker(); //Initializes the time picker
    });

    $(document).ready(function() {
        $('#HoraDevolucion').mdtimepicker(); //Initializes the time picker
    });

})
</script>



<!-- SCRIPT ADICIONALES -->
<script src="<?= $base_url ?>js/mdtimepicker.js"></script> <!-- reloj -->
<script src="<?= $base_url ?>plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"></script>

<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>

<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>

<script type="text/javascript" src="<?= $base_url?>js/controladores/vehiculos/cotizacionMostrar.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/agencia/mostrarInfo.js"></script>



<?php  include_once '../../plantillas/cierre.php';?>