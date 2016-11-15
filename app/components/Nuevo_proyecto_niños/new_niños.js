(function () {

    var newChild = {
        templateUrl:'/app/components/Nuevo_proyecto_niños/new_niños.html',
        controller:projectChildController
    }

    function projectChildController($firebaseAuth) {
        var project_child = this;

        var auth = $firebaseAuth();
        project_child.nombre_face = false;

        project_child.signIn = function(provider){


            //con redes sociales
            if(provider){

            auth.$signInWithPopup(provider)
            .then(function(result) {
              //console.log("Signed in as:", result.user.uid);
              //project_child.name = "Bienvenido "+result.user.displayName;
              project_child.child_name = result.user.displayName
              project_child.correo = result.user.email
              project_child.nombre_face = true;
              console.log(result)
              console.log(project_child.user_name)
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