(function () {

    var user = {
        templateUrl:'app/components/user_profile/user_profile.html',
        controller:profileController
    }

    profileController.$inject = ['$routeParams','hidalgoService','$firebaseAuth','$http','$httpParamSerializerJQLike'];
    function profileController($routeParams,hidalgoService,$firebaseAuth,$http,$httpParamSerializerJQLike) {

        var self = this;
        self.perfil = {}

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
            //console.log('mi user: ',self.usuario);
            var data = {'uid':self.usuario.uid}
            $http({
                method:'POST',
                // url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/save/',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/profile/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializerJQLike(data)
            })
            .then(function(res){
                //console.log(res)
                self.perfil = res.data[0].fields
            })
            .catch(function(err){
                console.log(err)
                // self.error = true;
            });
            hidalgoService.getUserProjects(self.usuario.uid)
            // $http.get('http://localhost:8000/projects?user_id='+self.usuario.uid)
                .then(function (response) {
                    self.userProjects = response.data
                    //console.log(self.userProjects)
                })

          }else{
            console.log(self.usuario);
          }
        }); //checklogin
    
        self.actualizarDatos = function (info) {

            self.newData = {
                'name': self.perfil.name,
                'displayName':self.usuario.displayName,
                'email':self.usuario.email,
                'edad': self.perfil.edad,
                'ocupacion': self.perfil.ocupacion,
                'telefono': self.perfil.telefono,
                'uid':self.usuario.uid
            }

            $http({
                method:'POST',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/save/',
                // url:'http://localhost:8000/account/save/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializerJQLike(self.newData)
            })
            .then(function(res){
                self.exito = true;
                console.log(res)
            })
            .catch(function(err){
                self.error = true;
                console.log(err)
            });

        }
    }

    angular
        .module('hidalgo')
        .component('userProfileComponent',user)
        .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

})();