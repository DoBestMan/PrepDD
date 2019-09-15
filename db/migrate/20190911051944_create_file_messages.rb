class CreateFileMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :file_messages do |t|
      t.integer :user_id
      t.integer :file_version_id
      t.text :message
      t.boolean :is_public

      t.timestamps
    end
  end
end
