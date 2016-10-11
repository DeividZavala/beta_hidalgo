(function(){

	let project_new = {
		templateUrl: 'app/components/newproject/newproject.html',
		controller: newProjectController
	}

	newProjectController.$inject = ['hidalgoService'];
	function newProjectController(hidalgoService) {
		let new_project = this;

		new_project.add = addProject;

		function addProject(project) {
			hidalgoService.newProject(project.titulo)
		}

	}

	angular
		.module('hidalgo')
		.component('newproComponent', project_new);
})();