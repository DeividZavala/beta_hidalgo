(function (){
	var footer ={
		templateUrl:'app/components/footer/footer.html',
		controller:footerController
	}

	function footerController($location) {
        var footer = this;

        footer.isActive = function (route) {
            return route === $location.path();
        }

    }

	angular
	.module('hidalgo')
	.component('footerComponent',footer);
})();