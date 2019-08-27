class RolesUser < ApplicationRecord
  belongs_to :role
  belongs_to :user
  belongs_to :company

  validates :user_id,
            uniqueness: {
              scope: :company_id, message: 'should have one role per company'
            }
end
