(function () {
    'use strict';

    angular
        .module('galery', ['ngAnimate'])
        .directive('pictureGalery', directive)
        .filter('trust', filter);

    function directive($timeout) {
        return {
            replace: true,
            restrict: 'A',
            template: '<div class="pictures"><img ng-repeat="picture in pictures" ng-show="isCurrent($index)" ng-src="{{picture | trust}}"></div>',
            //templateUrl:'templates/picture-galery.html',
            scope: {
                sourceFolder: '=pictureGalery',
                imgCount: '=count',
                delay: '='
            },
            link: function (scope, element, attrs) {
                var i;
                scope.pictures = [];
                scope.currentIndex = 0;

                scope.isCurrent = function (index) {
                    return scope.currentIndex === index;
                }

                scope.nextPicture = function () {
                    scope.currentIndex = scope.currentIndex === (scope.imgCount - 1) ? 0 : ++scope.currentIndex;
                }

                //START
                activate();

                function tick() {
                    scope.nextPicture();
                    $timeout(tick, scope.delay);
                }

                function activate() {
                    for (i = 0; i < scope.imgCount; i++) {
                        scope.pictures.push(scope.sourceFolder + i + '.jpg');
                    }

                    $timeout(tick, scope.delay);
                }
            }
        };
    }

    function filter($sce) {
        return function (value) {
            return $sce.trustAsResourceUrl(value);
        }
    }
})();
