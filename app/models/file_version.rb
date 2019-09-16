class FileVersion < ApplicationRecord
  has_many :file_version_tasks
  has_many :tasks, through: :file_version_tasks
  has_one_attached :file
end
