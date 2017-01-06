'use strict';

angular.module('inspirationLib', [
    'ngRoute',

    'core',
    'articleList',
    'articleItem',
    'search'
])
    .constant('CONFIG', {
        urlBase: 'http://localhost:61003'
    });

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};