class AddUuidToUsersForOmaniAuth < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.string :uuid
      t.string :token_id
      t.string :social_login_provider
    end
  end
end
