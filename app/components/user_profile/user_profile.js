(function () {

    var userProfile = {
        templateUrl:'app/components/user_profile/user_profile.html',
        controller:profileController
    }

    function profileController() {
        let profile = this;

        profile.panelSetTab = panelSetTab;
        profile.checkTab = checkTab;
        profile.tab = 1;

        function panelSetTab(setTab) {
            profile.tab = setTab;
        }

        function checkTab(checkTab) {
            return profile.tab === checkTab;
        }
    }

    angular
        .module('hidalgo')
        .component('userProfileComponent',userProfile);
})();