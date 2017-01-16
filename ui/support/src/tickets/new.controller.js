function NewTicketController(
  TicketTypesService,
  UsersService,
  TicketsService,
  TicketsStatusMstService,
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
    
    // load ticket types
    TicketTypesService.getAll()
     .then(
       function (data) {        
         $scope.ticketTypes = data;  
       }, 
       function(error){
         alert(error);            
       }
    );  
    
    // load assignees (all users whose role is not customer)
    UsersService.getAllAssignees()
     .then(
       function (data) {
        $scope.assignees = data;  
       }, 
       function(error){
         alert(error);            
       }
    );  
    
    $scope.ticketForm.assignee_id = $sessionStorage.user.id.toString();
    
    if (isNotEditing()) return;
    
    //if user is editing then below code will be executed
    
    // get status master
    TicketsStatusMstService.query(
      function(data) {
        $scope.status_mst = data;  
      },
      function(err) {
        $scope.saveFailed = true;
        $scope.savingInProgress = false;
        $scope.err = err.data;
    })   
    
    // get ticket details
    TicketsService.get({id: $state.params.id},
      function(data) {
        $scope.ticketForm = data; 
        $scope.ticketForm.ticket_type_id = data.ticket_type.id;
        $scope.ticketForm.assignee_id = data.assignee.id;
        $scope.comments_history = data.comments_history;
        $scope.ticketForm.comment = ""
        
        for (var i = 0; i < $scope.status_mst.length; i++) { 
          if ($scope.status_mst[i].status === data.status_) { 
              $scope.ticketForm.status = $scope.status_mst[i].id;
              break;
          } 
        }  
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
    
    TicketsService.save({ticket: $scope.ticketForm},
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
  
  // user clicked on Update button
  $scope.onClickUpdateBtn = function() {
    $scope.saveFailed = false
    $scope.err = ''
    $scope.savingInProgress = true
    
    TicketsService.update({id: $state.params.id}, {ticket: $scope.ticketForm},
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

export {NewTicketController};