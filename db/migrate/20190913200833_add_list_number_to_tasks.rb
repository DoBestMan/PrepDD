class AddListNumberToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :list_number, :bigint
  end
end
