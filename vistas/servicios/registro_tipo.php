<form id="formularioAgregarTipoServicio" name="formularioAgregarTipoServicio">
   <div class="modal fade" id="modal-agregarTipoServicio">
      <!-- Modal EDITAR-->
      <div class="modal-dialog modal-lg">
         <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title">Agregar Tipo de Servicio Adicional</h4>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <div class="row">
                  <div class="col-sm-12">
                     <div class="form-group">
                        <label>Tipo de Servicio</label>
                        <div class="input-group">
                           <input placeholder="Digite el Tipo" type="text" class="form-control"
                              name="nombreTipoServicio" id="nombreTipoServicio">
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-sm-6">
               <!-- text input -->
               <div class="hidden">
                  <label name="detalle" id="detalle">Registró nuevo Tipo de Servicio</label>
               </div>
            </div>

            <div class="modal-footer justify-content-between">
               <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
               <button name="btnAgregarTipoServicio" id="btnAgregarTipoServicio" class="btn btn-info btn-sm"
                  style="color: white">Guardar</button>
            </div>
         </div>
         <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
   </div>
   <!-- End Modal EDITAR-->
</form>