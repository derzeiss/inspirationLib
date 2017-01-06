'use strict';

angular.module('search')
    .component('search', {
        templateUrl: 'search/search.template.html',
        controller: searchController
    });

searchController.$inject = ['$location', '$routeParams'];

function searchController($location, $routeParams) {
    var ctrl = this;

    ctrl.onChangeSearchFor = onChangeSearchFor;
    ctrl.toggleSearchIn = toggleSearchIn;

    console.log('[search][controller]');
    ctrl.search = getSearchFromUrl();  // search data
    ////////////////////
    /**
     * sets new url depending on search properties
     */
    function onChangeSearchFor() {
        updateUrl();
    }

    /**
     * toggles search.in.<key>
     * @param key
     */
    function toggleSearchIn(key) {
        if (!key) return;
        ctrl.search.in[key] = !ctrl.search.in[key];
        updateUrl();
    }

    function updateUrl() {
        // build searchIn
        if(ctrl.search.in.title && ctrl.search.in.tag && ctrl.search.in.author) searchIn = '';
        else {
            var key, value, searchIn = '';
            for (key in ctrl.search.in) { // iterate over search.in fields
                if (!ctrl.search.in.hasOwnProperty(key)) continue;
                value = ctrl.search.in[key];
                // add search filter to searchIn
                if (value) {
                    searchIn += searchIn.length ? ',' + key : key;
                }
            }
            searchIn = '?in=' + searchIn;
        }

        $location.url('/search/' + ctrl.search.for + searchIn);
    }

    /**
     * sets ctrl.search depending on url params
     * @returns {{for: string, in: {title: boolean, author: boolean, tag: boolean}}}
     */
    function getSearchFromUrl() {
        var search = {
                for: $routeParams.searchFor,
                in: {
                    title: true,
                    author: true,
                    tag: true
                }
            },
            searchIn = $routeParams.in;

        if (searchIn) {
            searchIn = searchIn.split(',');
            search.in.title = searchIn.indexOf('title') > -1;
            search.in.author = searchIn.indexOf('author') > -1;
            search.in.tag = searchIn.indexOf('tag') > -1;
        }

        return search;
    }
}