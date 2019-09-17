class Company::CompanyS3BucketCreationWorker
  include Sidekiq::Worker

  def perform(company_id)
    require 'aws-sdk-s3'

    company = Company.find(company_id)
    if company && !company.s3_location
      s3 = Aws::S3::Client.new
      bucket = s3.create_bucket(bucket: company.name.downcase + "-prepdd-" + Rails.env)

      if bucket
        company.s3_location = bucket.location
        company.save!
      end
    end
  end
end
