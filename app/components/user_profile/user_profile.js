(function () {

    var user = {
        templateUrl:'app/components/user_profile/user_profile.html',
        controller:profileController
    }

    profileController.$inject = ['$routeParams','hidalgoService','$firebaseAuth','$http','$httpParamSerializerJQLike'];
    function profileController($routeParams,hidalgoService,$firebaseAuth,$http,$httpParamSerializerJQLike) {

        var self = this;

        $('#myModal').modal('toggle')

        self.titulon = "Mi Proyecto";
        self.cuerpon = "Descripción de mi proyecto";

        var auth = $firebaseAuth();

        //obtenemos al usuario si ya está
        auth.$onAuthStateChanged(function(firebaseUser) {
          self.usuario = firebaseUser;
          if(self.usuario){
            self.alert = "Bienvenido " + self.usuario.displayName;
            //self.cuentale()
           // console.log('rayos: ',self.usuario.photoURL);
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
    
        self.actualizarDatos = function (info) {

            self.newData = {
                'name': self.usuario.displayName,
                'email':self.usuario.email,
                'edad': info.edad,
                'ocupacion': info.ocupacion,
                'telefono': info.telefono,
                'uid':self.usuario.uid
            }

            $http({
                method:'POST',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/save/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializerJQLike(self.newData)
            })
            .then(function(res){
                console.log(res)
            })
            .catch(function(err){
                console.log(err)
            });

        }


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