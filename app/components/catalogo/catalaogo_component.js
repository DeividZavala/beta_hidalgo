(function () {

    var catalogo = {
        templateUrl:'',
        controller:catalogController
    }

    function catalogController(hidalgoService) {
        var self = this;

        hidalgoService.getAllProjects()
            .then(function (response) {
                self.projects = response;
                console.log(self.response);
            })
    }


    angular
        .module('hidalgo')
        .component('catalogoComponent',catalogo)
})();