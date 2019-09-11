class CreateFileLabels < ActiveRecord::Migration[5.2]
  def change
    create_table :file_labels do |t|
      t.text :description
      t.string :file_label_color
      t.boolean :is_active
      t.boolean :is_public

      t.timestamps
    end
  end
end
