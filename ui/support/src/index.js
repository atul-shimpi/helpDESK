import loginComponent from './login';
import registerComponent from './register';
import profileComponent from './profile';
import ticketsComponent from './tickets';
import ticketTypesComponent from './ticketTypes';
import userComponent from './users';

export default angular.module('helpMe.components', [
  loginComponent.name,
  registerComponent.name,
  profileComponent.name,
  ticketsComponent.name,
  ticketTypesComponent.name,
  userComponent.name
]);