angular.module('app', [
    'home'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $routeProvider.otherwise({
        redirectTo: "/"
    });
}]);

angular.module('app').controller('AppCtrl', ['$scope', function($scope) {
    $scope.title = 'Story Ark';
}]);

angular.module('app').controller('HeaderCtrl', ['$scope', function($scope) {

}]);