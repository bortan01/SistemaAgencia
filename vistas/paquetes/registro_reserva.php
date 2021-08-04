<?php
include_once '../../config/parametros.php';
include_once '../../plantillas/cabecera.php';
include_once '../../vistas/session/isEmpleado.php'; 
include_once '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>
<!-- DataTables -->
<link rel="stylesheet"
   href="http://localhost/Plantillas/SistemaAgencia/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
<link rel="stylesheet"
   href="http://localhost/Plantillas/SistemaAgencia/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
<!-- iCheck for checkboxes and radio inputs -->
<link rel="stylesheet" href="<?= $base_url ?>plugins/icheck-bootstrap/icheck-bootstrap.min.css">

<!--necesario para que funcione el selector multiple-->
<link rel="stylesheet" href="<?= $base_url ?>plugins/select2/css/select2.min.css">
<link rel="stylesheet" href="<?= $base_url ?>plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
<link rel="stylesheet" href="<?= $base_url ?>dist/css/adminlte.min.css">

<div class="content-wrapper" style="min-height: 1185.73px;">
   <!-- Content Header (Page header) -->
   <section class="content-header">
      <div class="container-fluid">
         <div class="row mb-2">
            <div class="col-sm-6">
               <h1>Reserva de Paquete</h1>
            </div>
            <div class="col-sm-6">
               <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Inicio</a></li>
                  <li class="breadcrumb-item active">Mantenimiento</li>
               </ol>
            </div>
         </div>
      </div><!-- /.container-fluid -->
   </section>

   <!-- Main content -->
   <section class="content">
      <div class="row">
         <div class="col-md-12">
            <div class="timeline">
               <!-- timeline time label -->
               <div class="time-label">
                  <span class="bg-red">Información</span>
               </div>
               <!-- /.timeline-label -->
               <!-- timeline item -->
               <div>
                  <i class="fas fa-plane bg-blue"></i>
                  <div class="timeline-item">
                     <!--<span class="time"><i class="fas fa-clock"></i> 12:05</span>-->
                     <h3 class="timeline-header"><a href="#">Datos Generales:</a></h3>

                     <div class="timeline-body">
                        <div class="row">

                           <div class="col-sm-6">
                              <!-- text input -->
                              <div class="form-group">
                                 <label>Nombre del Cliente</label>
                                 <select class="form-control select2" style="width: 100%;">
                                    <option>Juan Perez Martinez (juan01)</option>
                                    <option>Eduardo Antonio Bermudez (Bern03)</option>
                                    <option>Agustina Palacios Barahona (faraon93)</option>
                                    <option>Maria Semedos Lara Benitenz (Bens12)</option>
                                    <option>Marca Andrea Comayagua (abre_w)</option>
                                    <option>Mauricion Antnonio Landaverte(maur-we) </option>
                                    <option>Julia Helien Valladares (la_valla)</option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-sm-6">
                              <!-- text input -->
                              <div class="form-group">
                                 <label>Seleccione el Paquete</label>
                                 <div class="select2-blue">
                                    <select class="form-control select2" style="width: 100%;">
                                       <option data-select2-id="146">!VAMONOS A COSTA RICA¡</option>
                                       <option data-select2-id="147">VÁMONOS AL FESTIVAL DE LAS FLORES A GUATEMALA
                                       </option>
                                       <option data-select2-id="148">VÁMONOS A NICARAGUA</option>
                                       <option data-select2-id="149">¡ ¡ ¡ VÁMONOS A MACHUPICCHU !!!</option>
                                       <option data-select2-id="161">¡¡¡VAMONOS A ORIENTE - VOLCAN DE CONCHAGUA!!!
                                       </option>
                                       <option data-select2-id="163">¡¡¡ PAQUETE A PARADISIACA ROATÁN!!!</option>
                                    </select>
                                 </div>
                              </div>
                           </div>



                        </div>

                     </div>

                  </div>
               </div>
               <!-- END timeline item -->
               <!-- timeline item -->
               <div>
                  <i class="fas fa-user bg-green"></i>
                  <div class="timeline-item">
                     <!--<span class="time"><i class="fas fa-clock"></i> 5 mins ago</span>-->
                     <h3 class="timeline-header no-border"><a href="#">Numero de asientos</a></h3>
                     <div class="timeline-body">
                        <div class="row">
                           <div class="col-sm-3">
                              <div class="form-group">
                                 <label>Adultos (+12 años)</label>
                                 <input type="number" class="form-control" min="1" max="100">
                              </div>
                           </div>
                           <div class="col-sm-3">
                              <div class="form-group">
                                 <label>Niños (5 a 11 años)</label>
                                 <input type="number" class="form-control" min="1" max="10">
                              </div>
                           </div>
                           <div class="col-sm-3">
                              <div class="form-group">
                                 <label>Bebés (0 a 4 años)</label>
                                 <input type="number" class="form-control" min="1" max="4">
                              </div>
                           </div>
                           <div class="col-sm-3">
                              <div class="form-group">
                                 <label>Tercera edad (+60)</label>
                                 <input type="number" class="form-control" min="1" max="5">
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- END timeline item -->
               <!-- timeline item -->
               <div>
                  <i class="fas fa-list bg-yellow"></i>
                  <div class="timeline-item">
                     <!--<span class="time"><i class="fas fa-clock"></i> 27 mins ago</span>-->
                     <h3 class="timeline-header"><a href="#">Costo total del Paquete</a>
                     </h3>
                     <div class="timeline-body">
                        <div class="row">
                           <div class="offset-4"></div>
                           <div class="col-md-4">
                              <div class="form-group">
                                 <label>Total</label>
                                 <div class="input-group">
                                    <input type="text" class="form-control" value="$239.43">
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="timeline-footer" style="text-align: right;">
                           <a class="btn btn-info btn-sm" style="color: white">Guardar</a>
                           <a class="btn btn-danger btn-sm" style="color: white">Cancelar</a>
                        </div>

                     </div>
                  </div>
               </div>
            </div>
            <!-- END timeline item -->
            <?php
  include_once '../../plantillas/footer.php';
