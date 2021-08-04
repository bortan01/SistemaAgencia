$("#logout-btn").on("click", function() {
   firebase.auth().signOut().then(() => {
      localStorage.clear();
      window.location.href = URL_SISTEMA;

    }).catch((error) => {
      console.log(error)
    });
});