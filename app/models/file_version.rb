class FileVersion < ApplicationRecord
  has_many :file_tasks
  has_many :tasks, through: :file_tasks
end
