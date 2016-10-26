(function(){
	var catalog_detail ={
		templateUrl : 'app/components/catalog_detail/catalog_detail.html',
		controller:CatDetController
	}

	function CatDetController($firebaseAuth,$firebaseArray,$scope,$routeParams,$http,hidalgoService,$location,$httpParamSerializerJQLike){
		var self = this;

		self.id = $routeParams.id;
		console.log(self.id);
		

		var auth = $firebaseAuth();
		//obtenemos al usuario si ya está
        auth.$onAuthStateChanged(function(firebaseUser) {
          self.usuario = firebaseUser;
          if(self.usuario){
            //self.alert = "Bienvenido " + self.usuario.displayName;
            //self.cuentale()
           // console.log('rayos: ',self.usuario.photoURL);
		   var data = {'uid':self.usuario.uid}
            $http({
                method:'POST',
                // url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/save/',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/profile/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializerJQLike(data)
            })
            .then(function(res){
                console.log(res)
                self.perfil = res.data[0].fields.name
            })
            .catch(function(err){
                console.log(err)
                // self.error = true;
            });
            console.log('mi user: ',self.usuario);
		  }
        }); //checklogin


		$scope.tab=1;
		//tooltip
		$('[data-toggle="tooltip"]').tooltip();

		//Bajamos la rama de proyectos
		// $http.get('http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/'+$routeParams.id+'/')
		// .then(function(project){
		// 	console.log(project);
		// 	$scope.proyecto = project.data[0].fields;
		// })
		// .catch(function(err){
		// 	 window.location.replace('/');
		// });
		//Bajammos al usuario

		hidalgoService.getProjectDetail($routeParams.id)
			.then(function(project){
				console.log(project);
				$scope.proyecto = project.data[0].fields;
			})
			.catch(function(err){
				$location.path('/')
			});


		// $scope.titulo = "Proyecto enfocado a los borrachos"

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
link: 'http://planestataldedesarrollo.hidalgo.gob.mx/',
picture: 'http://planestataldedesarrollo.hidalgo.gob.mx//assets/images/logoGrande.jpg',
caption: 'http://planestataldedesarrollo.hidalgo.gob.mx/',
description: "Esta idea está genial, checa esta y más ideas del plan estatal de desarrollo.",
message: "Visita http://planestataldedesarrollo.hidalgo.gob.mx/"
});
});
});



	$scope.coment = function comentar() {

		$scope.com = []

		$scope.com.push({
			'name':self.perfil,
			'displayName':self.usuario.displayName,
			'comentario':self.comentario
		})

		console.log($scope.com)

		/*var comentarios = {
			'name':self.perfil,
			'displayName':self.usuario.displayName,
			'comentario':self.comentario
		}
		$http({
			method:'POST',
			url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/'+$routeParams.id+'/',
			data: $httpParamSerializerJQLike(comentarios),
		})*/
	}

							

	} //conroller




	angular
	.module('hidalgo')
	.component('catalogDetailComponent',catalog_detail);

})()