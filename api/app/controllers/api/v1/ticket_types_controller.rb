module Api
  module V1
    class TicketTypesController < ApplicationController
      def index
        render json: TicketType.all
      end
    end
  end
end