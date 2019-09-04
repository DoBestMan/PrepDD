class Task < ApplicationRecord
  enum priority: { low: 0, medium: 1, high: 2 }
  enum status: { backlog: 0, pending: 1, inProgress: 2, completed: 4 }
  belongs_to :list
  belongs_to :task_section, optional: true

  def self.import(file)
    require 'roo'

    spreadsheet = Roo::Spreadsheet.open(file.path)
    header = spreadsheet.row(1).map(&:downcase!)

    tasks  = (2..spreadsheet.last_row).each_with_object({}) do |i, tasks|
      row = Hash[[header, spreadsheet.row(i)].transpose]
      row['name'] = row.delete('task')

      priority = row["priority"]&.downcase!

      if priority

        case priority[0]
        when 'h'
          row["priority"] = 'high'
        when 'm'
          row["priority"] = 'medium'
        when 'l'
          row["priority"] = 'low'
        else
          row["priority"] = 'medium'
        end

      end
      tasks[i-1] = row
    end
    tasks
  end
end
