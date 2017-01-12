function TicketsService($resource, $q, $filter, API) {
  'ngInject';
	
  //var resource = $resource(API.TICKETS_URL + "/:id");
  
  return $resource(API.TICKETS_URL + "/:id", { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });  
  //return resource;
}

export {TicketsService};