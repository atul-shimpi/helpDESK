class CreateTicketTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :ticket_types do |t|
      t.string :type_of_ticket
      t.timestamps
    end
  end
end
