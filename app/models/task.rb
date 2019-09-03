class Task < ApplicationRecord
  enum priority: { low: 0, medium: 1, high: 2 }
  enum status: { backlog: 0, pending: 1, inProgress: 2, completed: 4 }
  belongs_to :list
  belongs_to :task_section, optional: true

  def self.import(file, list_id)
    require 'roo'

    list = List.find(list_id)
    spreadsheet = Roo::Spreadsheet.open(file.path)
    header = spreadsheet.row(1).map(&:downcase!)
    (2..spreadsheet.last_row).each do |i|
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

      list.tasks.create(row.to_hash)
    end
  end
end
