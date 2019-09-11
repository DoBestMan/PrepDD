class CreateTaskMessageAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :task_message_alerts do |t|
      t.belongs_to :task_message
      t.belongs_to :user
      t.boolean :is_read, default: false 

      t.timestamps
    end
  end
end
