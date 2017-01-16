import {TicketTypesService} from './service';
import {TicketTypesListController} from './list.controller';
import {NewTicketTypeController} from './new.controller'

export default angular.module('ticketsTypesController', [])
  .service('TicketTypesService', TicketTypesService)
  .controller('TicketTypesListController', TicketTypesListController) 
  .controller('NewTicketTypeController', NewTicketTypeController)  
;