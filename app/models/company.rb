class Company < ApplicationRecord
  belongs_to :parent, :class_name => 'Company'
  has_many :children, :class_name => 'Company', :foreign_key => 'parent_id'
end
