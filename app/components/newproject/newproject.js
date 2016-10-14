(function(){

	var project_new = {
		templateUrl: 'app/components/newproject/newproject.html',
		controller: newProjectController
	}

	newProjectController.$inject = ['hidalgoService','$http','$firebaseAuth','$location','$scope','$httpParamSerializerJQLike'];
	function newProjectController(hidalgoService,$http,$firebaseAuth,$location,$scope,$httpParamSerializerJQLike) {
		var new_project = this;
		var self = this;
		var auth = $firebaseAuth();


		self.addProject = function() {

				//obtenemos al usuario si ya está
	        auth.$onAuthStateChanged(function(firebaseUser) {
	          self.user = firebaseUser;

	          var objeto = {
						title:self.title,
						eje:self.eje,
						uid:self.user.uid,
						municipio:self.mun,
						problematica:self.prob,
						// slug:self.user.photoURL
						};

	          if(self.user){

			        $http({
		                method:'POST',
		                url:'http://hidalgo.fixter.org/projects/',
		                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		                // headers: { 'Content-Type': 'multipart/form-data' },
		                // data: $httpParamSerializerJQLike(objeto),
		                data:$httpParamSerializerJQLike(objeto),
		                // file:self.theFile
		            })
					.then(function(response){
						console.log("Guardado con exito",response);
						$('#badge').modal('show');
						$("#badge").on('hidden.bs.modal', function () {
						    $location.path("/profile");
						    $scope.$apply();
						});
						// $location.path('/profile');
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
