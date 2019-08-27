class Company::RemoveUnUsedCompaniesWorker
  include Sidekiq::Worker

  def perform
    Company.where(owner_id: nil).each do |company|
      if company.created_at < 1.day.ago
        begin
          # Remove s3 bucket of company
          if company.s3_location?
            s3_client = Aws::S3::Client.new
            bucket_name = company.s3_location.gsub('/', '')
            s3_client.delete_bucket(bucket: bucket_name)
          end

          # Remove KMS key of company
          if company.kms_key_id?
            client = Aws::KMS::Client.new
            key_id = company.kms_key_id
            resp =
              client.schedule_key_deletion(
                { key_id: key_id, pending_window_in_days: 7 }
              )
          end
        rescue StandardError

        end

        company.destroy
      end
    end
  end
end
