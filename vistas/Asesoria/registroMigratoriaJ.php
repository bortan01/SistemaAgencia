<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once  '../../plantillas/navbar.php';?>
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<link rel="stylesheet" href="<?= $base_url ?>plugins/toastr/toastr.min.css">
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/migratorioRe.css" all rel="stylesheet" type="text/css" />

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
<?php include_once '../../plantillas/barra_lateral.php';?>

<div class="wrapper">

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1>

                            <small> Registro de Información Migratoria</small>
                        </h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Información Migratoria</li>
                        </ol>
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <!-- ./row -->
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card card-primary card-tabs">
                            <div class="card-header p-0 pt-1">
                                <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                </ul>
                            </div>
                            <div class="card-body">
                                
                              
                                <form id="migratorio-form" name="register-form" onsubmit="return false"
                                    class="form-inline" role="form">

                                    
                                            <!-- text input -->
                                            <div class="form-group ">
                                                <div class="input-group">
                                                    <select name="id_cita" id="citas_dias" class="form-control"
                                                        required="true" style="width:1192px; margin-top: 20px; margin-left:2px;">
                                                    </select>
                                                </div>
                                            </div>
                                        
                                    
                                    <div class="tab-content" id="custom-tabs-one-tabContent">
                                

                                    </div>
                                    <!--fin de una pestaña-->

                                </form>
                                <div class="timeline-footer" style="text-align: right;">
                                    <button type="button" id="btnFormulario" class="btn btn-info btn-sm"
                                        style=" margin-top: 10px; color: white">Guardar</button>
                                    <button type="button" class="btn btn-danger btn-sm"
                                        style="margin-top: 10px; color: white" data-dismiss="modal">Cancelar</button>

                                    <button type="button" style="margin-top: 10px;" name="" id="btnRepote"
                                        class="btn btn-secondary" data-toggle="modal" data-target="#reporte_migratorio">
                                        <i class="fas fa-eye" style="color: white"></i>
                                    </button>

                                </div>
                            </div>
                      
                        </div>
                    </div>
                    <!-- /.card -->
                </div>
            </div>
        </section>
    </div>
</div>
<!--CODIGO DEL REPORTE-->
<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
    <!-- Modal Cotizacion Reporte-->
    <div class="modal fade" id="reporte_migratorio">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="overlay-wrapper">

                    <div class="modal-header">
                        <h4 class="modal-title">Formulario Migratorio:</h4>
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
                                                                <span class="h2">Agencia de Viajes Martínez Travels &
                                                                    Tours</span>
                                                                <p>Segunda Avenida Sur, Barrio El Centro, #4D a 150mts
                                                                    del Parquecito Infantil<br>Teléfono: +(503) 2319
                                                                    2338<br>info.ventas@martineztraveltours.com</p>

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
                                                <div id="crear_tablas">

                                                </div>
                                                <!--fin de crear tablas-->

                                            </div>
                                            <div class="row no-print">
                                                <div class="col-md-12">

                                                    <button target="_blank" id="doPrint" class="btn btn-default"><i
                                                            class="fas fa-print"></i>
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
<?php
  include_once '../../plantillas/footer.php';
?>
<!--SCRIPT PARA LOS REPORTES FIN-->
<div id="script"></div>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/toastr/toastr.min.js"></script>

<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/combo_formulario.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/ramas.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/input.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/preguntas.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/insertar-formulario.js"></script>
<!--para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>