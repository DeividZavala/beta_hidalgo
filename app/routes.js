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
            // .when('/project/new',{
            //     template:`<newpro-component></newpro-component>`,
            //     resolve: {
            //       // controller will not be loaded until $requireSignIn resolves
            //       // Auth refers to our $firebaseAuth wrapper in the factory below
            //       "currentAuth": ["Auth", function(Auth) {
            //         // $requireSignIn returns a promise so the resolve waits for it to complete
            //         // If the promise is rejected, it will throw a $stateChangeError (see above)
            //         return Auth.$requireSignIn();
            //       }]
            //     } //resolve
            // })
            .when('/project/new/children',{
                template:`<new-project-children></new-project-children>`
            })
            .when('/project/:id/details',{
                template:`<project-details-component></project-details-component>`,
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
            //catalogo routes
            .when('/catalogo/:id',{
                template:`<catalog-detail-component></catalog-detail-component>`
            })
            .when('/catalogo/eje/:eje',{
                template:`<catalogo-component></catalogo-component>`
            })
            .when('/catalogo',{
                template:`<catalogo-component></catalogo-component>`
            })
            .when('/children',{
                template:`<catalogo-component></catalogo-component>`
            })
            .when('/certificado',{
                template:`<certificado-component></certificado-component>`
            })
            .when('/counter', {
                template:`<counter-component></counter-component>`
            })
            .otherwise({
                redirectTo:'/'
            })
    }

})();
