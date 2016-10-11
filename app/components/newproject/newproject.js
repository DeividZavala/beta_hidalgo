(function(){

	let project_new = {
		templateUrl: 'app/components/newproject/newproject.html',
		controller: newProjectController
	}

	newProjectController.$inject = ['hidalgoService','$http'];
	function newProjectController(hidalgoService,$http) {
		let new_project = this;
		let self = this;


		self.addProject = function() {
			// hidalgoService.addProject({
			// 	title:"Proyecto Prueba",
			// 	uid:"Prueba"
			// })
			$http.post('http://hidalgo.fixter.org/projects/',{
				title:"Proyecto Prueba",
				uid:"Prueba"
			})
			.then(function(response){
				console.log("Guardado con exito",response)
			})
			.catch(function(err){
				console.log("Error",err)
			})
			
		}

	}

	angular
		.module('hidalgo')
		.component('newproComponent', project_new);
})();