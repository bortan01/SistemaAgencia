<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../session/isEmpleado.php';
?>

<!--alerta del sistema-->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<!--para los reportes-->
<link href="<?= $base_url ?>css/imprimir.css" all rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>css/reportes.css" all rel="stylesheet" type="text/css" />


<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>

<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Cálculo de Encomienda</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Cálculo</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-md-12">
            <div class="timeline">
               <!-- timeline item -->
               <div id="formulario">
                  <i class="fas fa-address-card bg-blue"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Datos de Origen</a></h3>

                     <div class="timeline-body">
                        <form id="datosOrigen-form" name="register-form" onsubmit="return false">
                           <div class="row">
                              <div class="col-sm-5">
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Cliente</label>
                                    <div class="input-group">
                                       <select name="id_usuario" id="comboUsuario"
                                          class="select2 select2-hidden-accessible form-control"
                                          data-placeholder="Seleccione" style="width: 100%;">
                                       </select>
                                       <input type="hidden" name="estado" id="estado" value="Enviado">
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" data-toggle="modal"
                                       data-target="#modalAgregarCliente"
                                       style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>
                              <div class="col-sm-6">
                                 <label>Teléfono</label>
                                 <div class="input-group">
                                    <input disabled="true" type="text" name="telefono" id="telefono"
                                       class="form-control" autocomplete="off" placeholder="(503)7232-2345">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Ciudad</label>
                                    <div class="input-group">
                                       <input type="text" class="form-control" name="ciudad" id="ciudad"
                                          placeholder="Digite la ciudad de origen">
                                    </div>

                                 </div>
                              </div>

                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Código</label>
                                    <input name="codigo" id="codigo" type="text" class="form-control"
                                       placeholder="Introduzca el Código postal de origen">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <input name="fecha" id="fecha" type="hidden" class="form-control"
                                       placeholder="Introduzca el punto de referencia">
                                 </div>
                              </div>
                           </div>
                           <div>
                           </div>

                        </form>
                     </div>
                  </div>

               </div>
               <!-- END timeline item -->
               <!-- timeline item -->
               <div id="formulario">
                  <i class="fas fa-people-carry bg-red"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Datos de Destino</a></h3>

                     <div class="timeline-body">
                        <form id="datosDestino-form" name="register-form" onsubmit="return false">
                           <div class="row">
                              <div class="col-sm-6">
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Nombre Completo</label>
                                    <div class="input-group">
                                       <input class="form-control" type="text" name="cliente_des" id="cliente_des"
                                          placeholder="Digite el nombre">
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <label>Teléfono</label>
                                 <div class="input-group">
                                    <input type="text" name="telefono_des" id="telefono_des" class="form-control"
                                       autocomplete="off" placeholder="(503)7232-2345">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Ciudad</label>
                                    <div class="input-group">
                                       <input type="text" class="form-control" name="ciudad_des" id="ciudad_des"
                                          placeholder="Digite la ciudad de destino">
                                    </div>

                                 </div>
                              </div>

                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Código</label>
                                    <input name="codigo_des" id="codigo_des" type="text" class="form-control"
                                       placeholder="Introduzca el Código postal de destino">
                                 </div>
                              </div>

                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Dirección</label>
                                    <input name="direccion" id="direccion" type="text" class="form-control"
                                       placeholder="Introduzca la Dirección">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Dirección alterna</label>
                                    <input name="direccion_alterna" id="direccion_alterna" type="text"
                                       class="form-control"
                                       placeholder="Ej: Correos El Salvador Sucursal San Vicente, Segunda Avenida Sur, Barrio Centro">
                                 </div>
                              </div>
                           </div>

                        </form>
                     </div>
                  </div>

               </div>
               <!-- END timeline item -->
               <div>
                  <i class="fas fa-box-open bg-green"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Productos</a></h3>

                     <div class="timeline-body">
                        <form id="encomienda-form" name="register-form" onsubmit="return false">
                           <div class="row">

                              <div class="col-sm-5">
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Producto</label>
                                    <div class="input-group">
                                       <select name="producto" id="id_producto"
                                          class="select2 select2-hidden-accessible form-control"
                                          data-placeholder="Seleccione Producto" style="width: 100%;">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" id="producto-add" name=""
                                       style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>

                              <div class="col-sm-3">
                                 <div class="form-group">
                                    <label for="cars">Costo($)</label>
                                    <input name="costo" id="costo" type="text" disabled class="form-control"
                                       placeholder="Costo">
                                 </div>
                              </div>

                              <div class="col-sm-3">
                                 <div class="form-group" id="mostrar">

                                 </div>
                              </div>
                           </div>

                           <div class="timeline-footer" style="text-align: right;">
                              <a class="btn btn-info btn-sm" id="agregarTabla" style="color: white">Agregar</a>

                           </div>
                        </form>
                     </div>
                  </div>

               </div>
               <!-- END timeline item -->
               <!-- timeline item -->
               <div id="tabla">
                  <i class="fas fa-hand-holding-usd bg-yellow"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header no-border"><a href="#">Agregando Información</a></h3>
                     <div class="timeline-body">
                        <div class="row">
                           <div class="col-sm-12">
                              <div class="row">
                                 <div class="col-sm-3">
                                    <div class="form-group">
                                       <label>Comision de Agencia (%)</label>
                                       <div class="input-group">
                                          <input id="porcenaje" type="number" min="1" value="1" class="form-control"
                                             id="porcenaje">
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <table id="add-tabla" class="table table-bordered table-hover">
                                 <thead>
                                    <tr style="text-align: center;">
                                       <th>Producto</th>
                                       <th>Costo</th>
                                       <th>Cantidad</th>
                                       <th>Sub Total</th>
                                       <th>Acción</th>
                                       <th>id</th>
                                       <th>contador</th>
                                    </tr>
                                 </thead>
                                 <tbody>

                                 </tbody>

                              </table>
                           </div>



                        </div>
                        <div class="row">
                           <div class="col-md-1 col-md-offset-1"> </div>
                           <div class="col-md-3  ">
                              <label class="text-primary "> Total de Encomienda: </label>
                           </div>
                           <div class="col-md-3  ">
                              <label id="total" class="text-primary "> $0</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col-md-1 col-md-offset-1"> </div>
                           <div class="col-md-3  ">
                              <label class="text-success "> Comisión de Agencia: </label>
                           </div>
                           <div class="col-md-3  ">
                              <label id="comision" class="text-success "> $0</label>
                           </div>
                        </div>
                        <div class="row">
                           <div class="col-md-1 col-md-offset-1"> </div>
                           <div class="col-md-3  ">
                              <label class="text-danger "> Total de cliente: </label>
                           </div>
                           <div class="col-md-3  ">
                              <label id="totalCliente" class="text-danger "> $0</label>
                           </div>
                        </div>
                     </div>
                     <br> <br>
                     <!--****************botones***********-->
                     <div class="timeline-footer" style="text-align: right;">
                        <button type="button" style="margin-top: -1px;" name="" id="btnRepoteCalculo"
                           class="btn btn-secondary" data-toggle="modal" data-target="#reporte_calculo">
                           <i class="fas fa-eye" style="color: white"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" style="color: white">Cancelar</button>
                     </div>
                     <!--**************fin de los botones*********-->
                  </div>

               </div>
               <!-- END timeline item -->
               <!-- /.timeline-label -->
            </div>
            <!-- END timeline item -->
         </div>
      </div>
   </section>
   <!-- Modal mostrar-->
   <div class="modal fade" id="add-producto">
      <div class="modal-dialog modal-lg modal-dialog-centered">
         <div class="modal-content">

            <div class="overlay-wrapper">
               <div id="loadingActualizar" class="overlay">
                  <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="modal-header">
                  <h4 class="modal-title">Nuevo Producto</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <form id="register-form" name="register-form" onsubmit="return false">
                     <div class="row">
                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Nombre</label>
                              <input name="nombre_producto" type="text" class="form-control"
                                 placeholder="Introduzca el nombre" autocomplete="off">
                           </div>
                        </div>

                        <div class="col-sm-3">
                           <div class="form-group">
                              <label>Tarifa</label>
                              <input name="tarifa" type="text" class="form-control" placeholder="Introduzca la tarifa"
                                 autocomplete="off">
                           </div>
                        </div>

                        <div class="col-sm-3">
                           <div class="form-group">
                              <div class="input-group">
                                 <label>Unidad de medida</label>
                                 <select name="id_unidad" id="id_unidad"
                                    class="select2 select2-hidden-accessible form-control" data-placeholder="Seleccione"
                                    style="width: 100%;">
                                 </select>
                              </div>
                           </div>
                        </div>

                     </div>
                  </form>
                  <form id="unidad-form" name="register-form" onsubmit="return false">
                     <div class="row">
                        <div class="col-sm-5">
                           <div class="form-group">
                              <label>Nueva Unidad</label>
                              <input name="unidad_medida" id="unidad_medida" type="text" class="form-control"
                                 placeholder="Introduzca la unidad" autocomplete="off">
                           </div>
                        </div>
                        <div class="col-sm-1">
                           <br>
                           <span class="input-group-btn">
                              <button type="button" class="btn btn-primary btn-add" id="btn-unidad" name="btn-unidad"
                                 style="margin-top: 10px; width: 100%;">+</button>
                           </span>
                        </div>
                     </div>
                  </form>

               </div>

               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="btn-producto" id="btn-producto" class="btn btn-info btn-sm"
                     style="color: white">Guardar</button>
               </div>

            </div>

         </div>
      </div>
      <!-- /.modal-content -->
   </div>
   <!--CODIGO DEL REPORTE-->
   <form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
      <!-- Modal Cotizacion Reporte-->
      <div class="modal fade" id="reporte_calculo">
         <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">

               <div class="overlay-wrapper">

                  <div class="modal-header">
                     <h4 class="modal-title">Calculo encomienda:</h4>
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
                                                <th class="textcenter">id</th>

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
</div>

