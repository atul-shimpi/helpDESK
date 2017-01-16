module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: [:show, :update, :destroy]
      
      def roles
        roles = [
                  {:id => "admin", :role => "Admin"},
                  {:id => "engineer", :role => "Engineer"},
                  {:id => "customer", :role => "Customer"}
                ]
   
        render json: roles
      end
      
      def index
        render json: User.all
      end
      
      def asigneens
        render json: User.where.not(role: 'customer')
      end
      
      # POST /users
      def create      
        params_ = user_params
      
        @user = User.new(params_)
        
        if @user.save
          render json: @user, status: :created, location: api_v1_users_url(@ticket)
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end
      
      def show
        render json: @user
      end
      
      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end
      
      def destroy
        @user.destroy
      end
      
      private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.fetch(:user, {})
          .permit(
            :email,
            :password,
            :password_confirmation,
            :name,
            :role
          )
      end  
      
    end
  end
end
