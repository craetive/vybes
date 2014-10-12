angular.module('mydirectives', []);

angular.module('mydirectives').directive('youtube', function($sce) {
    return {
        restrict: 'EA',
        transclude: true,
        scope: { code: '@code'},
        replace: true,
        template: '<iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
        link: function (scope) {
            scope.$watch('code', function (newVal) {
                if (newVal) {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
});
