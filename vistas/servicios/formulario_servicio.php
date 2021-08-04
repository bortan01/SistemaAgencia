<form id="miFormularioServicio" name="miFormularioServicio" enctype="multipart/form-data">
   <div class="modal fade" id="modal-agregarServicio">
      <!-- Modal EDITAR-->
      <div class="modal-dialog modal-xl">
         <div class="overlay-wrapper">
            <div id="loadingServicio" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

               <div class="text-bold pt-2">Cargando...
               </div>
            </div>
            <div class="modal-content">
               <div class="modal-header">
                  <h4 class="modal-title">Agregar Servicio</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="row">

                     <div class="col-sm-6">
                        <div class="form-group">
                           <label>Nombre de Servicio</label>
                           <div class="input-group">
                              <input placeholder="Digite el Nombre del Servicio" id="nombreServicio"
                                 name="nombreServicio" type="text" class="form-control">
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <div class="form-group">
                           <label>Costo</label>
                           <div class="input-group">
                              <input placeholder="Digite el Costo" id="costos_defectoServicio"
                                 name="costos_defectoServicio" type="number" class="form-control">
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                  </div>
                  <div class="row">

                     <div class="col-sm-5">
                        <div class="form-group">
                           <label>Tipo de Servicio</label>
                           <select name="tipo_servicio" id="tipo_servicio"
                              class="select2 select2-hidden-accessible form-control float-righ"
                              data-placeholder="Seleccione el tipo" style="width: 100%;" aria-hidden="true">
                           </select>
                        </div>
                     </div>
                     <div class="col-sm-1">
                        <br>
                        <span class="input-group-btn">
                           <button type="button" class="btn btn-success btn-add" id="btn-nuevoTipoServicio"
                              name="btn-nuevoTipoServicio" style="margin-top: 7px; width: 100%;">+</button>
                        </span>
                     </div>



                     <div class="col-sm-5">
                        <div class="form-group multiple-form-group input-group">
                           <label>Contacto</label>

                           <div class="input-group">
                              <select name="contacto_servicio" id="contacto_servicio"
                                 class="select2 select2-hidden-accessible form-control"
                                 data-placeholder="Seleccione el tipo" style="width: 100%;">
                              </select>
                           </div>
                        </div>
                     </div>

                     <div class="col-sm-1">
                        <br>
                        <span class="input-group-btn">
                           <button type="button" class="btn btn-success btn-add" id="nuevoContactoServicio"
                              name="nuevoContactoServicio" style="margin-top: 7px; width: 100%;"
                              id="btn-asistiran">+</button>
                        </span>
                     </div>
                  </div>
                  <div class="row" id="configuracionAsientos">
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>numero de filas </label>
                           <div class="input-group">
                              <input id="numero_filas" name="numero_filas" type="number" min="2" value="2" step="1"
                                 class="form-control">
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Asientos lado derecho</label>
                           <div class="input-group">
                              <input id="asientos_derecho" name="asientos_derecho" type="number" min="2" value="2"
                                 step="1" class="form-control">
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <div class="form-group">
                           <label>Asientos lado izquierdo</label>
                           <div class="input-group">
                              <input id="asientos_izquierdo" name="asientos_izquierdo" type="number" min="2" value="2"
                                 step="1" class="form-control">
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-3">
                        <!-- radio -->
                        <label>Agregar fila trasera</label>
                        <div class="form-group clearfix">
                           <div class="icheck-success d-inline" style="margin-left: 70px;">
                              <input type="checkbox" value="si" id="checkTrasero">
                              <label for="checkTrasero">
                              </label>
                           </div>
                        </div>
                     </div>

                  </div>
                  <div class="row" id="dibujoAsientos">
                     <!-- <div class="offset-md-1"></div> -->
                     <div class="col-sm-7">
                        <div id="seat-map" class="float-right">
                           <div class="front-indicator">Frontal</div>
                        </div>
                     </div>
                     <div class="col-sm-4 flex flex-column-reverse flex-sm-column">
                        <div id="legend"></div>
                     </div>

                  </div>
                  <div class="row">
                     <div class="col-sm-12">
                        <!-- text input -->
                        <div class="form    -group">
                           <label>Descripcion del Servicio</label>
                           <textarea name="descripcion_servicio" id="descripcion_servicio" class="form-control" rows="3"
                              placeholder="Digitar aquí ..."></textarea>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-sm-12">

                        <label>Seleccione Imagenes</label>
                        <div class="file-loading">
                           <input type="file" multiple name="fotosServicio[]" id="fotosServicio">
                        </div>

                     </div>

                  </div>
               </div>
               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="btnguardarServicio" id="btnguardarServicio" class="btn btn-info btn-sm"
                     style="color: white">Guardar</button>
               </div>
            </div>
            <!-- /.modal-content -->
         </div>
         <!-- /.modal-dialog -->
      </div>
   </div>
   <!-- End Modal EDITAR-->
</form>