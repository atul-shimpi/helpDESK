require 'rails_helper'
require_relative './helpers'
require 'json'

RSpec.configure do |c|
  c.include RequestHelpers::SessionHelpers
end

RSpec.describe "Tickets Management", type: :request do
  before(:all) do
    sign_up
    sign_in
  end
  
  ticket = {
    :ticket => {
      :assignee_id => 3,
      :ticket_type_id => 7,
      :description => "Need to download Rubymine",
      :comment => "Please do quickly"
    }
  }
  
  it "creates a new ticket" do
    # get existing records count
    get(api_v1_tickets_path, headers: auth_headers)
    count = JSON.parse(response.body).count
    
    # add new record
    post(api_v1_tickets_path, :params => ticket.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created)   

    # again get the record count
    get(api_v1_tickets_path, headers: auth_headers)
    expect(JSON.parse(response.body).count).to eq(count + 1) 
	end
	
  it "finds a ticket" do  
    # create
    post(api_v1_tickets_path, :params => ticket.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created) 

    id = JSON.parse(response.body)["id"]
    
    # find
    get(api_v1_tickets_path + "/#{id}", headers: auth_headers)    
    expect(response).to have_http_status(:success) 
    
    response_body = JSON.parse(response.body) 
   
    expect(response_body['assignee']['id']).to  eq(ticket[:ticket][:assignee_id])
    expect(response_body['description']).to  eq(ticket[:ticket][:description])
    expect(response_body['comment']).to  eq(ticket[:ticket][:comment])
	end
  
  it "Updates a ticket" do  
    # create
    post(api_v1_tickets_path, :params => ticket.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created) 

    id = JSON.parse(response.body)["id"]
    
    ticket_ = {
      :ticket =>
        {
          :id => id,
          :description => "Please download"
        }
    }
    
    # update
    put(api_v1_tickets_path + "/#{id}", :params => ticket_.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:success) 
    
    # find
    get(api_v1_tickets_path + "/#{id}", headers: auth_headers)
    expect(response).to have_http_status(:success)
    
    response_body = JSON.parse(response.body)  
   
    ticket_[:ticket].keys.each do |key|
      expect(response_body[key.to_s]).to  eq(ticket_[:ticket][key])
    end
	end
  
  it "deletes a ticket" do  
    # create ticket
    post(api_v1_tickets_path, :params => ticket.to_json, headers: auth_headers)    
    expect(response).to have_http_status(:created) 

    id = JSON.parse(response.body)["id"]
    
    # get record count
    get(api_v1_tickets_path, headers: auth_headers)
    count = JSON.parse(response.body).count
    
    # delete above record
    delete(api_v1_tickets_path + "/#{id}", headers: auth_headers)    
    expect(response).to have_http_status(:success) 
   
    # get record count
    get(api_v1_tickets_path, headers: auth_headers)
    expect(JSON.parse(response.body).count).to eq(count - 1)    
	end
  
end