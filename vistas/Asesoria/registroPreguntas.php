<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../session/isEmpleado.php';
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>

<!-- Google Font: Source Sans Pro -->
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header" style="margin-top: -12px;">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Registro de Preguntas</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">Registrar Preguntas</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content" style="margin-top: -20px;">
      <div class="container-fluid">
         <div class="row">
            <div class="col-md-12">
               <div class="timeline">
                  <div>
                     <i class="fas fa-comments bg-gradient-blue"></i>
                     <div class="timeline-item">
                        <h3 class="timeline-header"><a href="#">Registro de Preguntas y Ramas</a></h3>
                        <div class="timeline-body">
                           <!--Una fila para jugar-->
                           <form id="recargar-form" name="recargar-form" onsubmit="return false">
                              <div class="row">
                                 <div class="col-sm-6">
                                    <div class="form-group">
                                       <label for="cars">Seleccione tipo de Pregunta o Rama</label>
                                       <select name='id_pregunta' id='id_pregunta' class="form-control">
                                          <option selected="">Seleccione</option>
                                          <option value="abierta">Abiertas</option>
                                          <option value="cerrada">Cerradas</option>
                                          <option value="cerrada">Rama</option>
                                       </select>

                                       <!--<input id="id_input" type="text" disabled>-->
                                    </div>
                                 </div>
                                 <div class="col-sm-6">
                                    <div class="form-group">
                                       <label for="cars">Seleccione rama de la Pregunta</label>
                                       <select name='combo_rama' disabled id='combo_rama' class="form-control"
                                          onchange="ShowRama();">
                                       </select>
                                    </div>
                                 </div>
                              </div>
                           </form>
                           <!--fin de Una fila para jugar-->
                        </div>
                     </div>
                  </div>
                  <div id="mostrar"></div>

                  <div id="botones"></div>

               </div>
            </div>
            <!-- /.col -->
         </div>
      </div>
      <!-- /.timeline -->

   </section>
   <!-- /.content -->
   <div class="modal fade" id="modal-opciones">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <h4 class="modal-title">Agregar opciones</h4>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <div class="row">
                  <div class="col-sm-1"></div>
                  <div class="col-sm-10">
                     <div class="form-group">
                        <label>Opciones de respuestas</label>
                        <div class="input-group">
                           <input id="opcion" name="opcion" type="text" class="form-control" autocomplete="off"
                              placeholder="Digite la opción">
                        </div>
                        <!-- /.input group -->
                     </div>
                  </div>
               </div>
            </div>
            <div class="modal-footer justify-content-between">
               <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
               <button name="btnActualizar" id="agregar" class="btn btn-info btn-sm"
                  style="color: white">agregar</button>
            </div>
         </div>
      </div>
   </div>
</div>

<aside class="control-sidebar control-sidebar-dark"></aside>

</div>

<?php
  include_once '../../plantillas/footer.php';
?>
<div id="script"></div>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/creacion_registros.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/ramas_automaticas.js"></script>
<!--<script type="text/javascript" src="<?= $base_url?>js/controladores/asesorias/combobox-ramas.js"></script>-->

<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>