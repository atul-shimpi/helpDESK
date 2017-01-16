function UsersService($resource, $q, $filter, API) {
  'ngInject';
	
  var resource = $resource(API.USERS_URL  + "/:id", { id: '@_id' });
  
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
  
  resource.getRoles = function () {
    resource = $resource(API.USER_ROLES_URL);
   
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