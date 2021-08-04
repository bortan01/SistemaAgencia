<?php
include_once '../config/parametros.php';
include_once '../plantillas/cabecera.php';
include_once '../plantillas/navbar.php';
include_once '../plantillas/barra_lateral.php';
?>


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 text-dark">Bienvenidos</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Dashboard v1</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid ">
            <div class="row">
                <div class="offset-1">
                    <div class="error-page">
                        <h2 class="headline text-warning">404</h2>
                        <div class="error-content">
                            <br><br>
                            <h3><i class="fas fa-exclamation-triangle text-warning"></i> Oops! Pagina no encontrada.
                            </h3>
                            <p>
                                Nos encontramos desarrollando este espacio.
                            </p>
                        </div>
                        <!-- /.error-content -->
                    </div>

                </div>
            </div> <!-- /.cierre row -->
        </div><!-- /.container-fluid -->
    </section>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->


<?php
include_once '../plantillas/footer.php';