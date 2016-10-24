(function () {

    var details = {
        templateUrl:'app/components/project_details/project_details.html',
        controller: projectDetailsController
    }

    function projectDetailsController(hidalgoService,$routeParams,$scope,$http,$firebaseAuth,$httpParamSerializerJQLike,$location,$cookies,$route) {
        var projectDetails = this;
        var self = this;
        $scope.gif = false;
        //tooltips
        $('[data-toggle="tooltip"]').tooltip();
        // Barra de progreso
        $scope.suma = [0,0,0,0,0];
        $scope.total=$scope.suma[0]+$scope.suma[1]+$scope.suma[2]+$scope.suma[3]+$scope.suma[4];


        // Subir imagen flow
        $scope.obj = {};
        $scope.obj2 = {};
        $scope.borra = function(que){
            // console.log($scope.obj);
            if (que === 1){
                $scope.obj.flow.files.splice(0, 1);
            }else{
                $scope.obj2.flow.files.splice(0, 1);
            }
             
            // console.log($scope.obj);
        }
        $scope.consola = function(){
            // console.log($flow.files);
            console.log($scope.obj.flow.files[0].file);
            var csrf = $cookies.get('csrftoken');
            var fd = new FormData();
            var objeto = {
                'title':'orale papud',
                'uid':'maria y lupe',
                'csrfmiddlewaretoken': csrf
            }
            for ( var key in objeto ) {
                    fd.append(key, objeto[key]);
                }
            fd.append('img',$scope.obj.flow.files[0].file);
            $http({
                method:'POST',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/'+21+'/',
                data:fd,
                headers: {'Content-Type': undefined},
                // transformRequest: angular.identity
                // headers: { 'Content-Type': 'multipart/form-data' },
                // data: $httpParamSerializerJQLike(objeto),
                // data:$httpParamSerializerJQLike(objeto),
                // file:{'img':$scope.obj.flow.files[0]}
            })
            .then(function(res){
                console.log(res)
            })
            .catch(function(err){
                console.log(err)
            })
        }

        // La barra de progreso

        $scope.barra = function(){
            $scope.total = 50;
            if ($scope.proyecto.objetivo_general === ''){
                    $scope.suma[0]=0;
                }else{
                    $scope.suma[0]=10;
                }
                if ($scope.proyecto.indicador === ''){
                    $scope.suma[1]=0;
                }else{
                    $scope.suma[1]=10;
                }
                if ($scope.proyecto.planteamiento === ''){
                    $scope.suma[2]=0;
                }else{
                    $scope.suma[2]=10;
                }
                if ($scope.proyecto.alcance === ''){
                    $scope.suma[3]=0;
                }else{
                    $scope.suma[3]=10;
                }if ($scope.proyecto.municipio === ''){
                    $scope.suma[4]=0;
                }else{
                    $scope.suma[4]=10;
                }

            for (i=0;i<=4;i++){
                //console.log($scope.total,$scope.suma)
                $scope.total += $scope.suma[i]
            }
            // $scope.total+=40;
            //console.log("final",$scope.total,$scope.suma);
            //console.log($scope.proyecto.objetivo_general);

        } //barra



        //console.log("entre al controller");




        //obtenemos al usuario si ya está
        var auth = $firebaseAuth();
        auth.$onAuthStateChanged(function(firebaseUser) {
          self.user = firebaseUser;

          if(self.user){

             // self.alert = "Bienvenido "+self.user.displayName;
            // self.cuentale()

          }else{

          }
        }); //checklogin


        //traemos datos


        // projectDetails.id = $routeParams.id;
        // console.log(projectDetails.id)

       // hidalgoService.getProjectDetail(projectDetails.id)
       $http.get('http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/'+$routeParams.id+'/')
            .then(function (response) {
                projectDetails.data = response.data[0]
                //console.log(projectDetails.data)
               // console.log(projectDetails.data.fields.title)
                //console.log("la imagen",projectDetails.data.fields.imagen)
                $scope.proyecto = response.data[0].fields
                $scope.proyecto.pk = response.data[0].pk
                $scope.pro = $scope.proyecto
                $scope.barra();
                

            });


        $scope.updateProject = function(){
            $scope.gif = true;
            var csrf = $cookies.get('csrftoken');
            var fd = new FormData();
            var objeto = {
                    'csrfmiddlewaretoken': csrf,
                    'title':$scope.proyecto.title,
                    'eje':$scope.proyecto.eje,
                    'objetivo_general':$scope.proyecto.objetivo_general,
                    'indicador':$scope.proyecto.indicador,
                    'planteamiento':$scope.proyecto.planteamiento,
                    'problematica':$scope.proyecto.problematica,
                    'municipio':$scope.proyecto.municipio,
                    'uid':self.user.uid,
                    'foro':$scope.proyecto.foro,
                    // 'imagen':self.downloadURL,
                    // 'laRef':self.laRef,
                    // 'archivo':self.fileURL,
                    // 'fileRef':self.fileRef,
                    'alcance':$scope.proyecto.alcance
                    // 'img':self.theFile
                        // mun:self.mun,
                        // prob:self.prob,
                        // slug:self.user.photoURL
                    }

            for ( var key in objeto ) {
                    fd.append(key, objeto[key]);
                }
            if ($scope.obj.flow.files[0] !== undefined){
                fd.append('img',$scope.obj.flow.files[0].file);
            }
            if($scope.obj2.flow.files[0] !== undefined){
                fd.append('anexo',$scope.obj2.flow.files[0].file)  
            }
            
            $http({
                method:'POST',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/'+$routeParams.id+'/',
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
                // self.success = true;
                $('#guardado_modal').modal('show');
                $("#guardado_modal").on('hidden.bs.modal', function () {
                    // $location.path('/profile');
                    $route.reload();
                    $scope.$apply();
                });
                // $scope.$apply();
            })
            .catch(function(err){
                console.log(err)
            })


            
        } //updateProject

       $scope.subir = function(){
            var csrf = $cookies.get('csrftoken');
            var objeto = {
                    'csrfmiddlewaretoken': csrf,
                    'title':$scope.proyecto.title,
                    'eje':$scope.proyecto.eje,
                    'objetivo_general':$scope.proyecto.objetivo_general,
                    'indicador':$scope.proyecto.indicador,
                    'planteamiento':$scope.proyecto.planteamiento,
                    'problematica':$scope.proyecto.problematica,
                    'municipio':$scope.proyecto.municipio,
                    'uid':self.user.uid,
                    'foro':$scope.proyecto.foro,
                    // 'imagen':self.downloadURL,
                    // 'laRef':self.laRef,
                    // 'archivo':self.fileURL,
                    // 'fileRef':self.fileRef,
                    'alcance':$scope.proyecto.alcance
                    // 'img':self.theFile
                        // mun:self.mun,
                        // prob:self.prob,
                        // slug:self.user.photoURL
                    }

            $('#warning').modal('show');
            $("#warning").on('hidden.bs.modal', function () {
                // $location.path("/profile");
                var fd = new FormData();
                for (key in objeto){
                    fd.append(key,objeto[key])
                }
                if ($scope.obj.flow.files[0] !== undefined){
                fd.append('img',$scope.obj.flow.files[0].file);
                }
                if($scope.obj2.flow.files[0] !== undefined){
                    fd.append('anexo',$scope.obj2.flow.files[0].file)  
                }
                fd.append('cerrado',true);
                $http({
                method:'POST',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/'+$routeParams.id+'/',
                headers: {'Content-Type': undefined},
                data:fd
                // headers: { 'Content-Type': 'multipart/form-data' },
                // data: $httpParamSerializerJQLike(objeto),
                // data:$httpParamSerializerJQLike($scope.pro),
                // file:self.theFile
                })
                .then(function(res){
                    console.log(res)
                    $location.path('/profile')
                })
                .catch(function(err){
                    console.log(err)
                    alert('Hubo un error, intentalo nuevamente')
                });
                $scope.$apply();
            });


        }

        




        // projectDetailsController.prototype.$scope = $scope;




    //share w FB
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '694502364033651',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  $(document).ready(function(){
$('#share_button').click(function(e){
e.preventDefault();
FB.ui(
{
method: 'feed',
name: 'Plan Estatal de Desarrollo 2016-2022',
link: 'http://planestataldedesarrollo.hidalgo.gob.mx/catalogo',
picture: 'http://planestataldedesarrollo.hidalgo.gob.mx/assets/images/logoGrande.jpg',
caption: 'http://planestataldedesarrollo.hidalgo.gob.mx/',
description: "Mi idea ya está por ser aprobada, chéca esta y más ideas del plan estatal de desarrollo.",
message: "blabla"
});
});
});
  $(document).ready(function(){
$('#share_button2').click(function(e){
e.preventDefault();
FB.ui(
{
method: 'feed',
name: 'Plan Estatal de Desarrollo 2016-2022',
link: 'http://planestataldedesarrollo.hidalgo.gob.mx/catalogo',
picture: 'http://planestataldedesarrollo.hidalgo.gob.mx/assets/images/logoGrande.jpg',
caption: 'http://planestataldedesarrollo.hidalgo.gob.mx/',
description: "Mi idea ya está por ser aprobada, chéca esta y más ideas del plan estatal de desarrollo.",
message: "blabla"
});
});
});



    }

    angular
        .module('hidalgo')
        .component('projectDetailsComponent',details);
})();

