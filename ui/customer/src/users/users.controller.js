function UsersController(
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
    $http.get(API.USERS_URL)
    .then(gotData, fail);
  }
  
  function gotData(response) {
    $scope.users = response.data;
  }
  
  function fail(err) {
  }
};

export {UsersController};