class AddRakOnList < ActiveRecord::Migration[5.2]
  def change
    change_table :lists do |t|
      t.integer :requester_rank
      t.integer :responder_rank
    end
  end
end
