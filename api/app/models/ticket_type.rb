class TicketType < ApplicationRecord
  validates :type_of_ticket, presence: true
end
