require 'rails_helper'
require_relative './helpers'

RSpec.configure do |c|
  c.include RequestHelpers::SessoionHelpers
end

RSpec.describe "Tickets CRUD", type: :request do
  before(:all) do
    sign_up
    sign_in
  end
    
  it "creates a new ticket" do    
    ticket = '{"ticket": {"assignee_id": 3, "ticket_type_id": 7, "description": "Need to download Rubymine"}}'
    
    post(api_v1_tickets_path, :params => ticket, headers: auth_headers)
    
    expect(response).to have_http_status(:created)             
	end
	
end