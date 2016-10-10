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
                template:`<login-component></login-component>`
            })
            .when('/project/new',{
                template:`<h1>Nuevo Proyecto</h1>`
            })
            .when('/user/:id/profile',{
                template:`<h1>Perfil de Usuario</h1>`
            })
            .when('/project/:project_id/edit',{
                template:`<h1>Editar Proyecto</h1>`
            })
    }

})();
