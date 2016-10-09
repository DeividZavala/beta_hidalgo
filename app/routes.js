(function () {
    angular
        .module('hidalgo')
        .config(config);

    config.$inject = ['$routeProvider']
    function config($routeProvider) {
        $routeProvider
            .when('/',{
                template:`<h1>beta hidalgo</h1>`
            })
    }

})();