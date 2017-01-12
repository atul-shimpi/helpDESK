require('rails_helper')

RSpec.describe('Sessions Management', type: :request) do
  it 'signs up a new user' do
    body = {
      'email': 'meet-atul@hotmail.com',
      'password': 'admin1234'
    }
    
    headers = {
      'HTTP_ACCEPT': 'application/json',
      'CONTENT_TYPE': 'application/json'
    }
    
    post(user_registration_path, body, headers: headers)
    expect(response.response_code).to eq(200)  
    
    post(user_session_path, body, headers: headers) 
  end 
  
  it 'signs in a existing user' do
    body = {
      'email': 'meet-atul@hotmail.com',
      'password': 'admin1234'
    }
    
    headers = {
      'HTTP_ACCEPT': 'application/json',
      'CONTENT_TYPE': 'application/json'
    }
    
    post(user_session_path, body, headers: headers)
    puts response.body
    expect(response.response_code).to eq(200)  
  end 
end
