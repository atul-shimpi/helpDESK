import {TicketTypesService} from './service';
import {TicketTypesController} from './ticketsTypes.controller';

export default angular.module('ticketsTypesController', [])
  .service('TicketTypesService', TicketTypesService)
  .controller('TicketTypesController', TicketTypesController)  
;