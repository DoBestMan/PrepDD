class TaskOwner < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :team, optional: true
  belongs_to :task
end
