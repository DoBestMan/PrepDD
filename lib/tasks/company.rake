namespace :company do
  desc 'Remove Unused Companies'
  task remove_un_used_companies: :environment do
    Company::RemoveUnUsedCompaniesWorker.perform_async
  end
end
