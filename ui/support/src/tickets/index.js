import {TicketsService} from './service';
import {ListTicketsController} from './list.controller';
import {NewTicketController} from './new.controller';

export default angular.module('tickets', [])
  .service('TicketsService', TicketsService)
  .controller('ListTicketsController', ListTicketsController)
  .controller('NewTicketController', NewTicketController)
;