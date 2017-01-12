module Api
  module V1
    class UsersController < ApplicationController
      def index
        render json: User.all
      end
      
      def asigneens
        render json: User.where.not(role: 'customer')
      end
    end
  end
end
