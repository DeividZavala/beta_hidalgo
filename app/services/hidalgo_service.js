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
            addProject : addProject,
            newUser : createNewUser
        }

        function addProject(data) {
            $http.post('http://hidalgo.fixter.org/projects/',data)
            .then(function(response){
                return response
            })
            .catch(function(err){
                return err
            })
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