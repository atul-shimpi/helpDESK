module Api
  module V1
    class TicketsController < ApplicationController
      before_action :set_ticket, only: [:show, :update, :destroy]

      # GET /tickets
      def index
        exclude_self_attrs = [:owner_id, :assignee_id, :ticket_type_id, :status]
        include_asso_attrs = [ { :ticket_type => {:only => [:id, :type_of_ticket]} },
                               { :owner => {:only => [:id, :name]} },
                               { :assignee => {:only => [:id, :name]} } ]
        
        tickets = current_user.admin? ? Ticket.all : Ticket.where(owner_id: current_user.id)        
        render :json => tickets, :except => exclude_self_attrs, include: include_asso_attrs
      end

      # GET /tickets/1
      def show
        render json: @ticket
      end

      # POST /tickets
      def create
        params_ = ticket_params
        params_[:owner_id] = current_user.id
        @ticket = Ticket.new(params_)
        
        if @ticket.save
          render json: @ticket, status: :created, location: api_v1_ticket_url(@ticket)
        else
          render json: @ticket.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /tickets/1
      def update
        if @ticket.update(ticket_params)
          render json: @ticket
        else
          render json: @ticket.errors, status: :unprocessable_entity
        end
      end

      # DELETE /tickets/1
      def destroy
        @ticket.destroy
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_ticket
          @ticket = Ticket.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def ticket_params
          params.fetch(:ticket, {})
            .permit(
              :assignee_id,
              :ticket_type_id,
              :description,
              :status,
              :comment
            )
        end
    end
  end
end
