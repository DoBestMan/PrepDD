class FileTask < ApplicationRecord
  belongs_to :task
  belongs_to :file_version
end
