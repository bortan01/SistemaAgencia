<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php';
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>

<link rel="stylesheet" href="<?= $base_url ?>dist/css/disponibilidad.css">

<style type="text/css" media="all">
h3,
h6 {
    display: inline;
}

.centrar {

    text-align: center;
}
</style>



<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1>Hoteles</h1>
                    <input type="hidden" id="fecha">

                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Disponibilidad de Hoteles</li>
                        <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                            id="botonAyudaDisponibilidadHoteles"> <i class="fas fa-question"></i></button>
                    </ol>
                </div>
            </div>
        </div>
        <!-- /.container-fluid -->
    </section>

    <section class="content">
        <form id="imagenPromociones" name="imagenPromociones" role="form" onsubmit="return false">
            <div class="container">
                <div class="row" id="contenedorPromociones">

                </div>
            </div>
        </form>
    </section>

</div>

<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
    <!-- Modal EDITAR-->
    <div class="modal fade" id="modal-editar">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

                <section class="content">

                    <!-- Default box -->
                    <div class="card card-solid">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <div id="imagenGrande" class="col-12">
                                    </div>
                                    <div id="imagenesPequenas" class="col-12 product-image-thumbs">

                                        <div class="product-image-thumb" id="0">

                                        </div>
                                        <div class="product-image-thumb" id="1">

                                        </div>
                                        <div class="product-image-thumb" id="2">

                                        </div>
                                        <div class="product-image-thumb" id="3">

                                        </div>
                                        <div class="product-image-thumb" id="4">

                                        </div>
                                        <div class="product-image-thumb" id="5">

                                        </div>
                                        <div class="product-image-thumb" id="6">

                                        </div>
                                        <div class="product-image-thumb" id="7">

                                        </div>
                                        <div class="product-image-thumb" id="8">

                                        </div>
                                        <div class="product-image-thumb" id="9">

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6">

                                    <br>
                                    <div class="centrar">
                                        <h3 name="nombreH" id="nombreH"></h3>
                                    </div>
                                    <hr>


                                    <div class="bg-primary py-2 px-3 mt-4">
                                        <div class="centrar">
                                            <h3>Precio por Noche: $</h3>
                                            <h3 class="mb-0" name="precioN" id="precioN" style="text-align:center"></h3>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">Descripción del Hotel:</h3>

                                            <div class="card-tools">
                                                <button type="button" class="btn btn-tool"
                                                    data-card-widget="collapse"><i class="fas fa-minus"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="card-body p-0">
                                            <ul class="nav nav-pills flex-column">

                                                <li class="nav-item">
                                                    <a href="#" class="nav-link">
                                                        <span class=" float-right">
                                                            <h7 name="detalles" id="detalles"></h7>
                                                        </span>
                                                    </a>
                                                </li>


                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <nav class="w-100">
                                    <div class="nav nav-tabs" role="tablist">
                                        <a class="nav-item nav-link active" data-toggle="tab" href="#tab-descripcion"
                                            role="tab" aria-selected="true">Incluye:</a>

                                    </div>
                                </nav>
                                <div class="tab-content p-3" id="nav-tabContent">
                                    <div class="tab-pane fade show active" id="tab-descripcion" role="tabpanel">
                                        <p style="text-align: center;" name="incluye" id="incluye"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </section>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- End Modal EDITAR-->
</form>


<?php
include_once '../../vistas/ayuda/modal-ayuda.php';
include_once '../../plantillas/footer.php';
?>

<!-- SCRIPT ADICIONALES -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<script type="text/javascript" src="<?= $base_url ?>js/controladores/hoteles/disponibilidadHotel.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<!--fecha actual-->


<?php include_once '../../plantillas/cierre.php'; ?>