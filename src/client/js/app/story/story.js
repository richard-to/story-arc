angular.module('story', [], function($routeProvider) {
    $routeProvider.when('/story', {
        templateUrl: '/js/app/story/story.tpl.html',
        controller: 'StoryCtrl'
    });
});

angular.module('story').controller('StoryCtrl', function($scope) {
    $scope.storyTitle = "The story of bob";
    $scope.pages = [
        {content: "Bob crossed the road."},
        {content: "He ate a hamburger."},
        {content: "He went to sleep."}
    ];

    $scope.currentPage = $scope.pages[0];

    $scope.selectPage = function() {
        $scope.currentPage = this.page;
    };

    $scope.addPage = function() {
        var page = {content: "Insert content here."};
        $scope.pages.push(page);
        $scope.currentPage = page;
    };
});