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

            self.inicio = 0;
            self.pagination = function () {
                self.inicio += 12
            }
    }


    angular
        .module('hidalgo')
        .component('catalogoComponent',catalogo);
})();