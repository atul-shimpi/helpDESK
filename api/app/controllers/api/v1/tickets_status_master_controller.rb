module Api
  module V1
    class TicketsStatusMasterController < ApplicationController
      def index
        status_mst = []
        
        status_mst.unshift({id: 0, status: 'Created'})
        status_mst.unshift({id: 1, status: 'In Progress'})
        status_mst.unshift({id: 2, status: 'On hold'})
        status_mst.unshift({id: 3, status: 'Closed'})
        status_mst.unshift({id: 4, status: 'Cancelled'})
               
        render json: status_mst
      end
    end
  end
end
