(function () {

    var newChild = {
        templateUrl:'/app/components/Nuevo_proyecto_niños/new_niños.html',
        controller:projectChildController
    }

    function projectChildController() {
        var project_child = this;
    }

    angular
        .module('hidalgo')
        .component('newProjectChildren',newChild);
})();