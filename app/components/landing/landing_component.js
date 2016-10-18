(function(){


	var landing ={

		templateUrl : 'app/components/landing/landing.html',
		controller:landingController
	}

	function landingController($scope,$http,$cookies){
			var self = this;
			self.laCookie = null;

		// con jquery





		//testing csrf
		this.traetela = function(){

			// $.ajax({
			// 	url:'http://localhost:8000/projects/testing/',
			// 	method:'GET',
			// 	// data:{test:'test'},
			// 	success:function(r){console.log('ya mijo',r)},
			// 	error:function(e){console.log('error',e)}

			// })

			$http.get('http://localhost:8000/projects/testing/')
			.then(function(response){
				console.log(response);
				self.laCookie = $cookies.get('csrftoken')
				console.log('cookie: ',self.laCookie)
			});
		}

		this.pruebale = function(){
			// $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
			// data = {
			// 	'test':'testing',
			// 	// 'X-CSRFToken':self.laCookie
			// }
			// // $http.defaults.headers.post['X-CSRFToken'] = self.laCookie;
			// $http({
			// 	url:'http://localhost:8000/projects/testing/',
			// 	method:'POST',
			// 	// headers:{'X-CSRFToken':self.laCookie},
			// 	data:data,
			// })
			// .then(function(response){
			// 	console.log('Testing-then: ',response);
			// })
			// .catch(function(err){
			// 	console.log('Testing-catch: ',err)
			// });

			$.ajax({
				url:'http://localhost:8000/projects/testing/',
				method:'POST',
				data:{test:'test'},
				success:function(r){console.log('ya mijo',r)},
				error:function(e){console.log('error',e)}

			})
		}





		var width = 100;
		var animationSpeed = 1000;
		var pause = 10000;
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
