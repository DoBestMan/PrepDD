class AddFullNameToUser < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.string :full_name, null: false, default: ''
      t.string :display_name, null: false, default: ''
      t.remove :first_name
      t.remove :last_name
    end
  end
end
