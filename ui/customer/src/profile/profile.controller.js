function ProfileController(
  $rootScope,
  $scope,
  $location,
  $log,
  $sessionStorage,
  $auth) {
  'ngInject';  
  initialize(); 
  
  function initialize() {
    $scope.editProfileFailed = false;
    $scope.editProfileErr = '';
    $scope.profileForm = {};
    $scope.profileForm.name = 'Atul Shimpi';
    $scope.profileForm.email = 'meet-atul@hotmail.com';
  }
  
  // user clicked update button
  $scope.onClickUpdateBtn = function() {
    $scope.profileUpdationInProgress = true;
    $scope.editProfileFailed = false;
    $scope.editProfileSuccessfully = false;
    
    $auth.updateAccount($scope.profileForm)
      .then(function(resp) {
        // handle success response
      })
        .catch(function(resp) {
        // handle error response
      });
  };
  
  // got account successfully updated alert
  $scope.$on('auth:account-update-success', function(ev) {
    $scope.profileUpdationInProgress = false;
    $scope.editProfileSuccessfully = true;
    $rootScope.user.name = $scope.profileForm.name;
    $rootScope.user.email = $scope.profileForm.email;
  })
  
  // got account updation filture alert
  $scope.$on('auth:account-update-error', function(ev, reason) {
    $scope.profileUpdationInProgress = false;
    $scope.editProfileFailed = true;
    $scope.editProfileSuccessfully = false;
  })
};

export {ProfileController};