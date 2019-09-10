class CreateTaskOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :task_owners do |t|
      t.belongs_to :user
      t.belongs_to :task
      t.belongs_to :team

      t.timestamps
    end
  end
end
affan
ZGFVB66YTGB 0KP,O