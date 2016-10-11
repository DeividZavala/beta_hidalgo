(function () {

    var user = {
        templateUrl:'app/components/user_profile/user_profile.html',
        controller:profileController
    }

    profileController.$inject = ['$routeParams','hidalgoService'];
    function profileController($routeParams,hidalgoService) {
        let profile = this;

        profile.panelSetTab = panelSetTab;
        profile.checkTab = checkTab;
        profile.tab = 1;

        profile.userId = $routeParams.id;
        console.log(profile.userId)

        hidalgoService.userDetail(profile.userId).then(function (response) {
            profile.userProfile = response.data[0].fields
            console.log(profile.userProfile)
        })

        function panelSetTab(setTab) {
            profile.tab = setTab;
        }

        function checkTab(checkTab) {
            return profile.tab === checkTab;
        }
    }

    angular
        .module('hidalgo')
        .component('userProfileComponent',user);
})();