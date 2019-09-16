class Team < ApplicationRecord
  has_many :teams_users
  has_many :users, through: :teams_users
  belongs_to :company

  has_many :lists_users
  has_many :lists, through: :lists_users

  has_many :task_owners, as: :task_ownerable
  has_many :owned_team_tasks,
           class_name: 'Task',
           through: :task_owners,
           source: :task_ownerable,
           source_type: 'Team'
end
