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
            .when('/login',{
                template:`<h1>Login</h1>`
            })
            .when('/project/new',{
                template:`<newpro-component></newpro-component>`
            })
            .when('/user/:id/profile',{
                template:`<h1>Perfil de Usuario</h1>`
            })
            .when('/project/:project_id/edit',{
                template:`<h1>Editar Proyecto</h1>`
            })
    }

})();