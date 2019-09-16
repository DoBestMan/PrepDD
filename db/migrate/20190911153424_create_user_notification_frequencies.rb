class CreateUserNotificationFrequencies < ActiveRecord::Migration[5.2]
  def change
    create_table :user_notification_frequencies do |t|
      t.string :description
      t.timestamps
    end
  end
end
