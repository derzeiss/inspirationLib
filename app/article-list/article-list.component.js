'use strict';

angular.module('articleList')
    .component('articleList', {
        templateUrl: 'article-list/article-list.template.html',
        controller: articleListController
    });

articleListController.$inject = ['$routeParams', 'Article'];

function articleListController($routeParams, Article) {
    var ctrl = this;

    ctrl.articles = Article.query();
    ctrl.filter = getFilter($routeParams.searchFor, $routeParams.in);

    ////////////////////
    function getFilter(searchFor, searchIn) {
        if(!searchFor) return;
        if(!searchIn) return searchFor;

        var filter = {};
        searchIn.split(',').forEach(function(key) {
            if(key == 'tag') key = 'tagList';
            filter[key] = searchFor;
        });
        return filter;
    }
}