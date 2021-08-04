<?php 
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php'; 
?>
<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<style>
.center {
   display: block;
   margin-left: auto;
   margin-right: auto;
   width: 75%;
}
</style>
<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>



<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Condiciones Registradas</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Condiciones Registradas</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-12">


            <div class="card">
               <div class="card-header">
                  <h3 class="card-title">Condiciones para Cotización de Vuelos</h3>
                  <div class="timeline-footer" style="text-align: right;">
                     <a class="btn btn-info btn-sm" style="color: white" data-toggle="modal"
                        data-target="#modal-condiciones">Nueva Condición</a>


                  </div>
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <div id="" class="dataTables_wrapper dt-bootstrap4">
                     <div class="row">
                        <div class="col-sm-12">
                           <table id="tabla_condiciones" class="table table-bordered table-striped">
                              <thead style="text-align: center;">
                                 <tr>
                                    <th>Identificador</th>
                                    <th>Condición</th>
                                    <th>Acciones</th>
                                 </tr>
                              </thead>
                              <!-- /.inicio de loading -->
                              <div class="overlay-wrapper">
                                 <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

                                    <div class="text-bold pt-2">Cargando...
                                    </div>
                                 </div>
                                 <tbody id="tableBody" style="text-align: center;">
                                 </tbody>
                              </div>
                              <!-- /.fin de loading -->

                           </table>
                        </div>
                     </div>

                  </div>
               </div>
               <!-- /.card-body -->
            </div>
            <!-- /.card -->
         </div>
         <!-- /.col -->
      </div>
      <!-- /.row -->
   </section>
</div>
<!-- End Modal Mostrar-->




<form id="miFormulario" name="miFormulario" role="form" onsubmit="return false">
   <!-- Modal EDITAR-->
   <div class="modal fade" id="modal-editar">
      <div class="modal-dialog modal-lg modal-dialog-centered">
         <div class="modal-content">

            <div class="overlay-wrapper">

               <div class="modal-header">
                  <h4 class="modal-title">Modificar Condición</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                  </button>
               </div>
               <div class="modal-body">
                  <div class="row">
                     <div class="col-sm-12">
                        <!-- text input -->
                        <div class="form-group">
                           <label>Condición</label>
                           <textarea class="form-control" rows="3" name="condiciones" id="condiciones"
                              placeholder="Describir en que consiste la condición.."></textarea>
                        </div>
                     </div>


                  </div>

               </div>
               <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                  <button name="btnActualizar" id="btnActualizar" class="btn btn-info btn-sm"
                     style="color: white">Actualizar</button>
               </div>
            </div>
         </div>
         <!-- /.modal-content -->
      </div>
      <!-- /.modal-dialog -->
   </div>
   <!-- End Modal EDITAR-->
</form>




<!-- /.MODALES DE BOTONES PARA INSERTAR -->

<!-- /.Cierre de MODAL MARCA -->


<?php 
 include_once './modal-condicion.php';
 include_once '../../plantillas/footer.php';?>

<!-- SCRIPT ADICIONALES -->

<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>

<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script type="text/javascript" src="<?= $base_url?>js/controladores/vuelos/condiciones-app.js"></script>
<script type="text/javascript" src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>

<?php  include_once '../../plantillas/cierre.php';?>