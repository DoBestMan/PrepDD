class Company < ApplicationRecord
  belongs_to :parent, :class_name => 'Company', optional: true
  has_many :children, :class_name => 'Company', :foreign_key => 'parent_id'

  after_create :generate_encryption_key

  def generate_encryption_key
    self.encryption_key = SecureRandom.random_bytes(32)
  end
end
