(function () {

    var navbar = {
        templateUrl: 'app/components/navbar/navbar.html',
        controller:navController
    }

    function navController($firebaseAuth,$location){
        var self = this;
        var auth = $firebaseAuth();

        //Tooltips
          $('[data-toggle="tooltip"]').tooltip();

        //obtenemos al usuario si ya está
        auth.$onAuthStateChanged(function(firebaseUser) {
          self.user = firebaseUser;
          if(self.user){
            // self.alert = "Bienvenido "+self.user.displayName;
            // self.cuentale()
          }else{
            console.log(self.user);
          }
        }); //checklogin

        self.goProfile = function(){
            $location.path('/profile');
        } //go profile

        //logout del usuario
        self.logOut = function(){
            auth.$signOut();
          $location.path('/')
            self.user = null;
        }

        self.isActive = function (route) {
            return route === $location.path();
        }
            

    }//controller

    angular
        .module('hidalgo')
        .component('navbarComponent',navbar);

})();