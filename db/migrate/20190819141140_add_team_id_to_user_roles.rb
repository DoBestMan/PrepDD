class AddTeamIdToUserRoles < ActiveRecord::Migration[5.2]
  def change
    change_table :roles_users do |t|
      t.belongs_to :company
    end
  end
end
