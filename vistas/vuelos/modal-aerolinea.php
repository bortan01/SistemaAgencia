<div class="modal fade" id="modal-aerolinea">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <h4 class="modal-title">Registrar Aerolinea</h4>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form id="register-aerolinea" name="register-form" onsubmit="return false">
            <div class="modal-body">
               <p>
                  <!-- Main content -->
               <section class="content">
                  <div class="row">
                     <div class="col-md-12">
                        <!-- INICIO de primera fila -->
                        <div class="row">
                           <div class="col-sm-12">
                              <div class="form-group multiple-form-group input-group">
                                 <label>Seleccione Alianza</label>
                                 <div class="input-group">
                                    <select name="id_alianza" id="id_alianza"
                                       class="select2 select2-hidden-accessible form-control"
                                       data-placeholder="Seleccione" style="width: 100%;">
                                    </select>
                                 </div>
                              </div>
                              <div class="form-group">
                                 <label>Nombre de Aerolínea</label>
                                 <input type="text" class="form-control" name="nombreAerolinea" id="nombreAerolinea"
                                    placeholder="Digite nombre de aerolinea" autocomplete="off">
                              </div>
                              <div class="form-group">
                                 <label>URL de Sitio Web</label>
                                 <input type="text" class="form-control" name="sitioW" id="sitioW"
                                    placeholder="Digite nombre de sitio Web" autocomplete="off">
                              </div>

                              <div class="form-group">
                                 <label>Teléfono de Contacto</label>
                                 <input type="text" class="form-control" name="tel" id="tel"
                                    placeholder="(+503) 2423-4234" autocomplete="off">
                              </div>
                           </div>
                        </div>
                        <div class="timeline-footer" style="text-align: right;">
                           <a class="btn btn-info btn-sm" style="color: white" type="button"
                              id="btnAerolinea">Guardar</a>
                           <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                        </div>

                     </div>
                  </div>
               </section>
               <p>
            </div>
         </form>
      </div>
      <!-- /.modal-content -->
   </div>
   <!-- /.modal-dialog -->
</div>