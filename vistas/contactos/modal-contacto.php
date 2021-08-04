<form id="formularioAgregarContacto" name="formularioAgregarContacto" enctype="multipart/form-data">
   <div class="modal fade" id="modal-agregarContactoSitio">
      <!-- Modal EDITAR-->
      <div class="modal-dialog modal-lg">
         <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title">Agregar Contacto</h4>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <div class="row">
                  <div class="col-sm-7">
                     <div class="row">
                        <div class="col-sm-12">
                           <div class="form-group">
                              <label>Nombre de Contacto</label>
                              <div class="input-group">
                                 <input placeholder="Digite Nombre" type="text" class="form-control"
                                    name="nombreContactoSitio" id="nombreContactoSitio">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-12">
                           <div class="form-group">
                              <label>Teléfono de Contactos</label>
                              <div class="input-group">
                                 <input placeholder="Digite Teléfono" type="text" class="form-control"
                                    id="telefonoContactoSitio" name="telefonoContactoSitio">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                        <div class="col-sm-12">
                           <div class="form-group">
                              <label>Correo Electrónico</label>
                              <div class="input-group">
                                 <input placeholder="Digite Correo" type="text" class="form-control"
                                    name="correoContactoSitio" id="correoContactoSitio">
                              </div>
                              <!-- /.input group -->
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="col-sm-5">
                     <div class="form-group">
                        <div class="kv-avatar">
                           <label>Foto de Contacto</label>
                           <div class="file-loading">
                              <input id="fotoContactoSitio" name="fotoContactoSitio" type="file">
                           </div>
                        </div>
                        <!-- /.input group -->
                     </div>
                  </div>
               </div>
            </div>
            <div class="modal-footer justify-content-between">
               <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
               <button name="btnAgregarContactoSitio" id="btnAgregarContactoSitio" class="btn btn-info btn-sm"
                  style="color: white">Guardar</button>
            </div>
         </div>
         <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
   </div>
   <!-- End Modal EDITAR-->
</form>