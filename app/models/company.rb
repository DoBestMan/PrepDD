class Company < ApplicationRecord
  belongs_to :parent, class_name: 'Company', optional: true
  has_many :children, class_name: 'Company', foreign_key: 'parent_id'
  belongs_to :owner, class_name: 'User'
  has_many :employees, class_name: 'User', dependent: :destroy

  validates :name, presence: true
  validates :parent_id, presence: true

  before_create :generate_encryption_key

  def generate_encryption_key
    self.encryption_key = SecureRandom.urlsafe_base64(256)
  end
end
