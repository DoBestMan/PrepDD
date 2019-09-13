class CreateTaskMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :task_messages do |t|
      t.belongs_to :user
      t.belongs_to :task
      t.text :message

      t.timestamps
    end
  end
end
