'use strict';

angular.module('core.article')
    .factory('Article', ArticleFactory);

ArticleFactory.$inject = ['$resource', 'CONFIG'];

function ArticleFactory($resource, CONFIG) {
    return $resource(CONFIG.urlBase + '/api/article');
}