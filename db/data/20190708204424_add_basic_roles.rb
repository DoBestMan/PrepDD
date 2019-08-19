class AddBasicRoles < ActiveRecord::Migration[5.2]
  def up
    Role.add('SuperAdmin')
    Role.add('Admin')
    Role.add('Owner')
    Role.add('Manager')
    Role.add('User')
  end

  def down
    Role.delete_all
  end
end
