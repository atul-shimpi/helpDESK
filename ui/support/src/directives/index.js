import appHeaderDirective from './appHeader';
import pageTitleDirective from './pageTitle';
import buildsDirective from './builds';

export default angular.module('myDirectives', [
	appHeaderDirective.name,
  pageTitleDirective.name,
  buildsDirective.name
]);
