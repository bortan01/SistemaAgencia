<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; 
include_once '../session/isEmpleado.php';
?>

<!-- COLORAR ESTILOS ADICIONALES AQUI -->
<!-- CONTINUAMOS CON LA INICIALIZACION -->
<?php include_once  '../../plantillas/navbar.php'; ?> <?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Citas</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="../../home.php">Inicio</a></li>
                  <li class="breadcrumb-item active">Citas Pendientes</li>
                  <button class="button button-circle alert" data-toggle="modal" data-target="#modal-ayuda"
                     id="botonAyudaFormulario"> <i class="fas fa-question"></i></button>
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
                  <h3 class="card-title">Citas Pendientes</h3>
               </div>
               <!-- /.card-header -->
               <div class="card-body">
                  <table id="tabla_servicios" class="table table-bordered table-striped">
                     <thead style="text-align: center;">
                        <tr>
                           <th>Cliente</th>
                           <th>Fecha de cita</th>
                           <!-- <th>Cobros</th> -->
                           <th>Llenar formulario</th>
                        </tr>
                     </thead>
                     <div class="overlay-wrapper">
                        <div id="loading" class="overlay"><i class="fas fa-3x fa-sync-alt fa-spin"></i>

                           <div class="text-bold pt-2">Cargando...
                           </div>
                        </div>
                        <tbody id="tableBody" style="text-align: center;">
                        </tbody>
                     </div>

                  </table>
               </div>
               <!-- /.card-body -->
            </div>
         </div>
         <!-- /.col -->
      </div>
      <!-- /.row -->
   </section>
   <!-- /.content -->
</div>

<?php 
include_once '../../vistas/ayuda/modal-ayuda.php';
include_once '../../plantillas/footer.php'; ?>

<!-- SCRIPT ADICIONALES AQUI -->
<script src="<?= $base_url ?>js/controladores/asesorias/ver_asesoria.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>