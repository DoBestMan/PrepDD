class CreateFileTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :file_tasks do |t|

      t.bigint :file_version_id
      t.biging :task_id

      t.timestamps
    end
  end
end
