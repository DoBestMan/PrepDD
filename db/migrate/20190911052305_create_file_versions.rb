class CreateFileVersions < ActiveRecord::Migration[5.2]
  def change
    create_table :file_versions do |t|
      t.integer :file_id
      t.integer :file_owner_id
      t.integer :version
      t.string :file_name
      t.string :file_extension
      t.string :file_location

      t.timestamps
    end
  end
end
