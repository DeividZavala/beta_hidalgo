(function () {
    angular
        .module('hidalgo',['ngRoute','firebase','ngCookies','flow'])
        .config(configura);
        
        function configura($httpProvider){

              $httpProvider.defaults.withCredentials = true;
              $httpProvider.defaults.xsrfCookieName = 'csrftoken';
              $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
              // $httpProvider.interceptors.push(function($cookies) {
              //   return {
              //     'request': function(config) {
              //       config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
              //       return config;
              //     }
              //   };
              // });
        }


// config.$inject = ['$httpProvider']
// config.$inject = ['$httpProvider','$cookies'];

    // function configuracion($httpProvider){
 //    function configuracion($routeProvider,$httpProvider){
    	
    	

 //    	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
 // //    	// $httpProvider.defaults.xsrfCookieName = 'csrftoken';
	// // 	// $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        // $httpProvider.defaults.withCredentials = false;
        
 //        $httpProvider.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');

	// // var token = $('input[name=csrfmiddlewaretoken]').val();
 // //    $httpProvider.defaults.headers.post['X-CSRFToken'] = token;

 //    }


})();