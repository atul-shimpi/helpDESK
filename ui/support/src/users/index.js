import {UsersService} from './service';
import {UsersController} from './users.controller';

export default angular.module('usersController', [])
  .service('UsersService', UsersService)
  .controller('UsersController', UsersController)
;