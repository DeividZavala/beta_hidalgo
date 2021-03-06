(function () {
    angular
        .module('hidalgo')
        .factory('hidalgoService',hidalgoService);

    hidalgoService.$inject = ["$http"];
    function hidalgoService($http) {

        return{
            getAllProjects : getAllProjects,
            getProjectDetail: getProjectDetail,
            addProject : addProject,
            createNewUser : createNewUser,
            getUserProjects : getUserProjects
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
            .then(function(response){
                return response
            })
            .catch(function(err){
                return err
            })
        }

        function getUserProjects(uid) {
             return $http.get('http://hidalgo.fixter.org/projects?user_id='+uid)
        }

        function getAllProjects() {
            return $http.get('http://hidalgo.fixter.org/projects/')
        }

        function getProjectDetail(id) {
            return $http.get('http://hidalgo.fixter.org/projects/'+id+'/')
        }
    }
})();