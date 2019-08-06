class Company < ApplicationRecord

  belongs_to :parent, class_name: 'Company', optional: true
  has_many :children, class_name: 'Company', foreign_key: 'parent_id'
  belongs_to :owner, class_name: 'User', optional: true
  has_many :employees, class_name: 'User', dependent: :destroy
  belongs_to :subscription, optional: true

  validates :name, presence: true
  validates :name, uniqueness: true

  before_create :generate_encryption_key
  after_create :create_s3_kms

  def create_s3_kms
    CompanyS3BucketCreationWorker.perform_async(self.id)
  end

  def create_kms
    require 'aws-sdk-kms'

    begin
      client = Aws::KMS::Client.new
      kms = client.create_key({ tags: [ {
                                          tag_key: 'CompanyName', tag_value: self.name.downcase
                                        },],})
    rescue
      errors.add(:name, :blank, message: "Not Able to create KMS")
    end

    if kms
      self.kms_key_id = kms.key_metadata.key_id
      self.kms_key = kms.key_metadata.arn
      save!
    end
  end

  def generate_encryption_key
    self.encryption_key = SecureRandom.urlsafe_base64(256)
  end
end
