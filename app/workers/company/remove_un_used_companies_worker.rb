class Company::RemoveUnUsedCompaniesWorker
  include Sidekiq::Worker

  def perform
    companies = Company.where(owner_id: nil)
    companies.each do |company|
      if company.created_at < 1.day.ago
        company.destroy
      end
    end
  end
end
