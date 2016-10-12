(function () {

    var details = {
        templateUrl:'app/components/project_details/project_details.html',
        controller: projectDetailsController
    }

    function projectDetailsController(hidalgoService,$routeParams) {
        let projectDetails = this;
        
        projectDetails.id = $routeParams.id;
        console.log(projectDetails.id)

        hidalgoService.getProjectDetail(projectDetails.id)
            .then(function (response) {
                projectDetails.data = response.data[0]
                console.log(projectDetails.data)
            })

    }

    angular
        .module('hidalgo')
        .component('projectDetailsComponent',details);
})();