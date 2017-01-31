(function(){


	var landing ={

		templateUrl : 'app/components/landing/landing.html',
		controller:landingController
	}

	function landingController($scope,$http,$cookies,hidalgoService){
			var self = this;
			self.laCookie = null;

		$http.get('http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/totales/')
			.then(function (response) {
				//console.log(response.data)
				self.projects = response.data.publicados
				self.participantes = response.data.participantes
				self.proyetos = response.data.proyectos

				function numeros() {
					$('.number1').animateNumber({ number: self.projects });
					$('.number2').animateNumber({ number: self.proyetos });
					$('.number3').animateNumber({ number: self.participantes });
				}

				setTimeout(numeros,1500)
			})








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
			data = {
				'test':'testing',
				// 'X-CSRFToken':self.laCookie
			}
			// $http.defaults.headers.post['X-CSRFToken'] = self.laCookie;
			// $http.defaults.xsrfHeaderName = 'X-CSRFToken';
			// $http.defaults.xsrfCookieName = 'csrftoken';
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

			// $.ajax({
			// 	url:'http://localhost:8000/projects/testing/',
			// 	method:'POST',
			// 	data:{'test':'testing'},
			// 	success:function(r){console.log('ya mijo',r)},
			// 	error:function(e){console.log('error',e)}

			// })
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



		//scroll
		$(function() {
		  $('a[href*="#"]:not([href="#"])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html, body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		  });
		});
		//scroll



	} //controller

	angular
	.module('hidalgo')
	.component('landingComponent',landing);

})()
