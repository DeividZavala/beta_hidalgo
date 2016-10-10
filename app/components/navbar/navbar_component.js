(function () {

    var navbar = {
        templateUrl: 'app/components/navbar/navbar.html'
    }

    angular
        .module('hidalgo')
        .component('navbarComponent',navbar);

})();