(function(){
	var catalog_detail ={
		templateUrl : 'app/components/catalog_detail/catalog_detail.html',
		controller:CatDetController
	}

	function CatDetController($firebaseAuth,$firebaseArray,$scope,$routeParams,$http,hidalgoService){
		var self = this;
		$scope.tab=1;
		//tooltip
		$('[data-toggle="tooltip"]').tooltip();

		//Bajamos la rama de proyectos
		/*$http.get('http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/'+$routeParams.id+'/')
		.then(function(project){
			console.log(project);
			$scope.proyecto = project.data[0].fields;
		})
		.catch(function(err){
			 window.location.replace('/');
		});*/
		//Bajammos al usuario

		hidalgoService.getProjectDetail($routeParams.id)
			.then(function(project){
				console.log(project);
				$scope.proyecto = project.data[0].fields;
			})
			.catch(function(err){
				window.location.replace('/');
			});
		

		$scope.titulo = "Proyecto enfocado a los borrachos"

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
link: 'http://planeacion.fixter.org/catalogo',
picture: 'http://planeacion.fixter.org/assets/images/logoGrande.jpg',
caption: 'planeacion.fixter.org',
description: "Esta idea está genial, chéca esta y más ideas del plan estatal de desarrollo.",
message: "blabla"
});
});
});

  

	}




	angular
	.module('hidalgo')
	.component('catalogDetailComponent',catalog_detail);

})()
