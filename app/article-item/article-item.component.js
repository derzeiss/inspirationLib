'use strict';

angular.module('articleItem')
    .component('articleItem', {
        bindings: {
            article: '<'
        },
        templateUrl: 'article-item/article-item.template.html',
        controller: articleItemController
    });

articleItemController.$inject = [];

function articleItemController() {
    var ctrl = this;

    ctrl.scrollHorizontal = scrollHorizontal;

    ////////////////////

    function scrollHorizontal(ev) {
        ev.preventDefault();
        var node = ev.target.classList[0] == 'tag' ? ev.target.parentNode : ev.target;
        node.scrollLeft += 30 * (ev.deltaY / Math.abs(ev.deltaY));
    }
}