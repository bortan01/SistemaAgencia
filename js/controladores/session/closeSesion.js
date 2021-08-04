$("#logout").on("click", function () {
   firebase.auth().signOut().then(() => {
      console.log("cerrando sesion");
   }).catch((error) => {
      console.log(error);
   });
   let rute = URL_SISTEMA + "vistas/session/end.php";
   $.post(rute, {
      action: "logout"
   }, function (data) {
      localStorage.clear();
      location = URL_SISTEMA;
   });
});