class AddSectionFieldInTask < ActiveRecord::Migration[5.2]
  def change
    change_table :tasks do |t|
      t.string :section
    end
  end
end