?>

            <!-- formulario mantenimiento -->
            <!-- /.card-header -->

            <!-- DataTables -->
            <script src="http://localhost/Plantillas/SistemaAgencia/plugins/datatables/jquery.dataTables.min.js">
            </script>
            <script
               src="http://localhost/Plantillas/SistemaAgencia/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js">
            </script>
            <script
               src="http://localhost/Plantillas/SistemaAgencia/plugins/datatables-responsive/js/dataTables.responsive.min.js">
            </script>
            <script
               src="http://localhost/Plantillas/SistemaAgencia/plugins/datatables-responsive/js/responsive.bootstrap4.min.js">
            </script>

            <script>
            $(function() {
               $("#example1").DataTable({
                  "responsive": true,
                  "autoWidth": false,
               });
               $('#example2').DataTable({
                  "paging": true,
                  "lengthChange": false,
                  "searching": false,
                  "ordering": true,
                  "info": true,
                  "autoWidth": false,
                  "responsive": true,
               });
            });
            </script>


            <!--                esto  es para la seleccion multiplo-->
            <!--necesario para que funcione el selector multiple-->
            <script src="<?= $base_url ?>plugins/select2/js/select2.full.min.js"></script>

            <script>
            $(function() {
               //Initialize Select2 Elements
               $('.select2').select2()

               //Initialize Select2 Elements
               $('.select2bs4').select2({
                  theme: 'bootstrap4'
               })

               //Datemask dd/mm/yyyy
               $('#datemask').inputmask('dd/mm/yyyy', {
                  'placeholder': 'dd/mm/yyyy'
               })
               //Datemask2 mm/dd/yyyy
               $('#datemask2').inputmask('mm/dd/yyyy', {
                  'placeholder': 'mm/dd/yyyy'
               })
               //Money Euro
               $('[data-mask]').inputmask()

               //Date range picker
               $('#reservationdate').datetimepicker({
                  format: 'L'
               });
               //Date range picker
               $('#reservation').daterangepicker()
               //Date range picker with time picker
               $('#reservationtime').daterangepicker({
                  timePicker: true,
                  timePickerIncrement: 30,
                  locale: {
                     format: 'MM/DD/YYYY hh:mm A'
                  }
               })
               //Date range as a button
               $('#daterange-btn').daterangepicker({
                     ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
                           'month').endOf('month')]
                     },
                     startDate: moment().subtract(29, 'days'),
                     endDate: moment()
                  },
                  function(start, end) {
                     $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format(
                        'MMMM D, YYYY'))
                  }
               )

               //Timepicker
               $('#timepicker').datetimepicker({
                  format: 'LT'
               })

               //Bootstrap Duallistbox
               $('.duallistbox').bootstrapDualListbox()

               //Colorpicker
               $('.my-colorpicker1').colorpicker()
               //color picker with addon
               $('.my-colorpicker2').colorpicker()

               $('.my-colorpicker2').on('colorpickerChange', function(event) {
                  $('.my-colorpicker2 .fa-square').css('color', event.color.toString());
               });

               $("input[data-bootstrap-switch]").each(function() {
                  $(this).bootstrapSwitch('state', $(this).prop('checked'));
               });

            })
            </script>