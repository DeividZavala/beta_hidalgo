(function () {

    var user = {
        templateUrl:'app/components/user_profile/user_profile.html',
        controller:profileController
    }

    profileController.$inject = ['$routeParams','hidalgoService','$firebaseAuth'];
    function profileController($routeParams,hidalgoService,$firebaseAuth) {
        let profile = this;
        let self = this;

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


          }else{
            console.log(self.usuario);
          }
        }); //checklogin


        profile.panelSetTab = panelSetTab;
        profile.checkTab = checkTab;
        profile.tab = 1;

        profile.userId = $routeParams.id;
        console.log(profile.userId)

        hidalgoService.userDetail(profile.userId).then(function (response) {
            profile.userProfile = response.data[0].fields
            console.log(profile.userProfile)
        })

        function panelSetTab(setTab) {
            profile.tab = setTab;
        }

        function checkTab(checkTab) {
            return profile.tab === checkTab;
        }
    }

    angular
        .module('hidalgo')
        .component('userProfileComponent',user);
})();