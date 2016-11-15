(function () {

    var newChild = {
        templateUrl:'/app/components/Nuevo_proyecto_niños/new_niños.html',
        controller:projectChildController
    }

    function projectChildController() {
        var project_child = this;

        project_child.signIn = function(provider){


            //con redes sociales
            if(provider){

            auth.$signInWithPopup(provider)
            .then(function(result) {
              console.log("Signed in as:", result.user.uid);
              project_child.name = "Bienvenido "+result.user.displayName;

            })
            .catch(function(error) {
              console.error("Authentication failed:", error);
            });
        } //el if
        } //signIn
    }

    angular
        .module('hidalgo')
        .component('newProjectChildren',newChild);
})();