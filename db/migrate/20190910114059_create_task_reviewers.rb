class CreateTaskReviewers < ActiveRecord::Migration[5.2]
  def change
    create_table :task_reviewers do |t|
      t.belongs_to :user
      t.belongs_to :task

      t.timestamps
    end
  end
end
