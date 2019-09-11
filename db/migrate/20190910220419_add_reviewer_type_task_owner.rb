class AddReviewerTypeTaskOwner < ActiveRecord::Migration[5.2]
  def change
    change_table :task_owners do |t|
      t.string :owner_type
    end
  end
end
