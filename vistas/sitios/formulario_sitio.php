<form id="miFormularioSitio" name="miFormularioSitio" enctype="multipart/form-data">
   <div class="modal fade" id="modal-agregarSitio">
      <!-- Modal EDITAR-->
      <div class="modal-dialog modal-xl">
         <div class="overlay-wrapper">
            <div id="loadingSitio" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

               <div class="text-bold pt-2">Cargando...
               </div>
            </div>
            <div class="modal-content">
               <div class="modal-header">
                  <h4 class="modal-title">Agregar Sitio Turistico</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <div class="col-sm-6">
                        <div class="form-group">
                           <label>Nombre del sitio turístico</label>
                           <div class="input-group">
                              <input type="text" placeholder="Digite el nombre del sitio Turístiico"
                                 class="form-control" name="nombreSitio" id="nombreSitio">
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                     <div class="col-sm-6">
                        <div class="form-group">
                           <label>Precio</label>
                           <div class="input-group">
                              <input type="number" min="0" class=" form-control" name="precioSitio" value="1"
                                 id="precioSitio">
                           </div>
                           <!-- /.input group -->
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-sm-5">
                        <div class="form-group">
                           <label>Tipo</label>
                           <select name="ComboTipoSitio" id="ComboTipoSitio"
                              class="select2 select2-hidden-accessible form-control"
                              data-placeholder="Seleccione el tipo" style="width: 100%;">
                           </select>
                        </div>
                     </div>
                     <div class="col-sm-1">
                        <br>
                        <span class="input-group-btn">
                           <button type="button" class="btn btn-success btn-add" id="btn-nuevoTipoSitio"
                              name="btn-nuevoTipoSitio" style="margin-top: 10px; width: 100%;">+</button>
                        </span>
                     </div>
                     <div class="col-sm-5">
                        <div class="form-group multiple-form-group input-group">
                           <label>Contacto</label>

                           <div class="input-group">
                              <select name="contacto_sitio" id="contacto_sitio"
                                 class="select2 select2-hidden-accessible form-control"
                                 data-placeholder="Seleccione el tipo" style="width: 100%;">
                              </select>
                           </div>
                        </div>
                     </div>
                     <div class="col-sm-1">
                        <br>
                        <span class="input-group-btn">
                           <button type="button" class="btn btn-success btn-add" id="btn-nuevoContactoSitio"
                              name="btn-nuevoContactoSitio" style="margin-top: 10px; width: 100%;">+</button>
                        </span>
                     </div>

                  </div>
                  <div class="row">
                     <div class="col-sm-12">
                        <div class="form-group">
                           <label>Descripcion del Servicio</label>
                           <textarea name="descripcionSitio" id="descripcionSitio" class="form-control" rows="3"
                              placeholder="Digitar aquí ..."></textarea>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col-sm-12">

                        <label>Seleccione Imagenes</label>
                        <div class="file-loading">
                           <input type="file" multiple name="fotosSitios[]" id="fotosSitios">
                        </div>
                     </div>
                  </div>
               </div>
               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="btnguardarSitio" id="btnguardarSitio" class="btn btn-info btn-sm"
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