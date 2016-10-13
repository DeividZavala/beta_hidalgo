(function () {

    var details = {
        templateUrl:'app/components/project_details/project_details.html',
        controller: projectDetailsController
    }

    function projectDetailsController(hidalgoService,$routeParams) {
        let projectDetails = this;

        projectDetails.filter = [];


        projectDetails.id = $routeParams.id;
        console.log(projectDetails.id)

        hidalgoService.getProjectDetail(projectDetails.id)
            .then(function (response) {
                projectDetails.data = response.data[0]
                console.log(projectDetails.data)
            })
            //Upload images
        $(document).on('click', '#close-preview', function(){
            $('.image-preview').popover('hide');
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



        app.filter(‘filtro’, function(){});

        $scope.opciones = [
    {opcion: 'Gobierno Honesto Cercano y Moderno',  relacion: 'Tasa de Prevalencia de Corrupción (INEGI)'},
    {opcion: 'Hidalgo Próspero y Dinámico', relacion: 'sfsdsdf'},
    {opcion: 'Hidalgo Humano e Igualitario', relacion: 'asdasfasf'},
    {opcion: 'Un Hidalgo Seguro con Justicia y Paz', relacion: 'asdasfasfwrg  '},
    {opcion: 'Un Hidalgo con Desarrollo Sustentable', relacion: 'saEGwfegeweg'},
    ];


    app.filter(‘filtroOpcion’, function() {
        return function(input, relacion) {
            var salida = [];
            angular.forEach(input, function(opcion) {
                if (opcion.relacion === relacion) {
                salida.push(opcion)
                }
            })
            return salida;
        }
    });

        //finish uploading images
        //progress bar
        /*$('#percent').on('change', function(){
            var val = parseInt($(this).val());
            var $circle = $('#svg #bar');

            if (isNaN(val)) {
              val = 100;
            }
            else{
               var r = $circle.attr('r');
               var c = Math.PI*(r*2);

               if (val < 0) { val = 0;}
               if (val > 100) { val = 100;}

               var pct = ((100-val)/100)*c;

               $circle.css({ strokeDashoffset: pct});

               $('#cont').attr('data-pct',val);
            }
        });*/
        //progress bar finishes

    }


    angular
        .module('hidalgo')
        .component('projectDetailsComponent',details);
})();
