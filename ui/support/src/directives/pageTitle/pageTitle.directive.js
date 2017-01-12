function pageTitleDirective() {
  'ngInject';
   return {
    restrict: 'EA',
    scope: {
      title: '@'
    },
    templateUrl: './src/views/pageTitle/pageTitle.html'
   };
}

export {pageTitleDirective};
