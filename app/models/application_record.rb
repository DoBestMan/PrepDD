class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def last_updated_at
    diff = Time.now - self.updated_at
    case diff
    when 0..60
      return "just now"
    when 61..3600
      diff = (diff / 60).to_i
      unit = 'minute'.pluralize diff
    when 3601..(3600 * 24)
      diff = (diff / 3600).to_i
      unit = 'hour'.pluralize diff
    else 
      diff = (diff / 3600 * 24).to_i
      unit = 'day'.pluralize diff
    end
    "#{diff} #{unit} ago"
  end

end
