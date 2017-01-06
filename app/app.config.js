'use strict';

angular.module('inspirationLib')
    .config(inspirationLibConfig);

inspirationLibConfig.$inject = ['$locationProvider', '$routeProvider'];

function inspirationLibConfig($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            template: '<article-list></article-list>'
        })
        .when('/search/:searchFor', {
            template: '<article-list></article-list>'
        })
        .when('/search/:searchFor&in=:searchIn', {
            template: '<article-list></article-list>'
        })
        .otherwise('/');

}