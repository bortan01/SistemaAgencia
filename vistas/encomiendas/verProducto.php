<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../session/isEmpleado.php';
?>

<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />
<?php
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';

?>

<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Productos Registrados</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Productos Registrados</li>
                        <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                            id="botonAyudaMostrarProductos"> <i class="fas fa-question"></i></button>
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
                    <!--para filtrar los productos activos e inactivos-->
                    <div class="card-header">
                        <div class="row">
                            <div class="form-check mx-auto">
                                <input class="form-check-input" type="radio" name="radioProducto"
                                    id="radioUsuarioCliente" value="activo" checked>
                                <label class="form-check-label" for="radioProductoActivo">
                                    PRODUCTOS ACTIVOS
                                </label>
                                <button type="button" style="margin-top: -4px;" name="" id="btnRepoteActivo"
                                    class="btn btn-secondary" data-toggle="modal" data-target="#reporte_productos">
                                    <i class="fas fa-eye" style="color: white"></i>
                                </button>
                            </div>
                            <div class="form-check mx-auto">
                                <input class="form-check-input" type="radio" name="radioProducto"
                                    id="radioUsuarioInactivo" value="inactivo">
                                <label class="form-check-label" for="radioProductoInactivo">
                                    PRODUCTOS INACTIVOS
                                </label>
                                <button type="button" style="margin-top: -4px;" name="" id="btnRepoteInactivo"
                                    class="btn btn-secondary" data-toggle="modal" data-target="#reporte_productos">
                                    <i class="fas fa-eye" style="color: white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <!--*******************************fin de filtrar esos productos***-->
                    <div class="card-header">
                        <h3 class="card-title">Datos de los productos</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div id="" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="tabla_productosMo" class="table table-bordered table-striped">
                                        <thead style="text-align: center;">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Tarifa($)</th>
                                                <th>Unidad de medida</th>
                                                <th>Acciones</th>
                                                <th>estado</th>
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

        <!--modal alternativo para modificar producto-->
        <div class="modal fade" id="modificacion-producto" tabindex="-1" role="dialog"
            aria-labelledby="modal-eventLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="overlay-wrapper">
                        <div id="loadingModificarProducto" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                            <div class="text-bold pt-2">Cargando...
                            </div>
                        </div>
                        <div class="modal-header">
                            <h5 class="modal-title" id="">Modificar producto</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form id="register-form" name="register-form" onsubmit="return false" role="form">
                            <div class="modal-body">
                                <form id="register-form" name="register-form" onsubmit="return false">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Nombre</label>
                                                <input name="nombre_producto" id="producto" type="text"
                                                    class="form-control" placeholder="Introduzca el nombre"
                                                    autocomplete="off">
                                                <input name="id_producto" id="id_producto" type="hidden">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>Tarifa</label>
                                                <input name="tarifa" id="tarifa" type="number" min=0
                                                    class="form-control" placeholder="Introduzca la tarifa"
                                                    autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="hidden">
                                                <label name="detalle" id="detalle">Modifico un Producto</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form id="unidad-form" name="register-form" onsubmit="return false">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <label>Unidad de medida</label>
                                                    <select name="id_unidad" id="id_unidad"
                                                        class="select2 select2-hidden-accessible form-control"
                                                        data-placeholder="Seleccione" style="width: 100%;">
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-5">
                                            <div class="form-group">
                                                <label>Nueva Unidad</label>
                                                <input name="unidad_medida" id="unidad_medida" type="text"
                                                    class="form-control" placeholder="Introduzca la unidad"
                                                    autocomplete="off">
                                            </div>
                                        </div>
                                        <div class="col-sm-1">
                                            <br>
                                            <span class="input-group-btn">
                                                <button type="button" class="btn btn-success btn-add" id="btn-unidad"
                                                    name="btn-unidad" style="margin-top: 7px; width: 119%;">+</button>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="btnActualizarProducto" class="btn btn-info btn-sm"
                                    style="color: white">Actualizar</button>
                                <button type="button" class="btn btn-danger btn-sm" style="color: white"
                                    data-dismiss="modal">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--fin de modal de enventos-->
    </section>
    <!-- /.content -->
</div>


<?php
  include_once '../../vistas/ayuda/modal-ayuda.php';
  include_once '../../plantillas/footer.php';
?>
<!-- SCRIPT ADICIONALES -->

<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/tabla-product.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/insertar-unidad.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/combo-unidad.js"></script>
<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<!--para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>


<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>