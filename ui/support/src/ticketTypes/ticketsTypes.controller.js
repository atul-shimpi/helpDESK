function TicketTypesController(
  API,
  $scope,
  $state,
  $http,
  $log) {
  'ngInject';  
  initialize(); 
  
  function initialize() {
    loadData();
  }
  
  function loadData() {
    $http.get(API.TICKET_TYPES_URL)
    .then(gotData, fail);
  }
  
  function gotData(response) {
    $scope.categories = response.data;
  }
  
  function fail(err) {
  }
};

export {TicketTypesController};