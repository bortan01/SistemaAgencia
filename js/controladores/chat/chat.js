

let chat_data = {};
let uid_administrador;
let uid_cliente;
let chat_uuid ;
let fotoReceptor;
let chatViejo;
let chatHTML = "";
let newMessage = "";
let referenciaRT;
let activarSonido = false;
let proximaConsulta;
let fotoEmisor;


getUsers();



$(document.body).on("click", ".user", function () {
  //ESTA PARTE ES PARA EL EFECTO CSS DE CAMBIO
  let chatNuevo = $(this);
  chatNuevo.css("background", "#cecece");
  if (chatViejo && !chatNuevo.is(chatViejo)) {
    chatViejo.css("background", "transparent");
  }
  chatViejo = chatNuevo;

  ///con esto se arregla el bug de tener suscripciones activas
  if (referenciaRT) {
    referenciaRT();
  }

  let name = $(this).find("strong").text();
  fotoReceptor = $(this).find('img').attr("src");
  uid_cliente = $(this).attr("uuid");
  $(".message-container").html("Cargando Mensajes...");
  $(".name").text(name);
  $('#btn-enviar').prop('disabled', false);
  proximaConsulta = null;

  //OBTEGO LOS DATOS PARTICULARES DE ESE CHAT
  $.ajax({
    url: URL_SERVIDOR+"Usuario/obtenerChat",
    method: "POST",
    data: { user_1: uid_administrador, user_2: uid_cliente },
    success: function (infoChat) {
      $(".message-container").empty();
      chat_uuid = infoChat.chat_uuid
      activarSonido = false;
      realTime();
    },
  });

});

