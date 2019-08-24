class BrokerCompany < ApplicationRecord
  belongs_to :child_broker, class_name: 'Company'
  belongs_to :parent_broker, class_name: 'Company'
end
