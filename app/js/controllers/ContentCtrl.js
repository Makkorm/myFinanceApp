(function(){

    angular
        .module('app')
        .controller('ContentCtrl', ContentCtrl);

    ContentCtrl.$iject = ['$scope','$http'];

    function ContentCtrl($scope, $http){

        $scope.user = {};

        

        $http.get('/getData')
            .then(function(data){
                var userData = data.data;
                $scope.user = userData;
                console.log(userData)
            })


    }
})();