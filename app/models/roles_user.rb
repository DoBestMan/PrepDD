class RolesUser < ApplicationRecord
  belongs_to :role
  belongs_to :user
  belongs_to :company
end
