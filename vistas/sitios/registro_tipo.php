<form id="formularioAgregarTipoSitio" name="formularioAgregarTipoSitio">
   <div class="modal fade" id="modal-agregarTipoSitio">
      <!-- Modal EDITAR-->
      <div class="modal-dialog modal-lg">
         <div class="modal-content">
            <div class="overlay-wrapper">
               <div id="loadingTipoSitio" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>
                  <div class="text-bold pt-2">Cargando...
                  </div>
               </div>
               <div class="modal-header">
                  <h4 class="modal-title">Agregar Tipo de Sitio Turístico</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <div class="col-sm-12">
                        <div class="form-group">
                           <label>Tipo de Sitio Turístico</label>
                           <div class="input-group">
                              <input placeholder="Digite el Tipo" type="text" class="form-control" name="nombreTipo"
                                 id="nombreTipo">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="btnAgregarTipoSitio" id="btnAgregarTipoSitio" class="btn btn-info btn-sm"
                     style="color: white">Guardar</button>
               </div>
            </div>
         </div>
         <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
   </div>
   <!-- End Modal EDITAR-->
</form>