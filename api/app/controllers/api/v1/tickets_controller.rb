require 'tickets_pdf'

module Api
  module V1
    class TicketsController < ApplicationController
      before_action :set_ticket, only: [:show, :update, :destroy]
      after_action :createCommentHistory, only: [:create, :update]

      # GET /tickets
      def index
        respond_to do |format|
          format.json { 
            render :json => find_tickets,
            :except => exclude_self_attrs,
            include: include_asso_attrs 
          }
            
          format.pdf { 
            pdf = TicketsPdf.new(find_tickets, 'helpDESK')
            send_data pdf.render.force_encoding('BINARY'), filename: 'report.pdf', type: 'application/pdf', :disposition => "inline"
          }
        end        
      end

      # GET /tickets/1
      def show
        render json: @ticket, :except => exclude_self_attrs, include: include_asso_attrs 
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
        def exclude_self_attrs
          [:owner_id, :assignee_id, :ticket_type_id, :status]
        end
        
        def include_asso_attrs
          include_asso_attrs = [ { :comments_history => {:only => [:created_at, :comment], :include => {:user => {:only => :name}} }},
                               { :ticket_type => {:only => [:id, :type_of_ticket]} },
                               { :owner => {:only => [:id, :name]} },
                               { :assignee => {:only => [:id, :name]} } ] 
        end
        
        def createCommentHistory  
          return if !@ticket.comment  
          return if @ticket.comment.empty?
    
          CommentsHistory.create(ticket_id: @ticket.id, user_id: current_user.id, comment: @ticket.comment)
        end
        
        # return tickets accoding to logged in user and filter passed
        def find_tickets
          # get all 
          tickets = Ticket.all
          
          # Get tickets created by logged in user or assigned to him if he is not admin
          if not current_user.admin?
            tickets = tickets.where("owner_id = ? or assignee_id = ?", current_user.id, current_user.id)  
          end
          
          # if duration is given then filer by duration, example  1months
          if (params.has_key?(:duration))
            duration_value = params[:duration].scan(/\d+/).first.to_i
            duration_unit = params[:duration].gsub(/[^a-zA-Z]/, '')
            
            tickets = tickets.where("updated_at >= ?", Date.today - duration_value.send(duration_unit))  
          end  
          
          # if status is given filter by status
          if (params.has_key?(:status))
            tickets = tickets.where(status: params[:status])  
          end
          
          tickets    
        end
        
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
              :comment,
              :duration,
              :unit
            )
        end
    end
  end
end
