function TicketsStatusMstService($resource, $q, $filter, API) {
  'ngInject';
	
  var resource = $resource(API.TICKETS_STATUS_MST_URL);
    
  return resource;
}

export {TicketsStatusMstService};