(function () {
    angular
        .module('hidalgo',['ngRoute','firebase','ngCookies','flow'])
        .config(configura);
        
        function configura($httpProvider){

              $httpProvider.defaults.withCredentials = true;
              $httpProvider.defaults.xsrfCookieName = 'csrftoken';
              $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        }

})();