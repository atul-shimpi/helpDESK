export default function routeConfig($stateProvider,
                                    $urlRouterProvider,
                                    $authProvider,
                                    $httpProvider) {
  
  
  // configure routes
  $urlRouterProvider.otherwise('/');  
	
  $stateProvider
    .state('login', {
        url: '/',
        templateUrl: 'src/login/views/login.html',
		    controller: 'LoginController'
    })
    .state('register', {
        url: '/register',
        templateUrl: 'src/register/views/register.html',
		    controller: 'RegisterController'
    })
    .state('users', {
        url: '/users',
        templateUrl: 'src/users/views/list.html',
		    controller: 'UsersListController'
    })
    .state('new-user', {
        url: '/users/new',
        templateUrl: 'src/users/views/new-and-edit.html',
		    controller: 'NewUserController'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: 'src/views/profile/profile.html',
		    controller: 'ProfileController'
    })
    .state('ticketTypes', {
        url: '/ticket/types',
        templateUrl: 'src/ticketTypes/views/list.html',
		    controller: 'TicketTypesListController'
    })
    .state('tickets', {
        url: '/tickets',
        templateUrl: 'src/tickets/views/list.html',
		    controller: 'ListTicketsController'
    })
    .state('new-ticket', {
        url: '/tickets/new',
        templateUrl: 'src/tickets/views/new.html',
		    controller: 'NewTicketController'
    })
    .state('edit-ticket', {
        url: '/tickets/:id/edit',
        templateUrl: 'src/tickets/views/edit.html',
		    controller: 'NewTicketController'
    })
    .state('new-ticket-type', {
        url: '/ticket-type/new',
        templateUrl: 'src/ticketTypes/views/new-and-edit.html',
		    controller: 'NewTicketTypeController'
    })
    .state('edit-ticket-type', {
        url: '/ticket-type/:id/edit',
        templateUrl: 'src/ticketTypes/views/new-and-edit.html',
		    controller: 'NewTicketTypeController'
    });
      
  // configure Angular token auth  
  $authProvider.configure({
    apiUrl: 'http://localhost:3000',
    validateOnPageLoad: false,
  });
       
}; 
    
routeConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$authProvider',
  '$httpProvider'
];    