$('#chats').scroll(function () {
  if ($('#chats').scrollTop() == 0) {
    console.log("cargar nuevos datos");
    activarSonido = false;

    if (proximaConsulta) {
      proximaConsulta
        .get()
        .then(function (querySnapshot) {
          let arrMessage = [];
          querySnapshot.forEach(function (doc) {
            if (doc.data().user_1_uuid == uid_administrador) {
              ///debe de mostrar la foto de quien esta enviando el mensaje EMISOR
              let newMessage =
                '<div class="message-block received-message">' +
                '<div class="user-icon"><img  src="' + fotoEmisor + '" class="user-icon"/></div>' +
                '<div class="message">' +
                doc.data().message +
                "</div>" +
                "</div>";
              arrMessage.push(newMessage);
            } else {
              if (activarSonido) {
                ///HACEMOS ESTO PARA EVITAR QUE SUENE EL TONO CUANDO SE ESTA INICIALIZANDO LA DATA
                let audio = new Audio('new-ticket.mp3');
                audio.play();
              }
              //debe de mostrar la foto de quien se esta recibiendo el mensaje (la imagen que aca de darse click) RECEPTOR
              let newMessage =
                '<div class="message-block ">' +
                '<div class="user-icon"><img  src="' + fotoReceptor + '" class="user-icon"/></div>' +
                '<div class="message">' +
                doc.data().message +
                "</div>" +
                "</div>";
              arrMessage.push(newMessage);
            }
          });
          ///CON ESTO AGREGAMOS LOS NUEVOS CHAT HASTA ARRIBA 
          arrMessage.forEach(element => { $(".message-container").prepend(element); });
          //PARA CUANDO SE CARGUE LOS NUEVOS MENSAJES EL SCROLL QUEDE EN LA MISMA POSICION
          //CADA MENSAJE OCUPA 52.0 PX DE ALTURA
          $(".chats").scrollTop(arrMessage.length * 52.0);

          //PREPARAMOS EL TERRENO PARA UNA NUEVA CONSULTA
          let lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          proximaConsulta = db.collection("chat")
            .where("chat_uuid", "==", chat_uuid)
            .orderBy("time", "desc")
            .startAfter(lastVisible)
            .limit(2);

        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
  }
});

$('#message-input').on('keypress', function (e) {
  let keycode = (e.keyCode ? e.keyCode : e.which);
  if (keycode == '13') {
    enviarMensaje();
    e.preventDefault();
    return false;
  }
});
$(".send-btn").on("click", function () {
  enviarMensaje();
});

function getUsers() {
  $.ajax({
    url: URL_SERVIDOR+"/Usuario/obtenerUsuarioByChat",
    method: "GET",
    success: function (response) {
      if (!response.error) {
        uid_administrador = response.administrador.uuid;
        fotoEmisor = response.administrador.foto;
        let users = response.usuarios;
        let usersHTML = "";
        $.each(users, function (index, value) {
          //SE RECORREN TODOS LOS USUARIOS Y SE PONEN EN LA LISTA
          //DE CHATS CON ECEPCCION DEL MISMO LA FOTO DEL USUARIO ACTUAL
          if (uid_administrador != value.uuid) {
            usersHTML +=
              '<div class="user" uuid="' +
              value.uuid +
              '">' +
              // '<img  src="' + value.foto + '" class="user-image"/>' +
              '<div class="user-image"><img  src="' + value.foto + '" class="user-image"/></div>' +
              '<div class="user-details">' +
              "<span><strong>" +
              value.nombre +
              '<span class="count"></span></strong></span>' +
              "<span></span>" +
              "</div>" +
              "</div>";
          }
        });
        // DIBUJAMOS LOS USUARIOS EN LA BARRA LATERAL
        $(".users").html(usersHTML);
        actualizarFecha(uid_administrador);
      } else {
        console.log(response.message);
      }
    },
  });
}
///CREA UN LISTERNER INTERNAMENTE PARA CREAR LOS NUEVOS MENSAJES EN PANTALLA
function realTime() {
  referenciaRT = db.collection("chat")
    .where("chat_uuid", "==", chat_uuid)
    .orderBy("time", "desc")
    .limit(15)
    .onSnapshot(function (snapshot) {
      newMessage = "";
      snapshot.docChanges().slice().reverse().forEach(function (change) {

        if (!proximaConsulta) {
          let lastVisible = snapshot.docs[snapshot.docs.length - 1];
          proximaConsulta = db.collection("chat")
            .where("chat_uuid", "==", chat_uuid)
            .orderBy("time", "desc")
            .startAfter(lastVisible)
            .limit(2);
        }

        if (change.type === "added") {
          if (change.doc.data().user_1_uuid == uid_administrador) {
            ///debe de mostrar la foto de quien esta enviando el mensaje EMISOR
            newMessage +=
              '<div class="message-block received-message">' +
              '<div class="user-icon"><img  src="' + fotoEmisor + '" class="user-icon"/></div>' +
              '<div class="message">' +
              change.doc.data().message +
              "</div>" +
              "</div>";
          } else {
            if (activarSonido) {
              let audio = new Audio('new-ticket.mp3');
              audio.play();
            }
            //debe de mostrar la foto de quien se esta recibiendo el mensaje (la imagen que aca de darse click) RECEPTOR
            newMessage +=
              '<div class="message-block ">' +
              '<div class="user-icon"><img  src="' + fotoReceptor + '" class="user-icon"/></div>' +
              '<div class="message">' +
              change.doc.data().message +
              "</div>" +
              "</div>";
          }
        }
        if (change.type === "modified") {
        }
        if (change.type === "removed") {
        }
      });
      if (chatHTML != newMessage) {
        $(".message-container").append(newMessage);
      }
      activarSonido = true;
      $(".chats").scrollTop($(".chats")[0].scrollHeight);
    });
}
function enviarMensaje() {
  let message = $(".message-input").val();
  if (message != "") {
    db.collection("chat")
      .add({
        message: message,
        user_1_uuid: uid_administrador,
        user_2_uuid: uid_cliente,
        chat_uuid: chat_uuid,
        user_1_isView: 0,
        user_2_isView: 0,
        time: new Date(),
      })
      .then(function (docRef) {
        $(".message-input").val("");
        // console.log("Document written with ID: ", docRef.id);
        actualizarFecha(uid_cliente);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }
}
function actualizarFecha(uuid) {
  $.ajax({
    url: URL_SERVIDOR+"/Usuario/updateFecha",
    method: "PUT",
    data: { uuid },
    success: function (resp) {
      // console.log(resp);
    },
  });
}