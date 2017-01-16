function TicketsService($resource, $q, $filter, API) {
  'ngInject';
  
  return $resource(API.TICKETS_URL + "/:id", { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });  
}

export {TicketsService};