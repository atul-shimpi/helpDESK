import {pageTitleDirective} from './pageTitle.directive';

export default angular.module('pageTitle', [])
    .directive('pageTitle', pageTitleDirective)
;