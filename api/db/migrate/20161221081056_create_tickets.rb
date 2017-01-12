class CreateTickets < ActiveRecord::Migration[5.0]
  def change
    create_table :tickets do |t|
      t.belongs_to :owner, class_name: "User", foreign_key: "owner_id"
      t.belongs_to :assignee, class_name: "User", foreign_key: "assignee_id"
      t.belongs_to :ticket_type, index: true
      t.string :description
      t.integer :status, default: 0
      t.timestamps
    end
  end
end


