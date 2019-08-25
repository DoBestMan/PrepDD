class Company < ApplicationRecord
  # Broker Companies
  has_many :child_broker, :class_name => 'BrokerCompany', :foreign_key => 'parent_broker_id'
  has_many :broker_children, :through => :child_broker, source: :child_broker

  has_many :parent_broker, :class_name => 'BrokerCompany', :foreign_key => 'child_broker_id'
  has_many :broker_parents, :through => :parent_broker, source: :parent_broker

  # Parent Companies
  has_many :company_child, :class_name => 'ParentCompany', :foreign_key => 'parent_company_id'
  has_many :company_chidlren, :through => :company_child, source: :child_company

  has_many :company_parent, :class_name => 'ParentCompany', :foreign_key => 'child_company_id'
  has_many :company_parents, :through => :company_parent, source: :parent_company

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
