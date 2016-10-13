(function(){

	var project_new = {
		templateUrl: 'app/components/newproject/newproject.html',
		controller: newProjectController
	}

	newProjectController.$inject = ['hidalgoService','$http','$firebaseAuth'];
	function newProjectController(hidalgoService,$http,$firebaseAuth) {
		var new_project = this;
		var self = this;
		var auth = $firebaseAuth();


		self.addProject = function() {

				//obtenemos al usuario si ya está
	        auth.$onAuthStateChanged(function(firebaseUser) {
	          self.user = firebaseUser;
	          if(self.user){

			        $http.post('http://hidalgo.fixter.org/projects/',{
						title:self.title,
						eje:self.eje,
						uid:self.user.uid,
						// mun:self.mun,
						// prob:self.prob,
						// slug:self.user.photoURL

					})
					.then(function(response){
						console.log("Guardado con exito",response);
						window.location.replace('#/profile');
					})
					.catch(function(err){
						console.log("Error",err)
					})

	          }else{
		            auth.$signInWithPopup("google")
	            .then(function(result) {
	              console.log("Signed in as:", result.user.uid);
	                self.alert = "Bienvenido "+result.user.displayName;
	            })
	            .catch(function(error) {
	              console.error("Authentication failed:", error);
	            });



	          }
	        }); //checklogin






		} //addProject


	}

	angular
		.module('hidalgo')
		.component('newproComponent', project_new);
})();
