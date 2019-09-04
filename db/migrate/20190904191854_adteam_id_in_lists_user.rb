class AdteamIdInListsUser < ActiveRecord::Migration[5.2]
  def change
    change_table :lists_users do |t|
      t.belongs_to :team
    end
  end
end
