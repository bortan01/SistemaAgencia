<!-- INICIALIZACION -->
<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link rel="stylesheet" href="<?= $base_url ?>dist/css/disponibilidad.css">
<link rel="stylesheet" href="<?= $base_url ?>plugins/carrucel-bootstrap/style.css">
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Disponibilidad</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Disponibilidad de Reserva</li>
               </ol>
            </div>
         </div>
      </div>
      <!-- /.container-fluid -->
   </section>

   <section class="content">
      <form id="flotaAutos" name="flotaAutos" role="form" onsubmit="return false">
         <div class="container">
            <div class="row" id="contenedorAutos">
               <!-- Hover-Fall Efecto-->

            </div>
         </div>
      </form>
   </section>

</div>

<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
   <!-- Modal EDITAR-->
   <div class="modal fade" id="modal-editar">
      <div class="modal-dialog modal-xl modal-dialog-centered">
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
                           <h3 style="text-align: center;" name="titulo" id="titulo"></h3>
                           <h3 class="my-3" name="mode1" id="mode1"></h3>
                           <h3 name="anio" id="anio"></h3>

                           <hr>
                           <div class="py-2 px-3 mt-4" style="background-color: #0069d9; color:white">
                              <div class="centrar">
                                 <h3 class="mb-0" name="precio" id="precio" style="text-align: center;"></h3>
                              </div>
                           </div>
                           <div class="card">
                              <div class="card-header">
                                 <h3 class="card-title">Datos Generales:</h3>

                                 <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse"><i
                                          class="fas fa-minus"></i>
                                    </button>
                                 </div>
                              </div>
                              <div class="card-body p-0">
                                 <ul class="nav nav-pills flex-column">

                                    <li class="nav-item active">
                                       <a href="#" class="nav-link">
                                          <i class="far fa-calendar-alt"></i> Fecha de viaje
                                          <span class="badge bg-primary float-right">
                                             <h7 name="fecha" id="fecha"></h7>
                                          </span>
                                       </a>
                                    </li>
                                    <li class="nav-item">
                                       <a href="#" class="nav-link">
                                          <i class="fas fa-user-friends"></i> Cupos Disponibles
                                          <span class="badge bg-danger float-right">
                                             <h7 name="cupos" id="cupos"></h7>
                                          </span>
                                       </a>
                                    </li>
                                    <li class="nav-item">
                                       <a href="#" class="nav-link">
                                          <i class="fas fa-clipboard-check"></i> Reservación
                                          <span class="badge bg-warning float-right">
                                             <h7 name="" id="">con el 50% o su totalidad</h7>
                                          </span>

                                       </a>
                                    </li>
                                    <li class="nav-item">
                                       <a href="#" class="nav-link">
                                          <i class="fas fa-phone"></i> Teléfono Agencia
                                          <span class="badge bg-info float-right">
                                             <h7 name="combustible" id="combustible">2319-2338 / 2312-0381</h7>
                                          </span>
                                       </a>
                                    </li>
                                    <li class="nav-item">
                                       <a href="#" class="nav-link">
                                          <i class="fab fa-whatsapp"></i> WhatsApp
                                          <span class="badge bg-Success float-right">
                                             <h7 name="transmision" id="transmision">7841-1184 / 7602-2242 </h7>
                                          </span>
                                       </a>
                                    </li>

                                 </ul>
                              </div>
                           </div>
                           <div class="mt-4">
                              <button class="btn btn-block btn-success btn-flat" id="btnReservar" name="btnReservar">
                                 <i class="fas fa-cart-plus fa-lg"></i>
                                 Reservar Tur
                              </button>
                           </div>
                        </div>
                     </div>
                     <div class="row mt-4">
                        <nav class="w-100">
                           <div class="nav nav-tabs" role="tablist">
                              <a class="nav-item nav-link active" data-toggle="tab" href="#tab-descripcion" role="tab"
                                 aria-selected="true">Descripción</a>
                              <a class="nav-item nav-link" data-toggle="tab" href="#tab-incluye" role="tab"
                                 aria-selected="false">Incluye</a>
                              <a class="nav-item nav-link" data-toggle="tab" href="#tab-noIncluye" role="tab"
                                 aria-selected="false">No Incluye</a>
                              <a class="nav-item nav-link" data-toggle="tab" href="#tab-requisito" role="tab"
                                 aria-selected="false"> Requisitos</a>
                              <a class="nav-item nav-link" data-toggle="tab" href="#tab-promocion" role="tab"
                                 aria-selected="false"> Promociones</a>
                              <a class="nav-item nav-link" data-toggle="tab" href="#tab-salida" role="tab"
                                 aria-selected="false">Lugar de Salida</a>
                              <a class="nav-item nav-link" data-toggle="tab" href="#tab-sitios" role="tab"
                                 aria-selected="false">Sitios Turísticos</a>
                              <a class="nav-item nav-link" data-toggle="tab" href="#tab-otros" role="tab"
                                 aria-selected="false">Otros Servicios</a>
                           </div>
                        </nav>
                        <div class="tab-content p-3" id="nav-tabContent">
                           <div class="tab-pane fade show active" id="tab-descripcion" role="tabpanel">
                              <p name="descripcion_tur" id="descripcion_tur"></p>
                           </div>
                           <div class="tab-pane fade" id="tab-incluye" role="tabpanel">
                              <div name="incluye" id="incluye"> </div>
                           </div>
                           <div class="tab-pane fade" id="tab-noIncluye" role="tabpanel">
                              <div name="no-incluye" id="no-incluye"> </div>
                           </div>
                           <div class="tab-pane fade" id="tab-requisito" role="tabpanel">
                              <div name="requisito" id="requisito"> </div>
                           </div>
                           <div class="tab-pane fade" id="tab-promocion" role="tabpanel">
                              <div name="promocion" id="promocion"> </div>
                           </div>
                           <div class="tab-pane fade" id="tab-salida" role="tabpanel">
                              <div name="salida" id="salida"> </div>
                           </div>
                           <div class="tab-pane fade" id="tab-sitios" role="tabpanel">
                              <div name="sitios" id="sitios"> </div>
                           </div>
                           <div class="tab-pane fade" id="tab-otros" role="tabpanel">
                              <div name="otros" id="otros">

                              </div>
                           </div>
                        </div>

                     </div>
                  </div>

               </div>

         </div>
      </div>

      <!-- /.card-body -->
   </div>
   <!-- /.card -->
</form>


<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script src="<?= $base_url ?>js/controladores/turs/locales.min.js"></script>
<script src="<?= $base_url ?>js/controladores/turs/seleccionar-tur.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>
<!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script> -->