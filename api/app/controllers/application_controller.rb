class ApplicationController < ActionController::API  
  include ActionController::MimeResponds
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, if: :devise_controller?, :only => [:sign_up]
   
  def send_response(body, status_code = 200)
    render :status => status_code, :json => {data: body}
  end   

  protected
  def configure_permitted_parameters
    keys = { keys: [:name, :email, :password, :role] }
    devise_parameter_sanitizer.permit(:sign_up, keys)
    devise_parameter_sanitizer.permit(:account_update, keys)
  end
end
