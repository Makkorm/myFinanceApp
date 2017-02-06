(function(){

    angular
        .module('app')
        .filter('userDataFilter', userDataFilter);

    function userDataFilter(){
        return function(items, value){

        }
    }

})();