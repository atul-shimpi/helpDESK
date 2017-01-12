class HiController < ApplicationController     
  def index        
    send_response('Valid User' + current_user.name)        
  end
end
  
