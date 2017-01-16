function UsersListController(
  UsersService,
  $scope,
  $state,
  $http,
  $log) {
  'ngInject';  
  initialize(); 
  
  function initialize() {
    loadData();
  }
  
  // delete ticket
  $scope.onClickDelete = function(id) {
    if (confirm("Do you want to delete this user " + id + "?")) {
    UsersService.delete({id: id},
      function(data) {
        $scope.categories.forEach(function(item, index, object) {
          if (item.id === id) {
            object.splice(index, 1);
          }
        });
      },
      function(err) {
        alert(err);
    });  
    }
  };
  
  function loadData() {    
    UsersService.query(  
      function (data) { //got tickets types          
        
        $scope.users = data; 
        $scope.resetInProgress = false;        
      }, 
      function(error){ // some error while getting tickets
        $scope.resetInProgress = false;
        alert(error);            
      }
    );  
  }
};

export {UsersListController};