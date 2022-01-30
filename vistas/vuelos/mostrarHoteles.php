<?php 
include_once '../../config/parametros.php'; 
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php'; 
?>
<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
    type="text/css" />


<link href="<?= $base_url ?>css/miniatura-tabla.css" media="all" rel="stylesheet" type="text/css" />

<link href="<?= $base_url ?>css/hover.css" media="all" rel="stylesheet" type="text/css" />

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
                    <h1>Hoteles Registrados</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Hoteles Registrados</li>
                        <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                            id="botonAyudaMostrarHoteles"> <i class="fas fa-question"></i></button>
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
                                    <table id="tabla_promociones" class="table table-bordered table-striped">
                                        <thead style="text-align: center;">
                                            <tr>
                                                <th>Nombre de Hotel</th>
                                                <th>País de Destino</th>
                                                <th>Precio por Noche ($)</th>
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

<form id="promocionesEditar" name="promocionesEditar" role="form" onsubmit="return false">
    <!-- Modal EDITAR-->
    <div class="modal fade" id="modal-editar">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <div class="overlay-wrapper">
                    <div id="loadingActualizarPromociones" class="overlay">
                        <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                        <div class="text-bold pt-2">Cargando...
                        </div>
                    </div>
                    <div class="modal-header">
                        <h4 class="modal-title">Modificar Hotel</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                        <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Nombre de Hotel</label>
                                    <div class="input-group">
                                        <input id="hotelito" name="hotelito" type="text" class="form-control"
                                            >
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Precio por Noche</label>
                                    <div class="input-group">
                                        <input id="precio" name="precio" type="number" min=1 class="form-control">
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                           
                            
                           
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>País de Destino</label>
                                    <div class="input-group">
                                        <input id="pais" name="pais" type="text" class="form-control" >
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                           
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Descripción de Hotel</label>
                                    <textarea class="textarea" name="descripcion" id="descripcion"
                                        style="width: 100%; height: 50px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
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

<form id="formularioImagenes" name="formularioImagenes" enctype="multipart/form-data">
    <!-- Modal EDITAR-->
    <div class="modal fade" id="modal-imagenes">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Editar Imágenes</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="file-loading">
                        <input id="kv-explorer" name="foto" type="file" multiple>
                    </div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- End Modal EDITAR-->
</form>

<?php 
include_once '../../vistas/ayuda/modal-ayuda.php';
include_once '../../plantillas/footer.php';?>

<!-- SCRIPT ADICIONALES -->


<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>

<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>

<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/hoteles-app.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>



<?php  include_once '../../plantillas/cierre.php';?>