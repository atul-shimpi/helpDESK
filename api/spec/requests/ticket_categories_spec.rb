require 'rails_helper'
require_relative './helpers'
require 'json'

RSpec.configure do |c|
  c.include RequestHelpers::SessionHelpers
end

RSpec.describe "Tickets Categories Management", type: :request do
  before(:all) do
    sign_up
    sign_in
  end
  
  ticket_type = {
    :ticket_type => {
      :type_of_ticket => "Configure VPN"
    }
  }
  
  it "creates a new ticket category" do
    # get existing records count
    get(api_v1_ticket_types_path, headers: auth_headers)
    count = JSON.parse(response.body).count
    
    # add new record
    post(api_v1_ticket_types_path, :params => ticket_type.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created)   

    # again get the record count
    get(api_v1_ticket_types_path, headers: auth_headers)
    expect(JSON.parse(response.body).count).to eq(count + 1) 
	end
	
  it "finds a ticket type" do  
    # add new record
    post(api_v1_ticket_types_path, :params => ticket_type.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created)  

    id = JSON.parse(response.body)["id"]
    
    # find
    get(api_v1_ticket_types_path + "/#{id}", headers: auth_headers)    
    expect(response).to have_http_status(:success) 
    
    response_body = JSON.parse(response.body)  
    
    ticket_type[:ticket_type].keys.each do |key|
      expect(response_body[key.to_s]).to  eq(ticket_type[:ticket_type][key])
    end
	end
  
  it "Updates a ticket type" do  
    # create
    post(api_v1_ticket_types_path, :params => ticket_type.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created)  

    id = JSON.parse(response.body)["id"]
    
    ticket_type_ = {
      :ticket_type => {
        :type_of_ticket => "Configure VPN for latest version"
      }
    }
    
    # update
    put(api_v1_ticket_types_path + "/#{id}", :params => ticket_type_.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:success) 
    
    # find
    get(api_v1_ticket_types_path + "/#{id}", headers: auth_headers)
    expect(response).to have_http_status(:success)
    
    response_body = JSON.parse(response.body)  
    ticket_type_[:ticket_type].keys.each do |key|
      expect(response_body[key.to_s]).to  eq(ticket_type_[:ticket_type][key])
    end
	end
  
  it "deletes a ticket type" do  
    # create
    post(api_v1_ticket_types_path, :params => ticket_type.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created)  

    id = JSON.parse(response.body)["id"]
    
    # get record count
    get(api_v1_ticket_types_path, headers: auth_headers)
    count = JSON.parse(response.body).count
    
    # delete above record
    delete(api_v1_ticket_types_path + "/#{id}", headers: auth_headers)    
    expect(response).to have_http_status(:success) 
   
    # get record count
    get(api_v1_ticket_types_path, headers: auth_headers)
    expect(JSON.parse(response.body).count).to eq(count - 1)    
	end
end