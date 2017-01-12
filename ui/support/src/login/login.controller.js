function LoginController(
  $rootScope,
  $scope,
  $location,
  $state,
  $log,
  $sessionStorage,
  $auth) {
  'ngInject';  
  initialize(); 
  
  function initialize() {
    $scope.loginForm = {};
    $scope.loginForm.email = 'shimpiatul@hotmail.com';
    $scope.loginForm.password = 'admin1234';
  }
 
  // User clicked on Login button
  $scope.onClickLoginBtn = function() {
    $scope.loginInProgress = true;
    $auth.submitLogin({
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    }).then(function(res) {
    });
  };   
  
  // Got Login successful alert
  $scope.$on('auth:login-success', function(ev, user) {  
    $scope.loginInProgress = false;
    $sessionStorage.user = user;
    $rootScope.user = $sessionStorage.user;
    $location.path('/tickets');   
  })
     
  // Got login failed alert
  $scope.$on('auth:login-error', function(ev, reason) {
    $scope.loginInProgress = false;
    $scope.loginFailed = true;
    $scope.loginErr = reason.errors.join();
  });
  
};

export {LoginController};