class Company::CompanyKmsCreationWorker
  include Sidekiq::Worker

  def perform(company_id)
    require 'aws-sdk-kms'
    company = Company.find(company_id)

    if company && !company.kms_key_id
      client = Aws::KMS::Client.new
      kms =
        client.create_key(
          {
            tags: [{ tag_key: 'CompanyName', tag_value: company.name.downcase }]
          }
        )
    end

    if kms
      company.kms_key_id = kms.key_metadata.key_id
      company.kms_key = kms.key_metadata.arn
      company.save!
    end
  end
end
