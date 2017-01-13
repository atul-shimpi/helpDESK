require 'pdf_base'

class TicketsPdf < PDFBase
  def initialize(tickets, app_name)
    super()

    @tickets = tickets

    header(app_name)
    title('Tickets')
    body(rows)
  end

  def rows
    [[ 'Id', 'Created On', 'Creator', 'Category', 'Description',
        'Assigned To', 'Status', 'Closed On', 'Comment']] +
        @tickets.map do |ticket|
          [ ticket.id,
            ticket.created_at.strftime("%b-%d-%Y"),
            ticket.owner.name,
            ticket.ticket_type.type_of_ticket,
            ticket.description,
            ticket.assignee.name,
            ticket.status_,
            ticket.closed_at == "" ? ticket.closed_at : ticket.closed_at.strftime("%b-%d-%Y"),
            ticket.comment ]
        end
  end
end
