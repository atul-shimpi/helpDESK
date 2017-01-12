function UsersService($resource, $q, $filter, API) {
  'ngInject';
	
  var resource = $resource(API.USERS_URL);
  
  resource.getAllAssignees = function () {
    resource = $resource(API.ASSIGNEES_URL);
    
    return this.query().
      $promise.then(      
        function(data) { //success
          return data;
        },
        function(data) { //failure
          return $q.reject(data);
        }
      );
  };
  
  return resource;
}

export {UsersService};