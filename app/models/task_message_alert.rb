class TaskMessageAlert < ApplicationRecord
  belongs_to :task_message
  belongs_to :user
end
