<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once  '../../plantillas/navbar.php'; ?>
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet" />
<link rel="stylesheet" href="<?= $base_url ?>plugins/toastr/toastr.min.css">
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/migratorioRe.css" all rel="stylesheet" type="text/css" />


<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet" />
<?php include_once '../../plantillas/barra_lateral.php'; ?> <div class="wrapper">

   <!-- Content Wrapper. Contains page content -->
   <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
         <div class="container-fluid">
            <div class="row mb-2">
               <div class="col-sm-6">
                  <h1>

                     <small id="titulo"> Registro de Información Migratoria</small>
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
                        <div class="tab-content" id="custom-tabs-four-tabContent">
                           <div class="tab-pane fade show active" id="custom-tabs-four-home" role="tabpanel"
                              aria-labelledby="custom-tabs-four-home-tab">
                              <div class="row">
                                 <div class="col-sm-12">
                                    <form id="migratorio-form" name="register-form" onsubmit="return false"
                                       class="form-inline" role="form">

                                       <!-- text input -->
                                       <div class="form-group" style="width: 100%;">
                                          <div class="algo" style="width: 100%;">
                                             <div class="col-sm-12">
                                                <!-- text input -->
                                                <div class="form-group ">
                                                   <div class="input-group" style="width: 100%;">
                                                      <div style="width: 100%;" class="tab-content"
                                                         id="custom-tabs-one-tabContent">
                                                      </div>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>

                                    </form>
                                    <div class="col-sm-12">
                                       <!-- text input -->
                                       <div class="form-group ">
                                          <div class="timeline-footer" style="text-align: right;">
                                             <button type="button" id="btnFormulario" class="btn btn-info btn-sm"
                                                style=" margin-top: 10px; color: white">Guardar</button>
                                             <button type="button" class="btn btn-danger btn-sm"
                                                style="margin-top: 10px; color: white"
                                                data-dismiss="modal">Cancelar</button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
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
<!--SCRIPT PARA LOS REPORTES FIN-->
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript">
</script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/toastr/toastr.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>js/imprimir.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/registroMigratoria.js"></script>
<!--para los reportes-->
<?php include_once '../../plantillas/cierre.php'; ?>