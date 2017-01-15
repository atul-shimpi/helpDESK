module RequestHelpers
  module SessoionHelpers
    def sign_in_request_headers
      headers = { 
        'HTTP_ACCEPT': 'application/json',
        'CONTENT_TYPE': 'application/json' }
    end
    
    def sign_up
      post(user_registration_path, sign_up_request_body, headers: sign_up_request_headers)      
    end
    
    def sign_in    
      post(user_session_path, sign_up_request_body, headers: sign_up_request_headers)
      
      @@auth_headers = {}         
      
      @@auth_headers['HTTP_ACCEPT'] = 'application/json'
      @@auth_headers['CONTENT_TYPE'] = 'application/json'
      @@auth_headers['token-type'] = response.headers['token-type']
      @@auth_headers['access-token'] = response.headers['access-token']
      @@auth_headers['client'] = response.headers['client']
      @@auth_headers['uid'] = response.headers['uid']        
    end
    
    def auth_headers
      @@auth_headers
    end
    
    def sign_out          
      delete(destroy_user_session_path, headers: @@auth_headers)          
    end
    
    def unregister_customer
      delete(user_registration_path, headers: @@auth_headers)     
    end
    
    # private methods
    private
    def sign_up_request_body
      { 'email': 'meet-atul@hotmail.com',
        'password': 'admin1234' }
    end
    
    private
    def sign_up_request_headers
      headers = { 
        'HTTP_ACCEPT': 'application/json',
        'CONTENT_TYPE': 'application/json' }
    end
  end
end