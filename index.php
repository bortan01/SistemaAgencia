<?php
session_start();
if (isset($_SESSION["activoA"]) && isset($_SESSION["nivelA"])) {
   header('Location: home.php');
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Martínez Travels & Tours</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Font Awesome -->

    <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- icheck bootstrap -->
    <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="dist/css/adminlte.min.css">
    <!-- Google Font: Source Sans Pro -->
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
    <!-- CONFIGURACION DE CHAT -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <!-- Firebase App is always required and must be first -->
    <script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js"></script>
    <!-- Add additional services that you want to use -->
    <script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.7.0/firebase-firestore.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/chat.css">
    <link rel="stylesheet" type="text/css" href="./css/avion.css">

    <link href="./plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.css" rel="stylesheet" type="text/css" />
</head>

<body class="hold-transition login-page">
            <svg viewBox="0 0 3387 1075">
                <path id="caminoAvion" class="caminoAvion"
                    d="M-226 626c439,4 636,-213 934,-225 755,-31 602,769 1334,658 562,-86 668,-698 266,-908 -401,-210 -893,189 -632,630 260,441 747,121 1051,91 360,-36 889,179 889,179" />
                <g id="avion">
                    <polygon class="fil1" points="-141,-10 199,0 -198,-72 -188,-61 -171,-57 -184,-57 " />
                    <polygon class="fil2" points="199,0 -141,-10 -163,63 -123,9 " />
                    <polygon class="fil3"
                        points="-95,39 -113,32 -123,9 -163,63 -105,53 -108,45 -87,48 -90,45 -103,41 -94,41 " />
                    <path class="fil4"
                        d="M-87 48l-21 -3 3 8 19 -4 -1 -1zm-26 -16l18 7 -2 -1 32 -7 -29 1 11 -4 -24 -1 -16 -18 10 23zm10 9l13 4 -4 -4 -9 0z" />
                    <polygon class="fil1" points="-83,28 -94,32 -65,31 -97,38 -86,49 -67,70 199,0 -123,9 -107,27 " />
                </g>
                <!-- Define the motion path animation -->
                <animateMotion xlink:href="#avion" dur="5s" repeatCount="indefinite" rotate="auto">
                    <mpath xlink:href="#caminoAvion" />
                </animateMotion>
            </svg>
    <div class="login-box">
        <div class="login-logo">
            <a href=""><b>Administración</b><br>Martínez Travels & Tours</a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Identifícate para Iniciar Sesión</p>
                <form id="login-form">
                    <div class="input-group mb-3">
                        <input name="username" id="username" type="email" class="form-control"
                            placeholder="Correo Electrónico" autocomplete="off">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" id="password" name="password" class="form-control"
                            placeholder="Contraseña" autocomplete="off">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="social-auth-links text-center mb-3">

                    <button id="login-btn" href="home" class="btn btn-block btn-primary">
                        <i class="fab fa-dot-circle-o mr-2"></i> Ingresar
                    </button>

                </div>
                <!-- /.social-auth-links -->

                <p class="mb-1" style="text-align: center;">
                    <a href="./reset_password.php">Olvidé mi Contraseña</a>
                </p>

            </div>
            <!-- /.login-card-body -->
        </div>
    </div>
    <!-- /.login-box -->

    <!-- jQuery -->
    <script src="js/controladores/conf.js"></script>
    <script src="plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="dist/js/adminlte.min.js"></script>
    <script src="./plugins/sweetalert2/sweetalert2.js"></script>
    <script src="./plugins/jquery-validation/jquery.validate.min.js"></script>
    <script src="./plugins/jquery-validation/additional-methods.min.js"></script>
    <script src="./js/controladores/firebase/firestore-config.js"></script>
    <script src="./js/controladores/firebase/main.js"></script>
</body>

</html>