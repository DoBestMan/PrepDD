class TaskMessage < ApplicationRecord
  belongs_to :user
  belongs_to :task
  # a task message only belongs to a company if it's 'internal'
  belongs_to :company, optional: true
end
