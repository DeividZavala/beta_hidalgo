(function () {

    var catalogo = {
        templateUrl:'app/components/catalogo/catalogo.html',
        controller:catalogController
    }

    function catalogController(hidalgoService) {
        var self = this;

        hidalgoService.getAllProjects()
            .then(function (response) {
                self.projects = response.data;
                console.log(self.projects);
            })
    }


    angular
        .module('hidalgo')
        .component('catalogoComponent',catalogo);
})();