(function(){
	var catalog_detail ={
		templateUrl : 'app/components/catalog_detail/catalog_detail.html',
		controller:CatDetController
	}

	function CatDetController($firebaseAuth,$firebaseArray,$scope,$routeParams,$http){
		var self = this;
		$scope.tab=1;
		//tooltip
		$('[data-toggle="tooltip"]').tooltip();

		//Bajamos la rama de proyectos
		$http.get('http://hidalgo.fixter.org/projects/'+$routeParams.id+'/')
		.then(function(project){
			//console.log(project);
			$scope.proyecto = project.data[0].fields;
		})
		.catch(function(err){
			 window.location.replace('/');
		});
		//Bajammos al usuario
		
		

		$scope.titulo = "Proyecto enfocado a los borrachos"





	}




	angular
	.module('hidalgo')
	.component('catalogDetailComponent',catalog_detail);

})()
