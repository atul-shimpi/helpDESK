class AddCommentToTickets < ActiveRecord::Migration[5.0]
  def change
    add_column :tickets, :comment, :string
  end
end
