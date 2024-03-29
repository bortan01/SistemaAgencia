<!-- ./wrapper -->
<script type="text/javascript" src="<?= $base_url ?>js/controladores/asesorias/operaciones.js"></script>

<!--modal alternativo para los eventos-->
<div class="modal fade" id="modal_registro">
   <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

         <div class="overlay-wrapper">
            <div id="loadingGuardar" class="overlay">
               <i class="fas fa-3x fa-sync-alt fa-spin"></i>
               <div class="text-bold pt-2">Cargando...
               </div>
            </div>
            <div class="modal-header">
               <h4 class="modal-title">Registro de cita</h4>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <form id="register-form" name="register-form" onsubmit="return false" role="form">
               <div class="modal-body">
                  <div class="form-row">
                     <div class="form-group col-md-6">
                        <label>Fecha</label>
                        <input type="text" id="txtFecha" name="fecha" class="form-control" disabled />
                        <input type="hidden" id="usuario" name="usuario" id="usuario" class="form-control" />

                     </div>
                     <div class="form-group col-md-6">
                        <label>Hora de la cita</label>
                        <div class="input-group">
                           <select name="time" id="time" class="select2 select2-hidden-accessible form-control"
                              style="width: 100%;" onchange="ShowSelected();">
                              <option value="">Seleccione</option>
                              <option value="08:00">08:00</option>
                              <option value="09:00">09:00</option>
                              <option value="10:00">10:00</option>
                              <option value="11:00">11:00</option>
                              <option value="13:00">13:00</option>
                              <option value="14:00">14:00</option>
                              <option value="15:00">15:00</option>
                              <option value="16:00">16:00</option>
                           </select>
                           <input type="hidden" name="dia" id="dia">

                        </div>
                        <input type="hidden" class="form-control" id="txtTitulo" name="title" value="Asesoria" />
                     </div>
                  </div>
                  <div class="form-row">
                     <div class="col-md-11">
                        <div class="form-group multiple-form-group input-group">
                           <label>Cliente</label>
                           <div class="input-group">
                              <select name="id_cliente" id="comboUsuario"
                                 class="select2 select2-hidden-accessible form-control" data-placeholder="Seleccione"
                                 style="width: 100%;" onchange="ShowSelected();">
                              </select>
                              <input type="hidden" name="estado" id="estado" value="Enviado">

                           </div>
                        </div>
                     </div>
                     <div class="col-sm-1">
                        <br>
                        <span class="input-group-btn">
                           <button type="button" class="btn btn-success" data-toggle="modal"
                              data-target="#modalAgregarCliente" style="margin-top: 10px; width: 100%;">+</button>
                        </span>
                     </div>
                     <div class="col-sm-6">
                        <!-- text input -->
                        <div class="hidden">
                           <label name="detalle" id="detalle">Registró una cita para Asesoria</label>
                        </div>
                     </div>
                  </div>

               </div>

         </div>
         <div class="modal-footer">
            <button type="button" id="btnAgregar" class="btn btn-info btn-sm" style="color: white">Guardar</button>
            <button type="button" class="btn btn-danger btn-sm" style="color: white"
               data-dismiss="modal">Cancelar</button>
         </div>
         </form>
      </div>

   </div>
</div>
<!-- /.modal-content -->
</div>
<!--fin de modal de enventos-->


<!-- ./otro modal*************************** -->
<!--modal alternativo para los eventos-->
<div class="modal fade" id="modal_eventos">
   <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">

         <div class="overlay-wrapper">
            <div id="loadingActualizarEventos" class="overlay">
               <i class="fas fa-3x fa-sync-alt fa-spin"></i>
               <div class="text-bold pt-2">Cargando...
               </div>
            </div>
            <div class="modal-header">
               <h5 class="modal-title" id="tituloEvento">Titulo del evento</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <form id="update-form" onsubmit="return false">
               <div class="modal-body">
                  <div class="form-row">
                     <div class="form-group col-md-6">
                        <input type="hidden" id="txtFecha3" name="fecha" class="form-control" />
                        <input type="hidden" id="txtId" name="id_cita" class="form-control" />
                        <label>Fecha</label>
                        <input type="text" id="txtFecha2" disabled="" name="fecha" class="form-control" />

                     </div>
                     <div class="form-group col-md-6">
                        <label>Hora de la cita</label>
                        <div class="input-group clockpicker" data-autoclose="true">
                           <select name="timeUpdate" id="timeUpdate"
                              class="select2 select2-hidden-accessible form-control" style="width: 100%;"
                              onchange="ShowSelected();">
                              <option value="08:00">08:00</option>
                              <option value="09:00">09:00</option>
                              <option value="10:00">10:00</option>
                              <option value="11:00">11:00</option>
                              <option value="13:00">13:00</option>
                              <option value="14:00">14:00</option>
                              <option value="15:00">15:00</option>
                           </select>

                        </div>
                     </div>
                     <div class="col-sm-6">
                        <!-- text input -->
                        <div class="hidden">
                           <label name="detalle" id="detalle">Modifico una Asesoria</label>
                        </div>
                     </div>

                  </div>

               </div>
               <div class="modal-footer">
                  <button type="button" id="btnActualizar" class="btn btn-info float-right">Actualizar</button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
               </div>
            </form>
         </div>

      </div>
   </div>
   <!-- /.modal-content -->
</div>
<!--fin de modal de enventos-->