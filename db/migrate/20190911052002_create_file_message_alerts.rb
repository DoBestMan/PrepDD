class CreateFileMessageAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :file_message_alerts do |t|
      t.integer :file_message_id
      t.integer :user_id
      t.boolean :is_read

      t.timestamps
    end
  end
end
