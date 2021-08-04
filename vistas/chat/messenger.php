<!-- INICIALIZACION -->
<?php include_once '../../config/parametros.php'; ?>
<?php include_once '../../vistas/session/isEmpleado.php'; ?>
<?php include_once '../../plantillas/cabecera.php'; ?>
<link rel="stylesheet" type="text/css" href="../../css/messenger.css">
<?php include_once '../../plantillas/navbar.php'; ?>
<?php include_once '../../plantillas/barra_lateral.php'; ?>
<div class="content-wrapper">

   <!-- Main content -->
   <section class="content">

      <div class="main-wrapper">

         <div class="flex-box">
            <div class="box-1">
               <div class="messenger">
                  <div class="heading"><i class="fab fa-facebook-messenger"></i>&nbsp;<span>Messenger</span></div>
                  <div class="users">
                  </div>
               </div>
            </div>
            <div class="box-2">
               <div class="chat-container">
                  <div class="heading"><i class="fas fa-user"></i>&nbsp;<span class="name"></span></div>
                  <div class="messages">
                     <div class="chats" id="chats">
                        <div class="message-container">
                           <img src="http://localhost/plantillas/SistemaAgencia/img/logo.jpg" class="user-image"
                              style="height: auto;    width: 40%; display: block; margin: auto;" />
                           <span style="text-align: center; display: block; font-size: xxx-large;">seleccione un
                              chat</span>
                        </div>
                     </div>
                     <div class="write-message">
                        <div class="message-area">
                           <textarea class="message-input" id="message-input"
                              placeholder="Escribe tu mensaje"></textarea>
                           <button id="btn-enviar" class="send-btn"><i
                                 class="fab fa-telegram-plane"></i>&nbsp;Enviar</button>
                        </div>
                     </div>

                  </div>

               </div>
            </div>
         </div>
      </div>
   </section>
</div>

<?php include_once '../../plantillas/footer.php'; ?>
<script src="../../js/controladores/chat/chat.js"></script>
<?php include_once '../../plantillas/cierre.php'; ?>