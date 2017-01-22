(function(){

    angular
        .module('app')
        .controller('EnterCtrl', EnterCtrl);

    EnterCtrl.$inject = ['$scope','$http','$state'];

    function EnterCtrl($scope, $http, $state){

        $scope.user = {
            login: '',
            pass: ''
        };


        $scope.getUser = getUser;

        function getUser(){
            if ($scope.userForm.$valid){
                $http.post('/getUser', $scope.user)
                    .then(function(data){
                        if (data.data.length === 0){
                            $scope.userError = true;
                        } else {
                            $state.go('content');
                        }
                    })
            }
        }

    }

})();