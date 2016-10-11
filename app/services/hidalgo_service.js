(function () {
    angular
        .module('hidalgo')
        .factory('hidalgoService',hidalgoService);

    hidalgoService.$inject = ["$http"];
    function hidalgoService($http) {

        return{
            allProjects : getAllProjects,
            projectDetail: getProjectDetail,
            userDetail : getUserDetail,
            newProject : createNewProject,
            newUser : createNewUser
        }

        function createNewProject(data) {
            $http.post('http://hidalgo.fixter.org/projects/',data)
        }

        function createNewUser(data) {
            $http.post('http://hidalgo.fixter.org/users/',data)
        }

        function getAllProjects() {
            return $http.get('http://hidalgo.fixter.org/projects/')
        }

        function getUserDetail(id) {
            return $http.get('http://hidalgo.fixter.org/users/'+ id +'/')
        }

        function getProjectDetail(id) {
            return $http.get('http://hidalgo.fixter.org/projects/'+ id +'/')
        }
    }
})();