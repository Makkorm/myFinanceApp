(function(){

    angular
        .module('app', ['ui.router'])
        .config(uiRouterConfig);

    uiRouterConfig.$inject = ['$urlRouterProvider','$stateProvider'];

    function uiRouterConfig($urlRouterProvider, $stateProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('enter', {
                url : '/',
                templateUrl : 'templates/registration.html',
                controller : 'EnterCtrl'
            })
            .state('content', {
                url : '/content',
                templateUrl: 'templates/mainPage.html',
                controller: 'ContentCtrl'
            })
    }

})();