(function () {
    angular
        .module('hidalgo')
        .factory('hidalgoService',hidalgoService);

    hidalgoService.$inject = ["$http"];
    function hidalgoService($http) {

        return{
            allProjects : getAllProjects,
            projectDetail: getProjectDetail,
            userDetail : getUserDetail
        }

        function getAllProjects() {
            return $http.get('http://hidalgo.fixter.org/projects/')
        }

        function getUserDetail(id) {
            return $http.get('http://hidalgo.fixter.org/users/'+ id +'/')
        }

        function getProjectDetail(id) {
            return $http.get('http://hidalgo.fixter.org/projects/:id/')
        }
    }
})();