Rails.application.routes.draw do    
  mount_devise_token_auth_for 'User', at: 'auth',controllers: {
        registrations: 'users/registrations'
  }
      
  namespace :api do
    namespace :v1 do
      get 'asignees' => 'users#asigneens'      
      get '/master/tickets/status' => 'tickets_status_master#index'
      get '/master/user/roles' => 'users#roles'
      
      resources :ticket_types,
        :tickets,
        :users,
        :defaults => { :format => 'json' }
    end
  end 
  
  # no need to version these since these will never change
  get '/ping' => 'ping#index'
  get '/hi' => 'hi#index' 
end
