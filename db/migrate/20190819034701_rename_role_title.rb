class RenameRoleTitle < ActiveRecord::Migration[5.2]
  def change
    rename_column :roles, :title, :name
  end
end
