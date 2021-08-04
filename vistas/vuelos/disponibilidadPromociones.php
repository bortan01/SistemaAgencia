s<?php
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
                    <h1>Promociones</h1>
                    <input type="hidden" id="fecha">

                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                        <li class="breadcrumb-item active">Disponibilidad de Promociones</li>
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
                    <!-- Hover-Fall Efecto-->

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
                                    <h6>Promoción disponible hasta: </h6>
                                    <label name="fechaR" id="fechaR" data-date=""
                                        data-date-format="DD MMMM YYYY"></label>
                                    <hr>


                                    <div class="bg-primary py-2 px-3 mt-4">
                                        <div class="centrar">
                                            <h3>Precio por persona: $</h3>
                                            <h3 class="mb-0" name="precioP" id="precioP" style="text-align:center"></h3>
                                        </div>
                                    </div>

                                    <div class="card">
                                        <div class="card-header">
                                            <h3 class="card-title">Descripción:</h3>

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
                                                        <i class="fas fa-plane-departure"></i> Saliendo de
                                                        <span class="badge bg-warning float-right">
                                                            <h7 name="saliendo" id="saliendo"></h7>
                                                        </span>

                                                    </a>
                                                </li>

                                                <li class="nav-item active">
                                                    <a href="#" class="nav-link">
                                                        <i class="fas fa-plane-arrival"></i> País
                                                        <span class="badge bg-primary float-right">
                                                            <h7 name="pais" id="pais"></h7>
                                                        </span>
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="#" class="nav-link">
                                                        <i class="fas fa-map-marked-alt"></i> Lugar de Destino
                                                        <span class="badge bg-Secondary float-right">
                                                            <h7 name="lugard" id="lugard"></h7>
                                                        </span>
                                                    </a>
                                                </li>

                                                <li class="nav-item">
                                                    <a href="#" class="nav-link">
                                                        <i class="fas fa-plane"></i> Aerolinea
                                                        <span class="badge bg-success float-right">
                                                            <h7 name="aerolineav" id="aerolineav"></h7>
                                                        </span>

                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a href="#" class="nav-link">
                                                        <i class="fas fa-suitcase-rolling"></i> Tipo de Clase
                                                        <span class="badge bg-danger float-right">
                                                            <h7 name="tipoClase" id="tipoClase"></h7>
                                                        </span>

                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
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
include_once '../../plantillas/footer.php';
?>


<script>
$("label").on("change", function() {
    this.setAttribute("data-date", moment(this.value, "YYYY-MM-DD").format(this.getAttribute(
        "data-date-format")))
}).trigger("change")
</script>
<script>

window.onload = function(){
  let fecha = new Date(); //Fecha actual
  let mes     = fecha.getMonth()+1; //obteniendo mes
  let dia     = fecha.getDate(); //obteniendo dia
  let ano     = fecha.getFullYear(); //obteniendo año
  let hora    = fecha.getHours();
  let minutos = fecha.getMinutes();
  if(dia<10)
    dia='0'+dia; //agrega cero si el menor de 10
  if(mes<10)
    mes='0'+mes //agrega cero si el menor de 10
  document.getElementById('fecha').value=ano+"-"+mes+"-"+dia;

}
</script>
    <!-- SCRIPT ADICIONALES -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

    <script type="text/javascript" src="<?= $base_url ?>js/controladores/vuelos/disponibilidad-app.js"></script>
    <script type="text/javascript" src="<?= $base_url ?>js/controladores/vuelos/validarPromo.js"></script>
    <script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
    <!--fecha actual-->


    <?php include_once '../../plantillas/cierre.php'; ?>