<?php
  include_once '../cliente/modalCliente.php';
include_once '../../plantillas/footer.php';
?>
<script>
document.getElementById("doPrint").addEventListener("click", function() {
   var printContents = document.getElementById('printDiv').innerHTML;
   var originalContents = document.body.innerHTML;
   document.body.innerHTML = printContents;
   window.print();
   document.body.innerHTML = originalContents;
});
</script>
<!--SCRIPT PARA LOS REPORTES FIN-->
<script type="text/javascript">
$(document).on('click', '#producto-add', function() {
   $('#add-producto').modal('show');
   $('#loadingActualizar').hide();
});
</script>
<script>
//para la mascara del celular
$(":input").inputmask();
$("#telefono_des").inputmask({
   "mask": "(999) 9999-9999"
});
</script>


<!--alerta del sistema-->
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<!--validaciones del sistema-->
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<!--para la mascara-->
<script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>
<!--procesos del sistema-->
<script src="<?= $base_url ?>js/controladores/client/comboUsuario.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/encomienda/combo-unidad.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/producto.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/insertar-unidad.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/insertar-productoEnco.js"></script>
<script src="<?= $base_url ?>js/controladores/encomienda/calculo.js"></script>
<!--fecha actual-->
<script src="<?= $base_url ?>js/controladores/encomienda/fecha_actual.js"></script>
<!--para los reportes-->
<script type="text/javascript" src="<?= $base_url?>js/imprimir.js"></script>

<?php include_once '../../plantillas/cierre.php'; ?>