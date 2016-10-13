(function(){
	var catalog_detail ={
		templateUrl : 'app/components/catalog_detail/catalog_detail.html',
		controller:CatDetController
	}

	function CatDetController($firebaseAuth,$firebaseArray,$scope){
		var self = this;
		$scope.tab=1;
		//tooltip

		$('[data-toggle="tooltip"]').tooltip()


		$scope.titulo = "Proyecto enfocado a los borrachos"





	}




	angular
	.module('hidalgo')
	.component('catalogDetailComponent',catalog_detail);

})()
