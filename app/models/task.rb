class Task < ApplicationRecord
  enum priority: { low: 0, medium: 1, high: 2 }
  enum status: { Unstarted: 0, Started: 1, Finished: 2, Delivered: 4, Accepted: 5, Rejected: 6 }
  belongs_to :list
  belongs_to :task_section, optional: true
  has_many :task_owner
  has_many :owners, through: :task_owner, source: :task

  has_many :task_messages

  def self.import(files)
    require 'roo'

    tasks = {}
    files.each_with_index do |file, index|
      spreadsheet = Roo::Spreadsheet.open(file.path)
      header = spreadsheet.row(1).map(&:downcase!)

      tasks_data =
        (2..spreadsheet.last_row).each_with_object({}) do |i, tasks|
          row = Hash[[header, spreadsheet.row(i)].transpose]
          row['name'] = row.delete('task')

          priority = row['priority']&.downcase!

          if priority
            case priority[0]
            when 'h'
              row['priority'] = 'high'
            when 'm'
              row['priority'] = 'medium'
            when 'l'
              row['priority'] = 'low'
            else
              row['priority'] = 'medium'
            end
          end
          tasks[i - 1] = row
        end
      tasks[index + 1] = tasks_data
    end
    tasks
  end
end
