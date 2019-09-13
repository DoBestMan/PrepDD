class AddIsPublicToTask < ActiveRecord::Migration[5.2]
  def change
    change_table :task_messages do |t|
      t.boolean :is_public, default: false
    end
  end
end
