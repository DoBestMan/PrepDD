class Company::RemoveUnUsedCompaniesWorker
  include Sidekiq::Worker

  def perform
    companies = Company.where(owner_id: nil)
    companies.each do |company|
      if company.created_at < 1.day.ago

        # Remove s3 bucket of company
        s3_client = Aws::S3::Client.new
        bucket_name = company.s3_location.gsub('/', '')
        s3_client.delete_bucket(bucket: bucket_name)

        # Remove KMS key of company
        
        company.destroy
      end
    end
  end
end
