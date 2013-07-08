angular.module('storyServices', ['ngResource']).
    factory('Story', function($resource) {
        return $resource('/api/v1/stories');
    });

angular.module('story', ['storyServices'], function($routeProvider) {
    $routeProvider.
    when('/story', {
        templateUrl: '/js/app/story/story.tpl.html',
        controller: 'StoryCtrl'
    }).
    when('/story-list', {
        templateUrl: '/js/app/story/story-list.tpl.html',
        controller: 'StoryListCtrl'
    });
});

angular.module('story').controller('StoryCtrl', function($scope, Story) {
    $scope.story = {
        title: "Untitled story",
        author: "Anonymous",
        pages: []
    };

    $scope.currentPage = $scope.story.pages[0];

    $scope.select = function() {
        $scope.currentPage = this.page;
    };

    $scope.add = function() {
        var page = {content: "Insert content here."};
        $scope.story.pages.push(page);
        $scope.currentPage = page;
    };

    $scope.save = function() {
        var story = new Story($scope.story);
        story.$save(function(story, response) {
            console.log(response);
        });
    };
});

angular.module('story').controller('StoryListCtrl', function($scope, $location, Story) {
    $scope.stories = Story.query();
    $scope.new = function() {
        $location.path('/story');
    };
});