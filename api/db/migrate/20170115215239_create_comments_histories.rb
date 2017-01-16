class CreateCommentsHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :comments_histories do |t|
      t.belongs_to :ticket, index: true
      t.belongs_to :user, index: true      
      t.string :comment
      t.timestamps
    end
  end
end
