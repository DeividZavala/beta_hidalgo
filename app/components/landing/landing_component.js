(function(){


	var landing ={

		templateUrl : 'app/components/landing/landing.html',
		controller:landingController
	}

	function landingController($scope){

		
		  $(".owl-carousel").owlCarousel({
		  	navigation:false,
		  	slideSpeed:300,
		  	paginationSpeed:400,
		  	singleItem:true,
		  	autoPlay:true,
		  	stopOnHover:false,
		  	// paginationNumbers:true
		  });
		



	}

	angular
	.module('hidalgo')
	.component('landingComponent',landing);

})()
