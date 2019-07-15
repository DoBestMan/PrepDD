class AddBioAndNotificationFieldsToUser < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.belongs_to :notification
      t.integer :notification_scope
      t.integer :notification_frequency
      t.datetime :notification_time
      t.datetime :notification_day
      t.integer :active_state_id
      t.string :user_token
      t.string :bio
    end
  end
end
