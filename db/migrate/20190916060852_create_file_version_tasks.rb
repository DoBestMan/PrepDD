class CreateFileVersionTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :file_version_tasks do |t|
      t.bigint :file_version_id
      t.bigint :task_id
    end
  end
end
