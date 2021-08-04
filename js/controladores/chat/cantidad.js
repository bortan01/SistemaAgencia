function obenerChats() {

   $.ajax({
      url:  URL_SERVIDOR+ "Usuario/obtenerAdminByChat",
      method: "GET"
   }).done(function (response) {
      // //CARGAMOS EL COSTO AL INPUT
      let listChats = [];
      // console.log(response.ultimaConexion);
      let lastConnection  =new Date (response.ultimaConexion);
      db.collection("chat")
         .where("time", ">",lastConnection)
         .get()
         .then((chats) => {
            chats.forEach(chat => {
               listChats.push(chat.data().chat_uuid);
            });
            let chatsUnicos = listChats.filter(unique);
            $('#mensajesPendientes').text(chatsUnicos.length);
         })
         .catch((e) => {
            console.log(e);
         });

      ;
   }).fail(function (response) {
      console.log(response);

   });

}

obenerChats();

function unique(value, index, self) {
   return self.indexOf(value) === index
}
