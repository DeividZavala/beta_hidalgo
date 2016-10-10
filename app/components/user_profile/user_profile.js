(function () {

    var userProfile = {
        templateUrl:'app/components/user_profile/user_profile.html'
    }

    angular
        .module('hidalgo')
        .component('userProfileComponent',userProfile);
})();