require 'rails_helper'

RSpec.describe "Hi", type: :request do
  describe "GET /hi" do
    context "when user is not logged in" do
      it "sends unauthorised" do
        get hi_path
        expect(response).to have_http_status(401)
      end
    end
    
    context "when user is logged in" do
      it "sends OK" do
        params2 = {
          "email": "shimpiatul@hotmail.com",
          "password": "admin1234"
        }
        #post user_session_path, params: {email: "shimpiatul@hotmail.com", password: "admin1234"}, headers: { "HTTP_ACCEPT" => "application/json", "CONTENT_TYPE" => "application/json" }
        post "/auth/sign_in", params2, headers: {'HTTP_ACCEPT': "application/json", "CONTENT_TYPE": "application/json"}
        puts "body " + response.body
        expect(response.response_code).to eq(200)
        
        #get hi_path
        #expect(response).to have_http_status(200)
      end
    end
  end
end
