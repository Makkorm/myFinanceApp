(function(){

    angular
        .module('app')
        .controller('MainCtrl',MainCtrl);

    MainCtrl.$inject = ['$scope','$http'];

    function MainCtrl($scope, $http){
        $scope.data = [];
        var mas = '';
        //$http.get('http://www.nbrb.by/API/ExRates/Rates/298')
        //    .then(function(data){
        //        console.log(data);
        //    });
        //$http.get('http://www.nbrb.by/API/ExRates/Rates/145')
        //    .then(function(data){
        //        console.log(data);
        //    });
        //$http.get('http://www.nbrb.by/API/ExRates/Rates/292')
        //    .then(function(data){
        //        console.log(data);
        //    })
        $http.get('http://www.nbrb.by/API/ExRates/Currencies')
            .then(function(data){
                console.log(data.data)
            })
        $http.get('http://www.nbrb.by/API/ExRates/Currencies')
            .then(function(data){
                $scope.data = data.data;
                for(var i = 0; i < data.data.length; i++){
                    for( var key in data.data[i]){
                        console.log( key +" "+ data.data[key])
                    }
                }
            })



        console.log(mas)
    }


})();