(function () {

    var details = {
        templateUrl:'app/components/project_details/project_details.html',
        controller: projectDetailsController
    }

    function projectDetailsController(hidalgoService,$routeParams,$scope,$http,$firebaseAuth,$httpParamSerializerJQLike,$location) {
        var projectDetails = this;
        var self = this;
        // Barra de progreso
        $scope.suma = [0,0,0,0,0];
        $scope.total=$scope.suma[0]+$scope.suma[1]+$scope.suma[2]+$scope.suma[3]+$scope.suma[4];




        // La barra de progreso

        $scope.barra = function(){
            $scope.total = 50;
            if ($scope.proyecto.objetivo_general === ''){
                    $scope.suma[0]=0;
                }else{
                    $scope.suma[0]=10;
                }
                if ($scope.proyecto.indicador === ''){
                    $scope.suma[1]=0;
                }else{
                    $scope.suma[1]=10;
                }
                if ($scope.proyecto.planteamiento === ''){
                    $scope.suma[2]=0;
                }else{
                    $scope.suma[2]=10;
                }
                if ($scope.proyecto.alcance === ''){
                    $scope.suma[3]=0;
                }else{
                    $scope.suma[3]=10;
                }if ($scope.proyecto.municipio === ''){
                    $scope.suma[4]=0;
                }else{
                    $scope.suma[4]=10;
                }

            for (i=0;i<=4;i++){
                console.log($scope.total,$scope.suma)
                $scope.total += $scope.suma[i]
            }
            // $scope.total+=40;
            console.log("final",$scope.total,$scope.suma);
            console.log($scope.proyecto.objetivo_general);

        } //barra



        //console.log("entre al controller");

        


        //obtenemos al usuario si ya está
        var auth = $firebaseAuth();
        auth.$onAuthStateChanged(function(firebaseUser) {
          self.user = firebaseUser;
          if(self.user){
            
            // self.alert = "Bienvenido "+self.user.displayName;
            // self.cuentale()

          }else{

          }
        }); //checklogin


        //traemos datos


            projectDetails.id = $routeParams.id;
        //console.log(projectDetails.id)

        hidalgoService.getProjectDetail(projectDetails.id)
            .then(function (response) {
                projectDetails.data = response.data[0]
                //console.log(projectDetails.data)
                //console.log(projectDetails.data.fields.title)
                //console.log("la imagen",projectDetails.data.fields.imagen)
                $scope.proyecto = response.data[0].fields
                $scope.proyecto.pk = response.data[0].pk
                $scope.pro = $scope.proyecto
                $scope.barra();



            });



        // var fd = new FormData();
        // fd.append('file', self.theFile);

        $scope.quitarFoto = function(){
            $scope.proyecto.imagen = null;
            var referencia = firebase.storage().ref().child('projects');
            referencia.child('images/'+$scope.proyecto.laRef).delete()
            .then(function(res){
                console.log('exito borrando: ',res)
            })
            .catch(function(err){
                console.log("error",err);
            });
        }

        $scope.quitarFile = function(){
            $scope.proyecto.archivo = null;
            var referencia = firebase.storage().ref().child('projects');
            referencia.child('images/'+$scope.proyecto.fileRef).delete()
            .then(function(res){
                console.log('exito borrando: ',res)
            })
            .catch(function(err){
                console.log("error",err);
            });

        }


        $scope.updateProject = function(){
            // permiso para editar
            if(self.user.uid !== $scope.proyecto.uid){
                $location.path('/profile')
            }else{

            if ($scope.proyecto.imagen==""){
            console.log("en controller link del dom: ",$('#imgLink').val());
            self.downloadURL = $('#imgLink').val();
            self.laRef = $('#imgLink').attr('ref');
        }else{
            self.downloadURL = $scope.proyecto.imagen;
            self.laRef = $scope.proyecto.laRef;
        }

        if($scope.proyecto.archivo == ""){
            self.fileURL = $('#fileLink').val();
            self.fileRef = $('#fileLink').attr('ref');
        }else{
            self.fileURL = $scope.proyecto.archivo;
            self.fileRef = $scope.proyecto.fileRef;
        }
            // self.downloadURL =
            var objeto = {
                    'title':$scope.proyecto.title,
                    'eje':$scope.proyecto.eje,
                    'objetivo_general':$scope.proyecto.objetivo_general,
                    'indicador':$scope.proyecto.indicador,
                    'planteamiento':$scope.proyecto.planteamiento,
                    'problematica':$scope.proyecto.problematica,
                    'municipio':$scope.proyecto.municipio,
                    'uid':self.user.uid,
                    'imagen':self.downloadURL,
                    'laRef':self.laRef,
                    'archivo':self.fileURL,
                    'fileRef':self.fileRef
                    // 'img':self.theFile
                        // mun:self.mun,
                        // prob:self.prob,
                        // slug:self.user.photoURL
                    }


            $http({
                method:'POST',
                url:'http://hidalgo.fixter.org/projects/'+$scope.proyecto.pk+'/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                // headers: { 'Content-Type': 'multipart/form-data' },
                // data: $httpParamSerializerJQLike(objeto),
                data:$httpParamSerializerJQLike(objeto),
                file:self.theFile
            })
            .then(function(response){
                console.log("guardado con éxito",response)
                $scope.mensaje = {};
                $scope.mensaje.success = "Tu Proyecto fué guardado con éxito";
                $('body').scrollTop( 0 );
                $scope.barra();
            })
            .catch(function(err){
                console.log("Error al guardar",err)
            });

        } //else

        } //updateProject

        $scope.subir = function(){

            $('#warning').modal('show');
            $("#warning").on('hidden.bs.modal', function () {
                // $location.path("/profile");
                $scope.pro.cerrado = true;
                $http({
                method:'POST',
                url:'http://hidalgo.fixter.org/projects/'+$scope.pro.pk+'/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                // headers: { 'Content-Type': 'multipart/form-data' },
                // data: $httpParamSerializerJQLike(objeto),
                data:$httpParamSerializerJQLike($scope.pro),
                // file:self.theFile
                })
                .then(function(res){
                    console.log(res)
                })
                .catch(function(err){
                    console.log(err)
                });
                $scope.$apply();
            });


        }




        // projectDetailsController.prototype.$scope = $scope;




    //desmadre de la barra de progreso

    //share w FB
        window.fbAsyncInit = function() {
    FB.init({
      appId      : '694502364033651',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  $(document).ready(function(){
$('#share_button').click(function(e){
e.preventDefault();
FB.ui(
{
method: 'feed',
name: 'Plan Estatal de Desarrollo 2016-2022',
link: 'http://planeacion.fixter.org/catalogo',
picture: 'http://planeacion.fixter.org/assets/images/logoGrande.jpg',
caption: 'planeacion.fixter.org',
description: "Mi idea ya está por ser aprobada, chéca esta y más ideas del plan estatal de desarrollo.",
message: "blabla"
});
});
});
  $(document).ready(function(){
$('#share_button2').click(function(e){
e.preventDefault();
FB.ui(
{
method: 'feed',
name: 'Plan Estatal de Desarrollo 2016-2022',
link: 'http://planeacion.fixter.org/catalogo',
picture: 'http://planeacion.fixter.org/assets/images/logoGrande.jpg',
caption: 'planeacion.fixter.org',
description: "Mi idea ya está por ser aprobada, chéca esta y más ideas del plan estatal de desarrollo.",
message: "blabla"
});
});
});
    //Upload images
        $(document).on('click', '#close-preview', function(){
            // Hover befor close the preview
            $('.image-preview').hover(
                function () {
                   $('.image-preview').popover('show');
                },
                 function () {
                   $('.image-preview').popover('hide');
                }
            );
        });

        $(function() {
            // Create the close button
            var closebtn = $('<button/>', {
                type:"button",
                text: 'x',
                id: 'close-preview',
                style: 'font-size: initial;',
            });
            closebtn.attr("class","close pull-right");
            // Set the popover default content
            $('.image-preview').popover({
                trigger:'manual',
                html:true,
                title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
                content: "There's no image",
                placement:'bottom'
            });
            // Clear event
            $('.image-preview-clear').click(function(){
                $('.image-preview').attr("data-content","").popover('hide');
                $('.image-preview-filename').val("");
                $('.image-preview-clear').hide();
                $('.image-preview-input input:file').val("");
                $(".image-preview-input-title").text("Browse");
            });
            // Create the preview image
            $(".image-preview-input input:file").change(function (){
                var img = $('<img/>', {
                    id: 'dynamic',
                    width:250,
                    height:200
                });
                var file = this.files[0];
                var reader = new FileReader();
                // Set preview image into the popover data-content
                reader.onload = function (e) {
                    $(".image-preview-input-title").text("Change");
                    $(".image-preview-clear").show();
                    $(".image-preview-filename").val(file.name);
                    img.attr('src', e.target.result);
                    $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
                }
                reader.readAsDataURL(file);
            });
        });
        //finish uploading images
        //Upload files
        $(document).on('click', '#close-preview', function(){
            $('.file-preview').popover('hide');
            // Hover befor close the preview
            $('.file-preview').hover(
                function () {
                   $('.file-preview').popover('show');
                },
                 function () {
                   $('.file-preview').popover('hide');
                }
            );
        });

        $(function() {
            // Create the close button
            var closebtn = $('<button/>', {
                type:"button",
                text: 'x',
                id: 'close-preview',
                style: 'font-size: initial;',
            });
            closebtn.attr("class","close pull-right");
            // Set the popover default content
            $('.file-preview').popover({
                trigger:'manual',
                html:true,
                title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
                content: "There's no file",
                placement:'bottom'
            });
            // Clear event
            $('.file-preview-clear').click(function(){
                $('.file-preview').attr("data-content","").popover('hide');
                $('.file-preview-filename').val("");
                $('.file-preview-clear').hide();
                $('.file-preview-input input:file').val("");
                $(".file-preview-input-title").text("Browse");
            });
            // Create the preview file
            $(".file-preview-input input:file").change(function (){
                // var img = $('<img/>', {
                //     id: 'dynamic',
                //     width:250,
                //     height:200
                // });
                var file = this.files[0];
                var reader = new FileReader();
                // Set preview file into the popover data-content
                reader.onload = function (e) {
                    $(".file-preview-input-title").text("Change");
                    $(".file-preview-clear").show();
                    $(".file-preview-filename").val(file.name);
                    img.attr('src', e.target.result);
                    $(".file-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
                }
                reader.readAsDataURL(file);
            });
        });
        //finish uploading files
        //progress bar
            (function($) {
            $.fn.extend({
                formProgress: function(options) {
                    var st = {
                        speed: 300,
                        style: "green",
                            bubble: false,
                            selector: ".required",
                            minPercent: false,
                            message: "Please complete all required fields !"
                        };
                        if (options) {
                            $.extend(st, options);
                        }
                        var _this = $(this),
                            sel = st.selector,
                            mainForm = $(sel).parents("form"),
                            names = [],
                            timer;
                        $(sel + ":radio").each(function() {
                            var n = $(this).attr("name");
                            if ($.inArray(n, names) < 0) {
                                names.push(n);
                            }
                        });
                        var totalInputs = $(sel).not(":radio").length + names.length;
                        $(mainForm).find(sel + ":checkbox, " + sel + ":radio, select" + sel).on("change", function() {
                            animateBar.call(_this);
                        });
                        $(mainForm).find("input[type=text]" + sel + ", input[type=password]" + sel + ", textarea" + sel).on("keyup", function() {
                            timer && clearTimeout(timer);
                            timer = setTimeout(function() {
                                animateBar.call(_this);
                            }, 300);
                        });
                        return this.each(function() {
                            animateBar.call(_this);
                        });

                        function animateBar() {
                            var vars = barData();
                            _this.attr("class", st.style);
                            $(this).stop().animate({
                                width: vars.toPercent * vars.ratio
                            }, st.speed);
                            if (st.bubble) {
                                if (vars.bubble.length === 0) {
                                    $(this).parent().append('<div class="bubble"><div class="percent">' + vars.toPercent + '%</div><div class="arrow"></div></div>');
                                    vars.bubble = $(this).next();
                                } else {
                                    vars.bubble.find(".percent").text(vars.toPercent + "%");
                                }
                                vars.bubble.stop().animate({
                                    left: (vars.toPercent * vars.ratio) - 5
                                }, st.speed);
                            } else {
                                $(this).parent().parent().find('label').find('span').text(vars.toPercent + "% completado");
                            }
                            preventSubmit(vars.toPercent);
                        }

                        function barData() {
                            var filled = $(sel).filter(function() {
                                return $(this).val();

                            }).not(":checkbox, :radio").length + $(sel + ":checked").length;
                            return {
                                filled: filled,
                                ratio: _this.parent().width() / 100,
                                toPercent: Math.round((filled * 100) / totalInputs),
                                bubble: _this.next()
                            };
                        }

                        function preventSubmit(percentage) {
                            if (!st.minPercent) {
                                return false;
                            }
                            var targetInput = mainForm.find("input[type=submit]");
                            targetInput.removeAttr("onclick");
                            if (percentage < st.minPercent) {
                                // targetInput.attr("onclick", "alert('Por favor completa el Formulario al 100%'); return false;");
                            }
                            if (percentage==st.minPercent) {
                                $(".subir").prop("disabled", false);
                            }
                            else{
                                $(".subir").prop("disabled", true);
                            }
                        }
                    }
                });
            })(jQuery);
        //progress bar
            $(function(){
            $('#percentage').formProgress({
            speed : 500, // Duración de la animación
            style : 'green', // Clase asignada a tu barra de progreso
            bubble : false, // Mostrar el porcentaje debajo de la barra de progreso
            minPercent : 100, // Límite mínimo para permitir enviar el formulario
            message : 'Llenar los campos !', // Mostrar error
            selector : '.required' // La clase asignada a cada campo
            });
            });
        //progress finishes


    }

    angular
        .module('hidalgo')
        .component('projectDetailsComponent',details);
})();


//firebase bucket
var ref = firebase.storage().ref().child('projects');
  var setFile =  function(element){
    // var $scope = this.$scope;
    // self.$apply(function() {
      self.theFile = element.files[0];
      uploadFile(self.theFile);
      console.log("el archivo como tal: ",self.theFile)
    // });
  }

  var uploadFile = function(){
    console.log("llego",self.theFile)
    var uploadTask = ref.child('images/'+self.theFile.name)
    .put(self.theFile);
    uploadTask.on('state_changed',function(snap){
        console.log(snap);
    },
    function(err){
        console.log(err)
    },
    function(){
        var downloadURL = uploadTask.snapshot.downloadURL;
        $('#imgLink').val(downloadURL);
        $('#imgLink').attr('ref',self.theFile.name);
        console.log("la referencia: ",$('#imgLink').attr('ref'));
    });
}

  var uploadDoc = function(element){
    $('#loading').show();
    self.theFile = element.files[0];
    uploadFile(self.theFile);
    console.log("el archivo como tal: ",self.theFile)
    console.log("llego",self.theFile)
    var uploadTask = ref.child('images/'+self.theFile.name)
    .put(self.theFile);
    uploadTask.on('state_changed',function(snap){
        console.log(snap);
    },
    function(err){
        console.log(err)
    },
    function(){
        $('#loading').slideToggle();
        var downloadURL = uploadTask.snapshot.downloadURL;
        $('#fileLink').val(downloadURL);
        $('#fileLink').attr('ref',self.theFile.name);
        console.log("el RefdelFile en el dom: ",$('#fileLink').attr('ref'));
    });

    

}
