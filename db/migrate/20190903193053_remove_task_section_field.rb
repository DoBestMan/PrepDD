class RemoveTaskSectionField < ActiveRecord::Migration[5.2]
  def change
    remove_column :tasks, :section, :string
  end
end
