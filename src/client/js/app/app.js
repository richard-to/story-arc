angular.module('app', [
    'home',
    'story'
]);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $routeProvider.otherwise({
        redirectTo: "/"
    });
});

angular.module('app').controller('AppCtrl', function($scope) {
    $scope.title = 'Story Ark';
});