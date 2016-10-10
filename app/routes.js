(function () {
    angular
        .module('hidalgo')
        .config(config);

    config.$inject = ['$routeProvider']
    function config($routeProvider) {
        $routeProvider
            .when('/',{
                template:`<landing-component></landing-component>`
            })
            .when('/login',{
                template:`<login-component></login-component>`
            })
            .when('/project/new',{
                template:`<newpro-component></newpro-component>`
            })
            .when('/user/:id/profile',{
                template:`<user-profile-component></user-profile-component>`
            })
            .when('/project/:project_id/edit',{
                template:`<h1>Editar Proyecto</h1>`
            })
    }

})();
