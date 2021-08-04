<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
    type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"
    type="text/css" />
<style>
.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
}
</style>
<?php 
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>


<div class="content-wrapper" style="min-height: 1185.73px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Preguntas Cerrrada Registradas</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Preguntas Cerradas</li>
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
                        <h3 class="card-title">Datos de las preguntas</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div id="" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12">
                                    <table id="tabla_cerrradas" class="table table-bordered table-striped">
                                        <thead style="text-align: center;">
                                            <tr>
                                                <th>Pregunta</th>
                                                <th>Rama</th>
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


    <div id="modal-editar" class="modal fade" role="dialog" style="overflow-y: scroll;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div id="loadingActualizar" class="overlay">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                    <div class="text-bold pt-2">Cargando...
                    </div>
                </div>
                <div class="modal-header">
                    <h4 class="modal-tittle">Detalle de la Pregunta</h4>
                </div>
                <form id="register-form" name="register-form" onsubmit="return false">
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Rama de la Pregunta</label>
                                    <div class="input-group">
                                        <select name="id_rama" id="id_rama" class="form-control">
                                            <option disabled selected>Seleccione</option>
                                        </select>
                                    </div>
                                    <!-- /.input group -->
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Pregunta</label>
                                    <div class="input-group">
                                        <input id="pregunta" name="pregunta" type="text" class="form-control"
                                            autocomplete="off"><br>

                                    </div>
                                    <input id="id_pregunta" name="id_pregunta" type="hidden">
                                    <!-- /.input group -->
                                </div>
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-sm-10">
                                <div class="form-group">
                                    <label>Opciones de Respuesta</label>
                                    <div class="input-group">
                                        <select class="select2" name="opcion_respuesta[]" id="combo_cerrada"
                                            multiple="multiple" data-placeholder="Seleccione" style="width:100%;"
                                            aria-hidden="true">

                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div class="col-sm-2" style="top: 32px; left: 12px;">

                                <button type="button" name="" class="btn btn-success" id="add"><i class=""
                                        style="color: white"></i>+</button>
                                <!-- /.input group -->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button name="btnActualizar" id="btnActualizar" class="btn btn-info btn-sm"
                            style="color: white">Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div id="modal-opciones" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-tittle">Agregar opciones</h4>
                </div>

                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Opciones de respuestas</label>
                                <div class="input-group">
                                    <input id="opcion" name="opcion" type="text" class="form-control" autocomplete="off"
                                        placeholder="Digite la opción">
                                </div>
                                <!-- /.input group -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button name="btnActualizar" id="agregar" class="btn btn-info btn-sm"
                        style="color: white">Agregar</button>
                    <button type="button" class="btn btn-danger btn-sm" style="color: white"
                        data-dismiss="modal">Cerrar</button>

                </div>

            </div>
        </div>
    </div>
    <script type="text/javascript">
    $(document).on('click', '#add', function() {
        $('#modal-opciones').modal('show');
    });
    </script>


    <!----/********************-->
</div>
<!-- /.modal-dialog -->
</div>
<!-- End Modal Mostrar-->
</form>
<?php
  include_once '../../plantillas/footer.php';
?>

<!-- SCRIPT ADICIONALES -->

<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/tabla-cerrada.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/agregar-opciones.js"></script>
<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>