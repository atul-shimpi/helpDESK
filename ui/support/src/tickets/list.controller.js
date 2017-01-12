function ListTicketsController(
  TicketsService,
  $scope,
  $state,
  $http,
  $log) {
  'ngInject';  
  initialize(); 
  
  function initialize() {    
    TicketsService.query(     
      function (data) { //got tickets
        data.sort(function(a,b) { // order by creation date in descending    
          return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
        });       
        
        $scope.tickets = data;  
      }, 
      function(error){ // some error while getting tickets
        alert(error);            
      }
    );  
  }
  
};

export {ListTicketsController};