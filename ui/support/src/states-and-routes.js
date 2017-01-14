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
        templateUrl: 'src/views/register/register.html',
		    controller: 'RegisterController'
    })
    .state('users', {
        url: '/users',
        templateUrl: 'src/views/users/CRUD.html',
		    controller: 'UsersController'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: 'src/views/profile/profile.html',
		    controller: 'ProfileController'
    })
    .state('ticketTypes', {
        url: '/ticket/types',
        templateUrl: 'src/views/ticketTypes/CRUD.html',
		    controller: 'TicketTypesController'
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


