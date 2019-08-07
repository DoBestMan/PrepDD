class AddBasicRoles < ActiveRecord::Migration[5.2]
  def up
    Role.add('Guest')
    Role.add('NormalUser')
    Role.add('Admin')
    Role.add('SuperAdmin')
  end

  def down
    Role.delete_all
  end
end
