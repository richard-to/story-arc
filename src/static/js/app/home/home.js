angular.module('home', [], ['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/static/js/app/home/home.tpl.html',
        controller: 'HomeCtrl'
    });
}]);

angular.module('home').controller('HomeCtrl', ['$scope', function($scope) {

}]);