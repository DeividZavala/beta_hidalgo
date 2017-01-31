(function () {

    var catalogo = {
        templateUrl:'app/components/catalogo/catalogo.html',
        controller:catalogController
    }

    function catalogController(hidalgoService,PagerService,$routeParams,$scope,$location,$http) {
        var self = this;
        
        self.ruta_child = false;

        if($location.path() == "/catalogo"){
            //console.log("catalogo")
             hidalgoService.getAllProjects()
            .then(function (response) {
                self.projects = response.data;
                //console.log('then: ',response);
                //console.log(self.projects);

                self.pager = {};
                self.setPage = setPage;

                initController();

                function initController() {
                    // initialize to page 1
                    self.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > self.pager.totalPages) {
                        return;
                    }

                    // get pager object from service
                    self.pager = PagerService.GetPager(self.projects.length, page);

                    // get current page of items
                    self.items = self.projects.slice(self.pager.startIndex, self.pager.endIndex + 1);
                }


            })
            .catch(function(err){
                console.log(err)
            });
        }else if($location.path() == "/children"){
            console.log("children")
            self.ruta_child = true;
             hidalgoService.getAllChildrenProjects()
            .then(function (response) {
                self.projects = response.data;
                //console.log('then: ',response);
                //console.log(self.projects);

                self.pager = {};
                self.setPage = setPage;

                initController();

                function initController() {
                    // initialize to page 1
                    self.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > self.pager.totalPages) {
                        return;
                    }

                    // get pager object from service
                    self.pager = PagerService.GetPager(self.projects.length, page);

                    // get current page of items
                    self.items = self.projects.slice(self.pager.startIndex, self.pager.endIndex + 1);
                }


            })
            .catch(function(err){
                console.log(err)
            });
        }else{
            console.log("filtro")
            $http.get("http://planestataldedesarrollo.hidalgo.gob.mx:8000/projects/filtro/"+$routeParams.eje+"/")
                .then(function (response) {
                self.projects = response.data;
                //console.log('then: ',response);
                console.log(self.projects);

                self.pager = {};
                self.setPage = setPage;

                initController();

                function initController() {
                    // initialize to page 1
                    self.setPage(1);
                }

                function setPage(page) {
                    if (page < 1 || page > self.pager.totalPages) {
                        return;
                    }

                    // get pager object from service
                    self.pager = PagerService.GetPager(self.projects.length, page);

                    // get current page of items
                    self.items = self.projects.slice(self.pager.startIndex, self.pager.endIndex + 1);
                }


            })
            .catch(function(err){
                console.log(err)
            });
        }

        //filtro por eje desde landing        

    }

    function PagerService() {
        // service definition
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 9
            pageSize = pageSize || 9;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var pages = _.range(startPage, endPage + 1);
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
    }

    angular
        .module('hidalgo')
        .factory('PagerService', PagerService)
        .component('catalogoComponent',catalogo)
        .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
    
})();
