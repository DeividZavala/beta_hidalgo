(function () {

    var details = {
        templateUrl:'app/components/project_details/project_details.html',
        controller: projectDetailsController
    }

    function projectDetailsController() {
        let projectDetails = this;
    }

    angular
        .module('hidalgo')
        .component('projectDetailsComponent',details);
})();
