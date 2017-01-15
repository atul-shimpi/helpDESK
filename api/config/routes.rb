Rails.application.routes.draw do    
  mount_devise_token_auth_for 'User', at: 'auth',controllers: {
        registrations: 'users/registrations'
     }
  
   #Rails.application.routes.draw do
     # devise_for :users, controllers: {
      #  sessions: 'users/sessions'
    #  }
   # end
    
  namespace :api do
    namespace :v1 do
      get 'users' => 'users#index'
      get 'asignees' => 'users#asigneens'
      get '/master/tickets/status' => 'tickets_status_master#index'
      
      resources :ticket_types,
        :tickets,
        :defaults => { :format => 'json' }
    end
  end 
  
  # no need to version these since these will never change
  get '/ping' => 'ping#index'
  get '/hi' => 'hi#index' 
end
