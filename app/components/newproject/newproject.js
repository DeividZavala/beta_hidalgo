(function(){

	let project_new = {
		templateUrl: 'app/components/newproject/newproject.html',
		controller: newProjectController
	}

	newProjectController.$inject = ['hidalgoService','$http','$firebaseAuth'];
	function newProjectController(hidalgoService,$http,$firebaseAuth) {
		let new_project = this;
		let self = this;
		var auth = $firebaseAuth();


		self.addProject = function() {
			
				//obtenemos al usuario si ya está
	        auth.$onAuthStateChanged(function(firebaseUser) {
	          self.user = firebaseUser;
	          if(self.user){
	            
			        $http.post('http://hidalgo.fixter.org/projects/',{
						title:self.title,
						eje:self.eje,
						uid:self.user.uid

					})
					.then(function(response){
						console.log("Guardado con exito",response)
						 window.location.replace('#/profile');
					})
					.catch(function(err){
						console.log("Error",err)
					})

	          }else{
	            console.log(self.user);
	          }
	        }); //checklogin

			
			
		}

	}

	angular
		.module('hidalgo')
		.component('newproComponent', project_new);
})();