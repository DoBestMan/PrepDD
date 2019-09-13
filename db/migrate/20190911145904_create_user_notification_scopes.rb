class CreateUserNotificationScopes < ActiveRecord::Migration[5.2]
  def change
    create_table :user_notification_scopes do |t|
      t.string :description
      t.timestamps
    end
  end
end
