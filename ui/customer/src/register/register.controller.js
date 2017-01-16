function RegisterController(
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
    $scope.registerForm = {};
  }
 
  $scope.onClickRegisterBtn = function() {
    $scope.registrationInProgress = true;
    
    $auth.submitRegistration($scope.registerForm)
      .then(function(resp) {
        $auth.submitLogin({
          email: $scope.registerForm.email,
          password: $scope.registerForm.password
        }).then(function(res) {
        });
      })
      .catch(function(resp) {
        // handle error response
      });
  };  

  // Got Sign up successful alert
  $scope.$on('auth:registration-email-success', function(ev, message) {
    $scope.registrationInProgress = false;
    // no need to do anything, here
  });
  
  // Got sign up failture alert
  $scope.$on('auth:registration-email-error', function(ev, reason) {
    $scope.registrationInProgress = false;
    $scope.registrationFailed = true;
    $scope.registrationErr = reason.errors.full_messages.join();
  });  
  
  // Got Login successful alert
  $scope.$on('auth:login-success', function(ev, user) {  
    $sessionStorage.user = user;
    $rootScope.user = $sessionStorage.user;
    $location.path('/tickets');   
  })
     
  // Got login failed alert
  $scope.$on('auth:login-error', function(ev, reason) {
    $scope.loginFailed = true;
    $scope.loginErr = reason.errors.join();
  });
  
};

export {RegisterController};