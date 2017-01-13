module RequestHelpers
  module SessoionHelpers
    def sign_up
      body = {
        'email': 'meet-atul@hotmail.com',
        'password': 'admin1234'
      }
    
      headers = {
        'HTTP_ACCEPT': 'application/json',
        'CONTENT_TYPE': 'application/json'
      }
    
      post(user_registration_path, body, headers: headers)
    end
    
    def sign_in
      body = {
        'email': 'meet-atul@hotmail.com',
        'password': 'admin1234'
      }
    
      headers = {
        'HTTP_ACCEPT': 'application/json',
        'CONTENT_TYPE': 'application/json'
      }
    
      post(user_session_path, body, headers: headers)
    end
  end
end