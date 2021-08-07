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
<link href="<?= $base_url ?>css/migratorioRe.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">

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
               <h1>Formularios Migratorios</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Formularios</li>
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
                  <h3 class="card-title">Citas atendidas</h3>
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <div id="" class="dataTables_wrapper dt-bootstrap4">
                     <div class="row">
                        <div class="col-sm-12">
                           <table id="formularios" class="table table-bordered table-striped">
                              <thead style="text-align: center;">
                                 <tr>
                                    <th>Cliente</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Acciones</th>
                                 </tr>
                              </thead>
                              <!-- /.inicio de loading -->
                              <div class="overlay-wrapper">
                                 <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

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

   <form id="formularioImagenes" name="formularioImagenes" enctype="multipart/form-data">
      <!-- Modal EDITAR-->
      <div class="modal fade" id="modal-imagenesEncomienda">
         <div class="modal-dialog modal-xl">
            <div class="modal-content">
               <div class="modal-header">
                  <h4 class="modal-title">Editar Imagenes</h4>
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
</div>
<!-- /.modal-dialog -->
</div>
<!-- End Modal Mostrar-->

<!--CODIGO DEL REPORTE-->
<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
   <!-- Modal Cotizacion Reporte-->
   <div class="modal fade" id="modal-cotizacion">
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
                                                <img src="<?= $base_url ?>img/logo-min.jpg" all rel="stylesheet"
                                                   type="text/css">
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
<!-- SCRIPT ADICIONALES -->
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/formularios-app.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/ramas.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/input.js"></script>
<!--para las fotos-->
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<!--para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>
<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>