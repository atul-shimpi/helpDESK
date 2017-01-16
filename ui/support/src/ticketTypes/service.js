function TicketTypesService($resource, $q, $filter, API) {
  'ngInject';
  
  return $resource(API.TICKET_TYPES_URL + "/:id", { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
}

export {TicketTypesService};