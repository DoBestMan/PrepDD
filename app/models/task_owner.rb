class TaskOwner < ApplicationRecord
  belongs_to :task_ownerable, polymorphic: true
  belongs_to :task
end
