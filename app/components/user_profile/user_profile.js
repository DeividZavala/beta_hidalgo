(function () {

    var user = {
        templateUrl:'app/components/user_profile/user_profile.html',
        controller:profileController
    }

    profileController.$inject = ['$routeParams','hidalgoService','$firebaseAuth'];
    function profileController($routeParams,hidalgoService,$firebaseAuth) {

        $('#myModal').modal('toggle')
        var self = this;

        self.titulon = "Mi Proyecto";
        self.cuerpon = "Descripción de mi proyecto";

        var auth = $firebaseAuth();

        //obtenemos al usuario si ya está
        auth.$onAuthStateChanged(function(firebaseUser) {
          self.usuario = firebaseUser;
          if(self.usuario){
            // self.alert = "Bienvenido "+self.user.displayName;
            // self.cuentale()
            console.log('rayos: ',self.usuario.photoURL);
            console.log('mi user: ',self.usuario);
            hidalgoService.getUserProjects(self.usuario.uid)
                .then(function (response) {
                    self.userProjects = response.data
                    console.log(self.userProjects)
                })

          }else{
            console.log(self.usuario);
          }
        }); //checklogin


        self.panelSetTab = panelSetTab;
        self.checkTab = checkTab;
        self.tab = 1;
        
        function panelSetTab(setTab) {
            self.tab = setTab;
        }

        function checkTab(checkTab) {
            return self.tab === checkTab;
        }
    }

    angular
        .module('hidalgo')
        .component('userProfileComponent',user);
})();