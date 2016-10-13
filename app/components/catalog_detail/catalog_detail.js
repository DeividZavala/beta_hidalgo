(function(){
	var catalog_detail ={
		templateUrl : 'app/components/catalog_detail/catalog_detail.html',
		controller:CatDetController
	}

	function CatDetController($firebaseAuth,$firebaseArray,$scope){
		car self = this;

		$scope.bliss = "BlisS"





	}




	angular
	.module('hidalgo')
	.component('catalogDetailComponent',catalog_detail);

})()
