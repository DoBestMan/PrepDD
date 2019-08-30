class List < ApplicationRecord
  belongs_to :requester, class_name: 'Company', foreign_key: 'requester_id'
  belongs_to :responder, class_name: 'Company', foreign_key: 'responder_id', optional: true
end
