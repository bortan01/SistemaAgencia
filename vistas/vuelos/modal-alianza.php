<div class="modal fade" id="modal-alianza">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
         <h4 class="modal-title">Registrar Alianza</h4>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <form id="registro-alianza" name="register-form" onsubmit="return false">
            <div class="modal-body">
               <p>
                  <!-- Main content -->
               <section class="content">
                  <div class="row">
                     <div class="col-md-12">
                        <!-- INICIO de primera fila -->
                        <div class="row">
                           <div class="col-sm-12">
                              <!-- text input -->

                              <div class="form-group">
                                 <label>Nombre de Alianza</label>
                                 <input type="text" class="form-control" name="nombreAlianza" id="nombreAlianza"
                                    placeholder="Digite nombre de alianza" autocomplete="off">
                              </div>
                              <div class="form-group">
                                 <label>URL de Sitio Web</label>
                                 <input type="text" class="form-control" name="sitio" id="sitio"
                                    placeholder="Digite nombre de sitio Web" autocomplete="off">
                              </div>

                              <div class="form-group">
                                 <label>Teléfono de Contacto</label>
                                 <div class="input-group">
                                    <input placeholder="(+503) 2423-4234" type="text" class="form-control" id="telef"
                                       name="telef" autocomplete="off">
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="timeline-footer" style="text-align: right;">
                           <a class="btn btn-info btn-sm" style="color: white" type="button" id="btnAgregar">Guardar</a>
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