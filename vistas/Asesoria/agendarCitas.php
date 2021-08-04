<?php include_once '../../config/parametros.php'; ?>
<?php //include_once '../../plantillas/cabecera.php'; ?>
<?php include_once './pluing.php'; 
include_once '../session/isEmpleado.php';
?>
<!-- COLOCAR ESTILOS ADICIONALES AQUI -->

<link rel="stylesheet" href="<?= $base_url ?>plugins/toastr/toastr.min.css">
<!--COTINUANDO CON LA INICIALIZACION -->
s
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" crossorigin="anonymous">
<link href="<?= $base_url ?>plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css" all rel="stylesheet"
   type="text/css" />
<link href="<?= $base_url ?>css/miniatura-tabla.css" media="all" rel="stylesheet" type="text/css" />
<!--para la subida de fotos al sistema-->
<link href="<?= $base_url ?>plugins/subir-foto/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/css/avatar.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?= $base_url ?>plugins/subir-foto/themes/explorer-fas/theme.css" media="all" rel="stylesheet"
   type="text/css" />

<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Agendar Citas</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">Citas</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <div class="container-fluid">
         <div class="row">
            <div class="col-md-1">
            </div>
            <!-- /.col -->
            <div class="col-md-10">
               <div class="card card-primary">
                  <div class="card-body p-0">
                     <!-- THE CALENDAR -->
                     <div id="calendar"></div>
                  </div>
                  <!-- /.card-body -->
               </div>
               <!-- /.card -->
            </div>
            <!-- /.col -->
            <div class="col-md-1">
            </div>
         </div>
         <!-- /.row -->
      </div><!-- /.container-fluid -->
   </section>
   <!-- /.content -->
</div>
<!-- /.content-wrapper -->


<?php include_once './modal_eventos.php';
      include_once '../cliente/modalCliente.php';
?>
<?php include_once '../../plantillas/footer.php';?>
<!-- PONER SCRIPT ADICIONALES ACA -->
<script>
//para la mascara del celular
$(":input").inputmask();
$("#pasaporte").inputmask({
   "mask": "A99999999"
});
$("#pasaporte_personas2").inputmask({
   "mask": "A99999999"
});
$("#pasaporte_personas").inputmask({
   "mask": "A99999999"
});
</script>
<script src='<?= $base_url ?>plugins/a/js/moment.min.js'></script>
<script src='<?= $base_url ?>plugins/a/js/fullcalendar.min.js'></script>
<script src='<?= $base_url ?>plugins/a/js/locale/es.js'></script>

<script src="<?= $base_url ?>js/mdtimepicker.js"></script>
<script src="<?= $base_url ?>plugins/sweetalert2/sweetalert2.min.js"></script>
<script src="<?= $base_url ?>plugins/toastr/toastr.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= $base_url ?>plugins/jquery-validation/additional-methods.min.js"></script>
<!--para la mascara-->
<script src="<?= $base_url ?>plugins/inputmask/jquery.inputmask.min.js"></script>

<!--para las subida de fotos-->
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/piexif.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/plugins/sortable.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/fileinput.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/js/locales/es.js" type="text/javascript"></script>
<script src="<?= $base_url ?>plugins/subir-foto/themes/fas/theme.js" type="text/javascript"></script>



<script src="<?= $base_url ?>js/controladores/client/comboUsuario.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/combobox.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/ramas_automaticas.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/preguntas_automaticas.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/insertar-app.js"></script>
<script src="<?= $base_url ?>js/controladores/bitacora/bitacora.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/update-app.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/calendario-app.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/input.js"></script>
<script src="<?= $base_url ?>js/controladores/asesorias/validar-exist.js"></script>

<script>
$(document).ready(function() {
   $('#timepicker').mdtimepicker(); //Initializes the time picker
});

$(document).ready(function() {
   $('#timepicker2').mdtimepicker(); //Initializes the time picker
});

$('#loadingActualizar').hide();
$('#loadingActualizarEventos').hide();
</script>
<!-- CIERRE DE ETIQUETAS -->
<?php include_once '../../plantillas/cierre.php'; ?>