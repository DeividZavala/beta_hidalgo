(function() {

    let login = {
        templateUrl: 'app/components/login/login.html',
        controller:LoginController
    }
    // LoginController.$inject = ['$firebaseAuth'];
    function LoginController($firebaseAuth,$timeout){

        var auth = $firebaseAuth();
        var self = this;
        self.alert = null;

        //obtenemos al usuario si ya está
        auth.$onAuthStateChanged(function(firebaseUser) {
          self.user = firebaseUser;
          if(self.user){
            // self.alert = "Bienvenido "+self.user.displayName;
            self.cuentale()

          }else{
            console.log(self.user);
          }
        });

        self.signIn = function(provider){


            //con redes sociales
            if(provider){

            auth.$signInWithPopup(provider)
            .then(function(result) {
              console.log("Signed in as:", result.user.uid);
                self.alert = "Bienvenido "+result.user.displayName;
            })
            .catch(function(error) {
              console.error("Authentication failed:", error);
            });
        } //el if
        else{

            //con email
             auth.$signInWithEmailAndPassword(self.email, self.password).then(function(firebaseUser) {
                  console.log("Signed in as:", firebaseUser.uid);

                }).catch(function(error) {
                  console.error("Authentication failed:", error);
                  if(error.code === "auth/user-not-found"){
                    self.createUser();
                  }
                   
                });

              } //el else
        } //signIn

        self.createUser = function(){

            auth.$createUserWithEmailAndPassword(self.email, self.password)
              .then(function(firebaseUser) {
                console.log("User " + firebaseUser.uid + " created successfully!");
                self.alert = "Cuenta creada con éxito, Bienvenido "+firebaseUser.email;
                self.cuentale();
              }).catch(function(error) {
                console.error("Error: ", error);
              });


        } //createUser

        self.cuentale = function(){
            self.timeInMs = 7;
  
            var countDown = function() {
                self.timeInMs-= 1;
                if(self.timeInMs<1){
                window.location.replace('/');
            }
                $timeout(countDown,1000);
            }
            
            $timeout(countDown,1000);
            

        } //cuentale







} //controller
    angular
        .module('hidalgo')
        .component('loginComponent', login);

})();
