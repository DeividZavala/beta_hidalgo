(function(){

	var certificado = {
		templateUrl: '/app/components/certificado/certificado.html',
		controller:certificadoController
	}

    function imprimir(){
        window.print();
        return false;
    }

	function certificadoController($http,$httpParamSerializerJQLike,$firebaseAuth) {
		var certificado = this;
		var auth = $firebaseAuth();
		certificado.fecha = new Date();
		//console.log(certificado.fecha)
		//obtenemos al usuario si ya está
        auth.$onAuthStateChanged(function(firebaseUser) {
          certificado.usuario = firebaseUser;
          if(certificado.usuario){
            var data = {'uid':certificado.usuario.uid}
            $http({
                method:'POST',
                // url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/save/',
                url:'http://planestataldedesarrollo.hidalgo.gob.mx:8000/account/profile/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $httpParamSerializerJQLike(data)
            })
            .then(function(res){
                //console.log(res)
                certificado.perfil = res.data[0].fields.name
                setTimeout(imprimir, 1000);
            })
            .catch(function(err){
                console.log(err)
                // self.error = true;
            });
		  }
        }); //checklogin

	}

	angular
		.module('hidalgo')
		.component('certificadoComponent',certificado);

})();