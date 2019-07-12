class AddUuidToUsersForOmaniAuth < ActiveRecord::Migration[5.2]
  change_table :users do |t|
    t.string :uuid
  end
end
