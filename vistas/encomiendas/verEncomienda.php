<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../session/isEmpleado.php';
?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
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
               <h1>Modificar Encomienda</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Modificación de Encomienda</li>
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
                       <!--para filtrar las encomiendas activos e inactivos-->
                <div class="card-header">
                  <div class="row">
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioEncomienda" id="radioUsuarioCliente"
                           value="activo" checked>
                        <label class="form-check-label" for="radioProductoActivo">
                           ENCOMIENDAS ACTIVAS
                        </label>
                         
                     </div>
                     <div class="form-check mx-auto">
                        <input class="form-check-input" type="radio" name="radioEncomienda" id="radioUsuarioInactivo"
                           value="inactivo">
                        <label class="form-check-label" for="radioProductoInactivo">
                           ENCOMIENDAS INACTIVAS
                        </label>
                         
                     </div>
                  </div>
               </div>
               <!-- /.card-header -->
<!--*******************************fin de filtrar las encomiendas***-->
                
               <div class="card-header">
                  <h3 class="card-title">Datos de la Encomienda</h3>
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <div id="" class="dataTables_wrapper dt-bootstrap4">
                     <div class="row">
                        <div class="col-sm-12">
                           <table id="tabla_encomienda" class="table table-bordered table-striped">
                              <thead style="text-align: center;">
                                 <tr>
                                    <th>Nombre</th>
                                    <th>Ciudad de origen</th>
                                    <th>Código postal</th>
                                    <th>Fecha</th>
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
   <!-- /.content -->
</div>

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

<!--CODIGO DEL REPORTE-->
<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
   <!-- Modal Cotizacion Reporte-->
   <div class="modal fade" id="reporte_encomienda">
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
                                                <span class="h3">Datos Generales del Cliente Origen</span>
                                                <table class="datos_cliente">
                                                   <thead>
                                                      <tr>
                                                         <td>
                                                            <p> </p>
                                                            <label>Cliente:</label>
                                                            <p name="nombreC" id="nombreC">
                                                            </p>

                                                         </td>
                                                         <td><label>Teléfono:</label>
                                                            <p name="telefonoC" id="telefonoC"></p>
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                         <td>
                                                            <p> </p>
                                                            <label>Ciudad:</label>
                                                            <p name="ciudadC" id="ciudadC"></p>
                                                         </td>
                                                         <td><label>Código:</label>
                                                            <p name="codigoC" id="codigoC"></p>
                                                         </td>
                                                      </tr>
                                                   </thead>
                                                </table>
                                             </div>
                                          </td>

                                       </tr>
                                    </table>
                                    <table id="factura_destino">
                                       <tr>
                                          <td class="info_cliente">
                                             <div class="round">
                                                <span class="h3">Datos Generales del Cliente Destino</span>
                                                <table class="datos_cliente">
                                                   <thead>
                                                      <tr>
                                                         <td>
                                                            <p> </p>
                                                            <label>Cliente:</label>
                                                            <p name="nombreD" id="nombreD">
                                                            </p>

                                                         </td>
                                                         <td><label>Télefono:</label>
                                                            <p name="telefonoD" id="telefonoD"></p>
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                         <td>
                                                            <p> </p>
                                                            <label>Ciudad:</label>
                                                            <p name="ciudadD" id="ciudadD"></p>
                                                         </td>
                                                         <td><label>Código:</label>
                                                            <p name="codigoD" id="codigoD"></p>
                                                         </td>
                                                      </tr>
                                                      <tr>
                                                         <td>
                                                            <p> </p>
                                                            <label>Dirección:</label>
                                                            <p name="direccionD" id="direccionD"></p>
                                                         </td>
                                                         <td><label>Dirección Alterna:</label>
                                                            <p name="alternaD" id="alternaD"></p>
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
                                             <th class="textcenter">Producto</th>
                                             <th class="textcenter">Costo</th>
                                             <th class="textcenter">Cantidad</th>
                                             <th class="textcenter">Sub Total</th>
                                          </tr>
                                       </thead>
                                       <tbody id="detalle_productos">

                                       </tbody>

                                    </table>

                                    <table id="factura_detalle">

                                       <tfoot id="detalle_totales">

                                          <tr>
                                             <td colspan="3" class="textright"><label>Total Encomienda($)</label>
                                             </td>
                                             <td class="textcenter"><label name="descuent" id="totalEncomienda"
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

                                       <button target="_blank" id="doPrint" type="button" class="btn btn-default"><i
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

<!-- jquery-validation -->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>


<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<!--Para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>

<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/tabla-modificar.js"></script>

<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>