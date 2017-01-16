require 'rails_helper'
require_relative './helpers'
require 'json'

RSpec.configure do |c|
  c.include RequestHelpers::SessionHelpers
end

RSpec.describe "User Management", type: :request do
  before(:all) do
    sign_up
    sign_in
  end
  
  user = {
    :user => {
      :email => 'archana@hotmail.com',
      :password => 'archana@1601',
      :password_confirmation => 'archana@1601',
      :name => 'Archana Vijay',
      :role => 'engineer'
    }
  }
 
  it 'creates a new user' do
    # get existing records count
    get(api_v1_users_path, headers: auth_headers)
    count = JSON.parse(response.body).count
    
    # add new record
    post(api_v1_users_path, :params => user.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created)   

    # again get the record count
    get(api_v1_users_path, headers: auth_headers)
    expect(JSON.parse(response.body).count).to eq(count + 1) 
  end
  
  it "finds an user" do  
    new_user = {
      :user => {
        :email => 'archana44@hotmail.com',
        :password => 'archana@1605',
        :password_confirmation => 'archana@1605',
        :name => 'Archana Joshi',
        :role => 'admin'
      }
    }
  
    # create
    post(api_v1_users_path, :params => new_user.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created) 

    id = JSON.parse(response.body)["id"]
    
    # find
    get(api_v1_users_path + "/#{id}", headers: auth_headers)    
    expect(response).to have_http_status(:success) 
    
    response_body = JSON.parse(response.body) 
    
    expect(response_body['email']).to  eq(new_user[:user][:email])
    expect(response_body['name']).to  eq(new_user[:user][:name])
    expect(response_body['role']).to  eq(new_user[:user][:role])
	end
  
  it "Updates an user" do  
    update_user = {
      :user => {
        :name => "Mr. Admin"
      }
    }
    
    # update
    put(api_v1_users_path + "/2", :params => update_user.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:success) 
    
    # find
    get(api_v1_users_path + "/2", headers: auth_headers)
    expect(response).to have_http_status(:success)    
    response_body = JSON.parse(response.body) 
    
    expect(response_body['name']).to  eq(update_user[:user][:name])   
	end
  
  it "deletes an user" do  
    delete_user = {
      :user => {
        :email => 'ram@hotmail.com',
        :password => 'ram@1601',
        :password_confirmation => 'ram@1601',
        :name => 'Ram Gondhalekar',
        :role => 'admin'
      }
    }
  
    # create
    post(api_v1_users_path, :params => delete_user.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created)  

    id = JSON.parse(response.body)["id"]
    
    # get record count
    get(api_v1_users_path, headers: auth_headers)
    count = JSON.parse(response.body).count
    
    # delete above record
    delete(api_v1_users_path + "/#{id}", headers: auth_headers)    
    expect(response).to have_http_status(:success) 
   
    # get record count
    get(api_v1_users_path, headers: auth_headers)
    expect(JSON.parse(response.body).count).to eq(count - 1)    
	end
end