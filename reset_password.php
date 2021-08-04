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
   <link href="./plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.css" rel="stylesheet" type="text/css" />
</head>

<body class="hold-transition login-page">
   <div class="login-box">
      <div class="login-logo">
         <a href=""><b>Administración</b><br>Martínez Travels & Tours</a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
         <div class="card-body login-card-body">
            <p class="login-box-msg">Te enviaremos un correo electrónico para reestablecer tu contraseña</p>
            <form id="login-form">
               <div class="input-group mb-3">
                  <input name="email" id="email" type="email" class="form-control" autocomplete="off"
                     placeholder="Digite su Correo Electrónico">
                  <div class="input-group-append">
                     <div class="input-group-text">
                        <span class="fas fa-user"></span>
                     </div>
                  </div>
               </div>

            </form>
            <div class="social-auth-links text-center mb-3">

               <button id="login-btn" href="home" class="btn btn-block btn-primary">
                  <i class="fab fa-dot-circle-o mr-2"></i> Enviar
               </button>

            </div>
            <!-- /.social-auth-links -->

            <p class="mb-1" style="text-align: center;">
               <a href="./index.php">Iniciar Sesión</a>
            </p>

         </div>
         <!-- /.login-card-body -->
      </div>
   </div>
   <!-- /.login-box -->

   <!-- jQuery -->
   <script src="plugins/jquery/jquery.min.js"></script>
   <!-- Bootstrap 4 -->
   <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
   <!-- AdminLTE App -->
   <script src="dist/js/adminlte.min.js"></script>
   <script src="./plugins/sweetalert2/sweetalert2.js"></script>
   <script src="./plugins/jquery-validation/jquery.validate.min.js"></script>
   <script src="./plugins/jquery-validation/additional-methods.min.js"></script>
   <script src="./js/controladores/firebase/firestore-config.js"></script>
   <script src="./js/controladores/firebase/reset_password.js"></script>
</body>

</html>