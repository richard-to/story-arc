angular.module('home', [], function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/js/app/home/home.tpl.html',
        controller: 'HomeCtrl'
    });
});

angular.module('home').controller('HomeCtrl', function($scope) {

});