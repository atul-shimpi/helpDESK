function NewUserController(
  UsersService,
  $sessionStorage,
  $scope,
  $state,
  $http,
  $window,
  $log) {
  'ngInject';  
  initialize();   
   
  function isNotEditing() {
    return $state.params.id == undefined ? true : false;
  }
  
  function initialize() { 
    $scope.ticketForm = {};     
    
    if (isNotEditing()) return;
    
    // get ticket type details
    UsersService.get({id: $state.params.id},
      function(data) {
        $scope.profileForm = data;        
      },
      function(err) {
        $scope.saveFailed = true;
        $scope.savingInProgress = false;
        $scope.err = err.data;
    })      
  }
  
  // user clicked on cancel button
  $scope.onClickBackBtn = function() {
    $window.history.back();
  };
  
  // user clicked on save button
  $scope.onClickSaveBtn = function() {
    $scope.saveFailed = false
    $scope.err = ''
    $scope.savingInProgress = true
    
    UsersService.save({user: $scope.form},
      function(data) {
        $scope.saveFailed = false;
        $scope.savingInProgress = false; 
        $scope.err = "";  
        $window.history.back();        
      },
      function(err) {
        $scope.saveFailed = true;
        $scope.savingInProgress = false;
        $scope.err = err.data;
    });      
  };
  
  // user clicked on Update button
  $scope.onClickUpdateBtn = function() {
    $scope.saveFailed = false
    $scope.err = ''
    $scope.savingInProgress = true
    
    UsersService.update({id: $state.params.id}, {ticket: $scope.ticketForm},
      function(data) {
        $scope.saveFailed = false;
        $scope.savingInProgress = false; 
        $scope.err = "";  
        $window.history.back();        
      },
      function(err) {
        $scope.saveFailed = true;
        $scope.savingInProgress = false;
        $scope.err = err.data;
    })      
  };
  
};

export {NewUserController};