<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../session/isEmpleado.php';
?>
<!--para la subida de fotos al sistema-->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet" type="text/css" />
<!--alerta del sistema-->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet" type="text/css" />

<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>

<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Registro de Encomienda</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Registro</li>
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
                  <i class="fas fa-user bg-blue"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Datos de Origen</a></h3>

                     <div class="timeline-body">
                        <form id="datosOrigen-form" name="register-form" onsubmit="return false">
                           <div class="row">
                              <div class="col-sm-5">
                                 <div class="form-group multiple-form-group input-group">
                                    <label>Cliente</label>
                                    <div class="input-group">
                                       <select name="id_usuario" id="comboUsuario" class="select2 select2-hidden-accessible form-control" data-placeholder="Seleccione" style="width: 100%;">
                                       </select>
                                       <input type="hidden" name="estado" id="estado" value="Enviado">
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" data-toggle="modal" data-target="#modalAgregarCliente" style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>
                              <div class="col-sm-6">
                                 <label>Teléfono</label>
                                 <div class="input-group">
                                    <input disabled="true" type="text" name="telefono" id="telefono" class="form-control" autocomplete="off" placeholder="(503)7232-2345">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Ciudad</label>
                                    <div class="input-group">
                                       <input type="text" class="form-control" name="ciudad" id="ciudad" placeholder="Digite la ciudad de origen">
                                    </div>

                                 </div>
                              </div>

                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Código</label>
                                    <input name="codigo" id="codigo" type="number" min=0  class="form-control"  pattern="[0-9]{1,10}" placeholder="Introduzca el Código postal de origen">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <input name="fecha" id="fecha" type="hidden" class="form-control" placeholder="Introduzca el punto de referencia">
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
                                       <input class="form-control" type="text" name="cliente_des" id="cliente_des" placeholder="Digite el nombre">
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <label>Teléfono</label>
                                 <div class="input-group">
                                    <input type="text" name="telefono_des" id="telefono_des" class="form-control" autocomplete="off">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Ciudad</label>
                                    <div class="input-group">
                                       <input type="text" class="form-control" name="ciudad_des" id="ciudad_des" placeholder="Digite la ciudad de destino">
                                    </div>

                                 </div>
                              </div>

                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Código</label>
                                    <input name="codigo_des" id="codigo_des" type="text" class="form-control" placeholder="Introduzca el Código postal de destino">
                                 </div>
                              </div>

                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Dirección</label>
                                    <input name="direccion" id="direccion" type="text" class="form-control" placeholder="Introduzca la Dirección">
                                 </div>
                              </div>
                              <div class="col-sm-6">
                                 <div class="form-group">
                                    <label>Dirección alterna</label>
                                    <input name="direccion_alterna" id="direccion_alterna" type="text" class="form-control" placeholder="Ej: Correo El Salvador ó 2da, av sur, numero 34, barrio centro">
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
                                       <select name="producto" id="id_producto" class="select2 select2-hidden-accessible form-control" data-placeholder="Seleccione Producto" style="width: 100%;">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                              <div class="col-sm-1">
                                 <br>
                                 <span class="input-group-btn">
                                    <button type="button" class="btn btn-success btn-add" id="producto-add" name="" style="margin-top: 10px; width: 100%;">+</button>
                                 </span>
                              </div>

                              <div class="col-sm-3">
                                 <div class="form-group">
                                    <label for="cars">Costo($)</label>
                                    <input name="costo" id="costo" type="text" disabled class="form-control" placeholder="Costo">
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
                  <i class="fas fa-file-invoice-dollar bg-yellow"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header no-border"><a href="#">Agregando Información</a></h3>
                     <div class="timeline-body">
                        <div class="row">
                           <div class="col-sm-12">
                              <div class="row">
                                 <div class="col-sm-3">
                                    <div class="form-group">
                                       <label>Comisión</label>
                                       <div class="input-group">
                                          <input id="porcenaje" type="text" class="form-control" disabled="true">
                                       </div>
                                    </div>
                                 </div>

                                 <div class="col-sm-1">
                                    <br>
                                    <span class="input-group-btn">
                                       <button type="button" class="btn btn-success btn-add" id="comision-add" name="" style="margin-top: 10px; width: 100%;">+</button>
                                    </span>
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
                  </div>

               </div>
               <!-- END timeline item -->
               <!-- END timeline item -->
               <div>
                  <i class="fas fa-image bg-purple"></i>
                  <div class="timeline-item">
                     <h3 class="timeline-header"><a href="#">Adjunte factura</a></h3>

                     <div class="timeline-body">
                        <div class="row">

                           <div class="col-sm-12">

                              <label>Seleccione Imagenes</label>
                              <div class="file-loading">
                                 <input type="file" multiple name="fotos[]" id="fotos">
                              </div>
                           </div>

                           <div class="col-sm-6">
                              <!-- text input -->
                              <div class="hidden">
                                 <label name="detalle" id="detalle">Registró una Encomienda</label>
                              </div>
                           </div>


                        </div><br>
                        <div class="timeline-footer" style="text-align: right;">
                           <button name="btnguardar" id="btnguardar" class="btn btn-info btn-sm" style="color: white">Guardar</button>
                           <button class="btn btn-danger btn-sm" style="color: white">Cancelar</button>
                        </div>
                     </div>
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
                              <input name="nombre_producto" id="producto" type="text" class="form-control" placeholder="Introduzca el nombre" autocomplete="off">
                           </div>
                        </div>

                        <div class="col-sm-6">
                           <div class="form-group">
                              <label>Tarifa</label>
                              <input name="tarifa" id="tarifa" type="text" class="form-control" placeholder="Introduzca la tarifa" autocomplete="off">
                           </div>
                        </div>
                        <div class="col-sm-6">
                           <!-- text input -->
                           <div class="hidden">
                              <label name="detalle" id="detalle">Registró un Producto</label>
                           </div>
                        </div>

                     </div>
                  </form>
                  <form id="unidadre-form" name="register-form" onsubmit="return false">
                     <div class="row">
                        <div class="col-sm-6">
                           <div class="form-group">
                              <div class="input-group">
                                 <label>Unidad de medida</label>
                                 <select name="id_unidad" id="id_unidad" class="select2 select2-hidden-accessible form-control" data-placeholder="Seleccione" style="width: 100%;">
                                 </select>
                              </div>
                           </div>
                        </div>
                        <div class="col-sm-5">
                           <div class="form-group">
                              <label>Nueva Unidad</label>
                              <input name="unidad_medida" id="unidad_medida" type="text" class="form-control" placeholder="Introduzca la unidad" autocomplete="off">
                           </div>
                        </div>
                        <div class="col-sm-1">
                           <br>
                           <span class="input-group-btn">
                              <button type="button" class="btn btn-success btn-add" id="btn-unidad" name="btn-unidad" style="margin-top: 10px; width: 100%;">+</button>
                           </span>
                        </div>
                     </div>
                  </form>

               </div>

               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="btn-producto" id="btn-producto" class="btn btn-info btn-sm" style="color: white">Guardar</button>
               </div>

            </div>

         </div>
      </div>
      <!-- /.modal-content -->
   </div>

   <!--modal actualizar comision-->
   <div class="modal fade" id="add-comision">
      <div class="modal-dialog modal-sm modal-dialog-centered">
         <div class="modal-content">

            <div class="overlay-wrapper">
               <div id="loadingActualizar1" class="overlay">
                  <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="modal-header">
                  <h4 class="modal-title">Comisión</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <form id="comision-form" name="register-form" onsubmit="return false">
                     <div class="row">
                        <div class="col-sm-3"></div>
                        <div class="col-sm-12">
                           <div class="form-group">
                              <label>Comisión</label>
                              <input name="comision" id="comisionActu" type="number" min=0 max=100 class="form-control" placeholder="Introduzca la comision" autocomplete="off">
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="btn-guardaComision" id="btn-guardaComision" class="btn btn-info btn-sm" style="color: white">Guardar</button>
               </div>

            </div>

         </div>
      </div>
      <!-- /.modal-content -->
   </div>
   <!--MODAL ACTUALIZAR COMISION-->

   <?php
   include_once '../cliente/modalCliente.php';
   include_once '../../plantillas/footer.php';
   ?>
   <script type="text/javascript">
      $(document).on('click', '#producto-add', function() {
         $('#add-producto').modal('show');
         $('#loadingActualizar').hide();
      });
      $(document).on('click', '#comision-add', function() {
         $('#add-comision').modal('show');
         $('#loadingActualizar1').hide();
      });
   </script>
   <script>
      //para la mascara del celular
      $(":input").inputmask();
      $("#telefono_des").inputmask({
         "mask": "(+999) 9999-9999"
      });
   </script>

   <!--alerta del sistema-->
   <script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
   <!--validaciones del sistema-->
   <script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
   <script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
   <!--para la mascara-->
   <script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>
   <!--para las subida de fotos-->
   <script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
   <script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
   <script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
   <script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
   <script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>
   <!--procesos del sistema-->
   <script src="<?= $base_url ?>js/controladores/client/comboUsuario.js"></script>
   <script type="text/javascript" src="<?= $base_url ?>js/controladores/encomienda/combo-unidad.js"></script>
   <script src="<?= $base_url ?>js/controladores/encomienda/producto.js"></script>
   <script src="<?= $base_url ?>js/controladores/encomienda/insertar-unidad-re.js"></script>
   <script src="<?= $base_url ?>js/controladores/encomienda/insertar-productoEnco.js"></script>
   <script src="<?= $base_url ?>js/controladores/encomienda/tablas-add.js"></script>
   <script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
   <!--fecha actual-->
   <script src="<?= $base_url ?>js/controladores/encomienda/fecha_actual.js"></script>


   <?php include_once '../../plantillas/cierre.php'; ?>