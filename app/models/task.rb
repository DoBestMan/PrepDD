class Task < ApplicationRecord
  enum priority: { low: 0, medium: 1, high: 2 }
  enum status: { backlog: 0, pending: 1, inProgress: 2, completed: 4 }
  belongs_to :list
end
