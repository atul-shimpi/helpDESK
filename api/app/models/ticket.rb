class Ticket < ApplicationRecord
  belongs_to :ticket_type
  belongs_to :owner, class_name: 'User', foreign_key: 'owner_id'
  belongs_to :assignee, class_name: 'User', foreign_key: 'assignee_id'
  has_many :comments_history
  
  enum status: [:created, :in_progress, :on_hold, :closed, :cancelled]
  
  def status_
    status.humanize
  end
  
  def closed_at
    status == 'closed' ? updated_at : ''
  end
  
  def attributes
    super.merge('status_' => self.status_, 'closed_at' => self.closed_at)
  end
end
