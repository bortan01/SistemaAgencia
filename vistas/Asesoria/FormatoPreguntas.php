<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />


<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>

<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-9">
               <h1 id="titulo">Reporte</h1>
            </div>
            <div class="col-sm-3">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Reporte</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>
   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-md-12">
            <div class="overlay-wrapper">
               <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="row" style="width: 100%; display: block;">
                  <section class="content">
                     <div class="container-fluid" id="printDiv">
                        <div class="row">
                           <div class="col-md-12">
                              <div id="page_pdf">
                                 <table id="">
                                    <tr>
                                       <td class="logo_factura">
                                          <div>
                                             <img src="<?= $base_url ?>img/logo-min.jpg" all rel="stylesheet"
                                                type="text/css">
                                          </div>
                                       </td>
                                       <td class="info_empresa">
                                          <div>
                                             <span class="h2" name="nombre_a" id="nombre_a"></span>
                                             <p>
                                             <p style="margin: 1px;display:inline;" name="direccion_a" id="direccion_a">
                                             </p>
                                             <p style="margin: 1px;display:inline;float:right" name="telefono_a"
                                                id="telefono_a">
                                             </p>
                                             <p name="email_a" id="email_a"></p>
                                             </p>
                                          </div>
                                       </td>
                                    </tr>
                                 </table>
                                 <table id="factura_cliente">
                                    <tr>
                                       <td class="info_cliente">
                                          <div class="round">
                                             <span class="h3">Datos de Cliente</span>
                                             <table class="datos_cliente">
                                                <thead>
                                                   <tr>
                                                      <td>
                                                         <label style="width: 100%; padding-left: 10px;">
                                                            Nombre de Cliente:</label>
                                                         <p name="nombreCliente" id="nombreCliente">
                                                      </td>
                                                      <td>
                                                         <label style="width: 100%; padding-left: 10px;">
                                                            Correo Electronico:</label>
                                                         <p name="correoCliente" id="correoCliente">
                                                      </td>
                                                   </tr>

                                                </thead>
                                             </table>
                                          </div>
                                       </td>

                                    </tr>
                                 </table>


                                 <table id="tReserva">

                                    <tbody id="detalle_productos">
                                    </tbody>
                                 </table>



                                 <!--fin de crear tablas-->
                              </div>
                              <div class="row no-print">
                                 <div class="col-md-12">
                                    <div id="editor"></div>

                                 </div>
                              </div>
                           </div>
                        </div>

                     </div>
                  </section>
               </div>

               <div class="container-fluid">
                  <div class="row">
                     <div style="text-align: right;width:2200px">
                        <div style="margin: 5px" id="doPrint" class="btn btn-default"><i class="fas fa-print"></i>
                           Imprimir</div>

                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</div>

<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script type="text/javascript" src="<?= $base_url?>js/controladores/agencia/mostrarInfo.js"></script>
<script type="text/javascript" src="<?= $base_url ?>js/controladores/asesorias/reporteFormato.js"></script>
<!--para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>

<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>