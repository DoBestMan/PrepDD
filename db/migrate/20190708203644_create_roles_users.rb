class CreateRolesUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :roles_users do |t|
      t.belongs_to :user
      t.belongs_to :role
      t.timestamps
    end
  end
end
