(function(){

    angular
        .module('app')
        .controller('RegCtrl', ['$scope','$http','$timeout',RegCtrl]);

    RegCtrl.$inject = ['$scope','$http','$state','$timeout'];

    function RegCtrl($scope,$http,$timeout) {


        $scope.newUser = {
            login: '',
            name: '',
            pass: '',
            passCopy: '',
            email: ''
        };


        $scope.checkData = checkData;
        $scope.clearForm = clearForm;


        function checkData() {
            var closeButton = $('#closeForm');

            // если пароли не совпадают, выводим сообщение
            if ($scope.newUser.passCopy != $scope.newUser.pass) {
                $scope.passCopyError = true;
            }
            // если все хорошо, то отправляем запрос на сервер
            else {
                // отправляем объект newUser
                $scope.validForm = true;
                $http.post('/url', $scope.newUser)
                    .then(function (data) {
                        $timeout(function () {
                            closeButton.click();
                        }, 1000)
                    })
            }
        }

        // чистим данные формы
        function clearForm(){
            $scope.validForm = false;
            $scope.newUser = {
                login: '',
                name: '',
                pass: '',
                passCopy: '',
                email: ''
            };
        }

    }

})();