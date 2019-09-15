class CreateFileBases < ActiveRecord::Migration[5.2]
  def change
    create_table :file_bases do |t|
      t.boolean :is_active
      t.boolean :is_template

      t.timestamps
    end
  end
end
