(function () {

    var newChild = {
        templateUrl:'/app/components/Nuevo_proyecto_niños/new_niños.html',
        controller:projectChildController
    }

    function projectChildController($firebaseAuth,$http,$cookies,$scope,$route) {

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


// Subir imagen flow
        $scope.obj = {};

        $scope.borra = function(que){
            // console.log($scope.obj);
            if (que === 1){
                $scope.obj.flow.files.splice(0, 1);
            }else{
                $scope.obj2.flow.files.splice(0, 1);
            }
             
            // console.log($scope.obj);
        }
        
$scope.sendData = function(){
    var csrf = $cookies.get('csrftoken');
            var fd = new FormData();
            var objeto = {
                    'csrfmiddlewaretoken': csrf,
                    "nombre":project_child.child_name,
                    "edad":project_child.edad,
                    "img":project_child,
                    "titulo":project_child.titulo,
                    "problematica":project_child.problematica,
                    "email":project_child.correo
                    }

            for ( var key in objeto ) {
                    fd.append(key, objeto[key]);
                }
            if ($scope.obj.flow.files[0] !== undefined){
                fd.append('img',$scope.obj.flow.files[0].file);
            }
            
            $http({
                method:'POST',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/ninos/',
                data:fd,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
                // headers: { 'Content-Type': 'multipart/form-data' },
                // data: $httpParamSerializerJQLike(objeto),
                // data:$httpParamSerializerJQLike(objeto),
                // file:{'img':$scope.obj.flow.files[0]}
            })
            .then(function(res){
                console.log(res)
                $route.reload();
            })
            .catch(function(err){
                console.log(err)
                alert('Hey!..Parece que tu archivo o imagen son muy grandes,prueba con una más pequeña.');
            })


            
        } //updateProject

    }

    angular
        .module('hidalgo')
        .component('newProjectChildren',newChild);
})();