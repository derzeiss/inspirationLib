'use strict';

angular.module('core.jsScroll')
    .directive('jsScroll', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var methodInvoker = $parse(attrs.jsScroll);
                element.bind('wheel', function (ev) {
                    scope.$apply(function () {
                        methodInvoker(scope, {$event: ev});
                    })
                });
            }
        };
    });