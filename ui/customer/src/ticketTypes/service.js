function TicketTypesService($resource, $q, $filter, API) {
  'ngInject';
	
  var resource;

  resource = $resource(API.TICKET_TYPES_URL);
  
  resource.getAll = function () {
    return this.query().
      $promise.then(      
        function(data) { //success
              return data;
            },
            function(data){ //failure
              return $q.reject(data);;
            }
        );
  };
  
  return resource;
}

export {TicketTypesService};