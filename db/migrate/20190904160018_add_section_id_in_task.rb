class AddSectionIdInTask < ActiveRecord::Migration[5.2]
  def change
    change_table :tasks do |t|
      t.belongs_to :task_section
    end
  end
end
