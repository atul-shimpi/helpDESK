module Api
  module V1
    class TicketTypesController < ApplicationController
      before_action :set_ticket_type, only: [:show, :update, :destroy]
      
      def index
        render json: TicketType.all
      end
      
      def create      
        params_ = ticket_type_params
      
        @ticket_type = TicketType.new(params_)
        
        if @ticket_type.save
          render json: @ticket_type, status: :created, location: api_v1_ticket_url(@ticket_type)
        else
          render json: @ticket_type.errors, status: :unprocessable_entity
        end
      end      
      
      def show
        render json: @ticket_type
      end
      
      def update
        if @ticket_type.update(ticket_type_params)
          render json: @ticket_type
        else
          render json: @ticket_type.errors, status: :unprocessable_entity
        end
      end
      
      def destroy
        @ticket_type.destroy
      end
      
      private
      # Use callbacks to share common setup or constraints between actions.
      def set_ticket_type
        @ticket_type = TicketType.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def ticket_type_params
        params.fetch(:ticket_type, {})
          .permit(
            :type_of_ticket
          )
      end      
      
    end
  end
end