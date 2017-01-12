import './styles.scss';
import {buildsDirective} from './builds.directive';
import {buildColumnsDirective} from './buildColumns.directive';


export default angular.module('builds', [])
  .directive('builds', buildsDirective)
  .directive('buildColumns', buildColumnsDirective)  
;