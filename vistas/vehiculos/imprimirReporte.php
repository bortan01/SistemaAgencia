<?php
include_once '../../config/parametros.php';
include_once '../session/isEmpleado.php'; 
include_once '../../plantillas/cabecera.php';
include_once  '../../plantillas/navbar.php';
include_once '../../plantillas/barra_lateral.php';
?>


<body>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="wrapper">
                <!-- Main content -->
                <section class="invoice">
                    <!-- title row -->
                    <div class="row">
                        <div class="col-12">
                            <h2 class="page-header">
                                <i class="fas fa-globe"></i>Agencia Martínez Travels & Tours
                                <small class="float-right">Fecha: 01/05/2020</small>
                            </h2>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- info row -->
                    <div class="row invoice-info">
                        <div class="col-sm-3 invoice-col">
                            <br>
                            <address>
                                <strong>Cliente:</strong><br>
                                Abigail Pineda Henríquez<br>
                                Barrio San Francisco, San Vicente<br>
                                Teléfono: (503) 7510-2588<br>
                                Correo: pineverdi@gmail.com
                            </address>
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-6 invoice-col">
                            <br>
                            <address>
                                <strong>Alquiler:</strong><br>
                                Recogida: Servicio a Domicilio #41, Barrio San Francisco, San Vicente. <br>
                                Devolución: Agencia de Viajes, #4D a 150mts del Parquecito Infantil,<br> San
                                Vicente.

                            </address>
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-3 invoice-col">
                            <br>
                            <address>
                                <strong></strong><br>
                                Fecha: 01/05/2020 3:00 PM <br>
                                Fecha: 02/05/2020 3:00 PM<br>

                            </address>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    <!-- Table row -->
                    <div class="row">
                        <div class="col-12 table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Producto</th>
                                        <th>Placa</th>
                                        <th>Descrición</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Hyundai Elantra 2014</td>
                                        <td>AA12345</td>
                                        <td>Color: Gris, Transmisión: Automática, Full Extras, 4 puertas </td>
                                        <td>$28.50</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>WI-FI móvil</td>
                                        <td>N/A</td>
                                        <td>Conectividad móvil hasta para 5 dispositivos</td>
                                        <td>$10.99</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                        <!-- /.col -->
                    </div>
                    <!-- /.row -->

                    <div class="row">
                        <!-- accepted payments column -->
                        <div class="col-6">

                            <p class="text-muted well well-sm shadow-none" style="margin-top: 10px;">
                                Importante: <br>
                                Las compañías de alquiler se reservan el derecho de rechazar el alquiler<br>
                                de vehículo a menores de edad, personas sin licencia de conducir, personas<br>
                                incapaces de demostrar capacidad crediticia para el pago o personas que, <br>
                                según la opinión de la compañía de alquiler, constituyan un riesgo.<br>
                            </p>
                        </div>
                        <!-- /.col -->
                        <div class="col-6">


                            <div class="table-responsive">
                                <table class="table">
                                    <tr>
                                        <th style="width:50%">Subtotal:</th>
                                        <td>$39.49</td>
                                    </tr>
                                    <tr>
                                        <th>Impuesto (5%)</th>
                                        <td>$1.97</td>
                                    </tr>

                                    <tr>
                                        <th>Total:</th>
                                        <td>$41.46</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                </section>
                <!-- /.content -->
            </div>
            <!-- ./wrapper -->

<?php
  include_once '../../plantillas/footer.php';
?>


            <script type="text/javascript">
            window.addEventListener("load", window.print());
            </script>
</body>

</html>