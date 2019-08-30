class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.integer :priority, default: 0
      t.integer :status, default: 0
      t.datetime :due_date
      t.boolean :is_active
      t.belongs_to :list

      t.timestamps
    end
  end
end
