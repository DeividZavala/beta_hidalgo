(function () {
    angular
        .module('hidalgo')
        .config(config)
        .run(["$rootScope", "$location", function($rootScope, $location) {
          $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireSignIn promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
              $location.path("/login");
            }
          });
        }])
        .factory("Auth", ["$firebaseAuth",
          function($firebaseAuth) {
            return $firebaseAuth();
          }
        ]);







    config.$inject = ['$routeProvider']
    function config($routeProvider) {
        $routeProvider
            .when('/',{
                template:`<landing-component></landing-component>`,
                // resolve: {
                //   // controller will not be loaded until $requireSignIn resolves
                //   // Auth refers to our $firebaseAuth wrapper in the factory below
                //   "currentAuth": ["Auth", function(Auth) {
                //     // $requireSignIn returns a promise so the resolve waits for it to complete
                //     // If the promise is rejected, it will throw a $stateChangeError (see above)
                //     return Auth.$requireSignIn();
                //   }]
                // } //resolve
            })
            .when('/profile',{
                template:`<user-profile-component></user-profile-component>`,
                resolve: {
                  // controller will not be loaded until $requireSignIn resolves
                  // Auth refers to our $firebaseAuth wrapper in the factory below
                  "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireSignIn();
                  }]
                } //resolve
            })

            .when('/login',{
                template:`<login-component></login-component>`
            })
            .when('/project/new',{
                template:`<newpro-component></newpro-component>`
            })
            .when('/project/:id/edit',{
                template:`<h1>Editar Proyecto</h1>`
            })
            .when('/project/:id/details',{
                template:`<project-details-component></project-details-component>`
            })
            //catalogo routes
            .when('/catalogo/:id',{
                template:`<catalog-detail-component></catalog-detail-component>`
            })
            .when('/catalogo',{
                template:`<catalogo-component></catalogo-component>`
            })
            .otherwise({
                redirectTo:'/'
            })
    }

})();
