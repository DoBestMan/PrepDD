class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :name
      t.string :description
      t.boolean :is_active, default: true
      t.boolean :is_template
      t.boolean :is_public_template
      t.belongs_to :requester
      t.belongs_to :responder

      t.timestamps
    end
  end
end
