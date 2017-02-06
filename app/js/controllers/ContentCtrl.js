(function(){

    angular
        .module('app')
        .controller('ContentCtrl', ContentCtrl);

    ContentCtrl.$iject = ['$scope','$http'];

    function ContentCtrl($scope, $http){
        // объект с данными о пользователе, который приходят из бд
        $scope.user = {};

        // ng-model второго селекта (с подкатегориями)
        $scope.category = [];
        // в этb меременную ($scope.category)  будем записывать все подкатегории из базы данных
        // и подставлять в селект
        // так как по умолчанию у нас стоит доход, то и подставлять будем подкатегории дохода (переменная $scope.incomeCat)
        // $scope.consumptionCat соответственно подкатегории расхода
        // так же есть базовые категории, но они нам пока не нужны
        // categories :
        $scope.basicCat = [];
        $scope.incomeCat = [];
        $scope.consumptionCat = [];

        // $scope.currency будет содержать данные для ридиокнопок со значением названия валюты и id из бд
        // по умолчанию стоит бел. рубль
        $scope.currency = {};

        // первый селект с выбором "расход\доход"
        // по умолчанию ставим "доход"
        $scope.operation = 'Доход';

        // $scope.newOperation.amount - поле, где пользователь вводит сумму расхода\дохода
        $scope.newOperation = {
            amount: '',
            date: '',
            descr: '',
            category: '',
            name: $scope.operation
        };

        // $scope.sendData - функция, которая отправляет данные на сервер
        $scope.sendData = sendData;

        // функция addProperty довавляет данные из полей ввода в объект, который будем отправлять на сервер
        $scope.addProperty = addProperty;



        // делаем запрос данных на юзера и заносим все это в таблицу
        $http.get('/getData')
            .then(function(data){
                var userData = data.data;
                $scope.user = userData;
                console.log(data.data)
            });

        // так же делаем запрос на валюту
        $http.get('/getCurrency')
            .then(function(data){
                $scope.currency = data.data;
                // делаем выбранным бел рубл по умолчанию
                $scope.currency.name = $scope.currency[0];
                // добавляем в объект отправки данных бел. рубль по умолчанию
                // однако при смене валюты сработает функция addProperty
                // и значение валюты изменится
                $scope.newOperation.currency = $scope.currency[0];
            });

        // сразу же делаем запрос на селекты ( доход/расход + категории )
        $http.get('/getOperations')
            .then(function(data){
                var categories = data.data,
                    i;

                // сортируем операции по доходу и расходу
                for (i=0; i<categories.length; i++){
                    if (categories[i].Id == 3 || categories[i].Id == 4){
                        $scope.basicCat.push(categories[i])
                    }
                    else if ((categories[i].Id !=3 || categories[i].Id != 4) && categories[i].PaymentTypeId == 1 ){
                        $scope.incomeCat.push(categories[i])
                    } else {
                        $scope.consumptionCat.push(categories[i])
                    }
                }

            });

        // отправка данных на сервер
        function sendData(){
            $http.post('/addOperation', $scope.newOperation)
                .then(function(data){

                });
            console.log($scope.newOperation)
        }


        // функция addProperty довавляет данные из полей ввода в объект, который будем отправлять на сервер
        function addProperty(name, value){
            $scope.newOperation[name] = value
        }


    }
})();