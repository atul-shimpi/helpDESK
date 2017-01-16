function appHeaderDirective() {
  'ngInject';
   return {
    restrict: 'E',
    scopex: {},
    replace: false,
    templateUrl: './src/views/appHeader/header.html'
   };
}

export {appHeaderDirective};
