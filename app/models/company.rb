class Company < ApplicationRecord
  belongs_to :parent, :class_name => 'Company', optional: true
  has_many :children, :class_name => 'Company', :foreign_key => 'parent_id'

  before_create :generate_encryption_key

  def generate_encryption_key
    self.encryption_key = SecureRandom.urlsafe_base64(256)
  end
end
