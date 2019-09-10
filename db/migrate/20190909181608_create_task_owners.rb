class CreateTaskOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :task_owners do |t|
      t.belongs_to :task
      t.references :taskable, polymorphic: true

      t.timestamps
    end
  end
end
