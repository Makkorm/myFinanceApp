(function(){

    angular
        .module('app')
        .controller('MainCtrl',MainCtrl);

    MainCtrl.$inject = ['$scope','$http'];

    function MainCtrl($scope, $http){

        // в переменную currency записываем данные о валютах, а именно рубл, доллар и евро
        $scope.currency = [];

        // получаем даныне о валюте из нац банка
        $http.get('http://www.nbrb.by/API/ExRates/Rates/298')
            .then(function(data) {
                // так как из api курс рубля дается нам на 100 едениц, то есть на 100 рублей
                // вручную переделаем на 1 рубль
                var rub = data.data.Cur_OfficialRate/100;
                $scope.currency.rub = rub;
            });
        $http.get('http://www.nbrb.by/API/ExRates/Rates/145')
            .then(function(data){
                $scope.currency.usd = data.data;
            });
        $http.get('http://www.nbrb.by/API/ExRates/Rates/292')
            .then(function(data){
                $scope.currency.eur = data.data;
            });

    }


})();