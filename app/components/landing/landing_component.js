(function(){


	var landing ={

		templateUrl : 'app/components/landing/landing.html',
		controller:landingController
	}

	function landingController($scope){

		
		  /*$(".owl-carousel").owlCarousel({
		  	navigation:false,
		  	slideSpeed:250,
		  	paginationSpeed:400,
		  	singleItem:true,
		  	autoPlay:true,
		  	stopOnHover:false,
		  	// paginationNumbers:true
		  });*/

		var width = 100;
		var animationSpeed = 1000;
		var pause = 5000;
		var currentSlide = 1;

		var $slider =$('#slider');
		var $slideContainer = $slider.find('.slides');
		var $slides = $slideContainer.find('.slide');

		setInterval(function () {
			$slideContainer.animate({'margin-left':'-='+width+'vw'},
			animationSpeed,
			function () {
				currentSlide++
				if(currentSlide >= $slides.length){
					currentSlide = 1;
					$slideContainer.css('margin-left',0);
				}
			});
		},pause)



	}

	angular
	.module('hidalgo')
	.component('landingComponent',landing);

})()
