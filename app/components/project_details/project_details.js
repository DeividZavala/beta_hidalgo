(function () {

    var details = {
        templateUrl:'app/components/project_details/project_details.html',
        controller: projectDetailsController
    }

    function projectDetailsController(hidalgoService,$routeParams,$scope,$http,$firebaseAuth,$httpParamSerializerJQLike) {
        var projectDetails = this;
        var self = this;

        console.log("entre al controller");


        projectDetails.id = $routeParams.id;
        console.log(projectDetails.id)

        hidalgoService.getProjectDetail(projectDetails.id)
            .then(function (response) {
                projectDetails.data = response.data[0]
                console.log(projectDetails.data)
                console.log(projectDetails.data.fields.title)
                console.log(projectDetails.data.fields.eje)
                $scope.proyecto = response.data[0].fields
                $scope.proyecto.pk = response.data[0].pk
            })

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

        var fd = new FormData();
        fd.append('file', self.theFile);

        $scope.updateProject = function(){
            console.log($scope.proyecto.objetivo_general)
            var objeto = {
                    'title':$scope.proyecto.title,
                    'eje':$scope.proyecto.eje,
                    'objetivo_general':$scope.proyecto.objetivo_general,
                    'indicador':$scope.proyecto.indicador,
                    'planteamiento':$scope.proyecto.planteamiento,
                    'problematica':$scope.proyecto.problematica,
                    'municipio':$scope.proyecto.municipio,
                    'uid':self.user.uid,
                    'file':self.theFile
                    // 'img':self.theFile
                        // mun:self.mun,
                        // prob:self.prob,
                        // slug:self.user.photoURL
                    }

            var formData = new FormData();
            formData.append('file',self.theFile);

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
            })
            .catch(function(err){
                console.log("Error al guardar",err)
            });

        } //updateProject


        // projectDetailsController.prototype.$scope = $scope;




    //desmadre de la barra de progreso        
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
                var img = $('<img/>', {
                    id: 'dynamic',
                    width:250,
                    height:200
                });
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




  var setFile =  function(element){
    // var $scope = this.$scope;
    // self.$apply(function() {
      self.theFile = element.files[0];
      console.log(self.theFile)
    // });
  }
