import {UsersService} from './service';
import {UsersListController} from './list.controller';
import {NewUserController} from './new.controller'

export default angular.module('usersController', [])
  .service('UsersService', UsersService)
  .controller('UsersListController', UsersListController) 
  .controller('NewUserController', NewUserController)  
;