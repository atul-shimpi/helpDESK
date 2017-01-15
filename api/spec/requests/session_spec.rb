require 'rails_helper'
require_relative './helpers'

RSpec.configure do |c|
  c.include RequestHelpers::SessionHelpers
end

RSpec.describe('Sessions Management', type: :request) do
  it 'signs up a new user' do
    sign_up
    expect(response.response_code).to eq(200)  
  end 
  
  it 'signs in an existing user' do
    sign_in
    expect(response.response_code).to eq(200)  
  end 
  
  it 'signs out a signed in user' do
    sign_out
    expect(response.response_code).to eq(200)  
  end 
  
  it 'unregisters a user having role of customer' do
    sign_in
    unregister_customer
    
    expect(response.response_code).to eq(200)
  end 
end
