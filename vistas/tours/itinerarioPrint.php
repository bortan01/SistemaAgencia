<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />
<!--COTINUANDO CON LA INICIALIZACION -->
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper" style="min-height: 1185.73px;background: white;">
   <!-- Content Header (Page header) -->

   <div class="overlay-wrapper">
      <div class="container-fluid" id="printDiv">
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
                           <table id="factura_head">
                              <tr>
                                 <td class="logo_factura">
                                    <div>
                                       <img src="<?= $base_url ?>img/logo-min.jpg" all rel="stylesheet" type="text/css">
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
                                       <span class="h3">Datos Generales:</span>
                                       <table class="datos_cliente">
                                          <thead>
                                             <tr style="vertical-align: top;">
                                                <td style="text-align: center;">
                                                   <label style="width: 100%; padding-left: 10px;">Nombre del
                                                      Tour/Paquete:</label>
                                                   <p name="nombre" id="nombre"></p>
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
                                    <th class="textcenter">Evento</th>
                                    <th class="textcenter">Desde</th>
                                    <th class="textcenter">Hasta</th>
                                 </tr>
                              </thead>
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

      </div>
      <div class="container-fluid">
         <div class="row">
            <div style="text-align: center;width:2200px">
               <div style="margin: 5px" id="doPrint" class="btn btn-default"><i class="fas fa-print"></i>
                  Imprimir</div>

            </div>
         </div>
      </div>

   </div>
</div>

<?php include_once '../../plantillas/footer.php'; ?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<!-- EN EL CONTROLADOR ESTA LA LOGICA DE ESTA PANTALLA -->
<script src="../../js/controladores/turs/itinerarioPrint.js"></script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>
<?php include_once '../../plantillas/cierre.php'; ?>