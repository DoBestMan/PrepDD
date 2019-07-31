class Company < ApplicationRecord

  belongs_to :parent, class_name: 'Company', optional: true
  has_many :children, class_name: 'Company', foreign_key: 'parent_id'
  belongs_to :owner, class_name: 'User'
  has_many :employees, class_name: 'User', dependent: :destroy
  belongs_to :subscription, optional: true

  validates :name, presence: true

  before_create :generate_encryption_key
  after_create :create_s3, :create_kms

  def create_s3
    require 'aws-sdk-s3'

    begin
      s3 = Aws::S3::Client.new(region: 'us-west-2')
      bucket = s3.create_bucket(bucket: "prepdd-#{self.name.downcase}")
    rescue
      errors.add(:name, :blank, message: "Not Able to create s3 bucket")
    end

    if bucket
      self.s3_location = bucket.location
      save!
    end
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
