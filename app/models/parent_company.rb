class ParentCompany < ApplicationRecord
  belongs_to :child_company, class_name: 'Company'
  belongs_to :parent_company, class_name: 'Company'
end
