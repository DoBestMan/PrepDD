class Company < ApplicationRecord

  belongs_to :parent, class_name: 'Company', optional: true

  belongs_to :broker, class_name: 'Company', optional: true, foreign_key:  'broker_co_id'
  has_many :children, class_name: 'Company', foreign_key: 'parent_id'

  belongs_to :owner, class_name: 'User', optional: true
  has_many :users_companies
  has_many :users, through: :users_companies
  belongs_to :subscription, optional: true
  has_many :teams
  has_many :roles_users
  has_many :roles, through: :roles_users

  has_one_attached :logo

  validates :name, presence: true
  validates :name, uniqueness: true

  before_create :generate_encryption_key
  after_create :create_s3_kms


  def create_s3_kms
    Company::CompanyS3BucketCreationWorker.perform_async(self.id)
    Company::CompanyKmsCreationWorker.perform_async(self.id)
  end

  def generate_encryption_key
    self.encryption_key = SecureRandom.urlsafe_base64(256)
  end
end
