require 'rails_helper'

RSpec.describe PingController, type: :controller do

  describe "GET #index" do
    it "Tells if application server is running or not" do
      get :index
      expect(response).to have_http_status(200)
    end
  end

end
