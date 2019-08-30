require 'rails_helper'

module Mutations

  RSpec.describe UpdateCompanySettings, type: :request do
    describe '.resolve' do
      it 'update a company details' do
        company = create(:company)
        expect do
          post '/graphql', params: { query: query(name: company.name) }
          post '/graphql', params: { query: query_update_company(id: company.id, name: 'PrepDD-Test') }
          it { expect(Company.first.full_name).to eq 'PrepDD-Test' }
        end
      end
    end

    def query(name:)
      <<~GQL
       mutation{
    CreateCompany(
      name: #{name}, 
    ) {
      errors {
        path
        message
      }
      success
    }
  }
      GQL
    end

    def query_update_company(id:, name:)
      <<~GQL
       mutation{
      updateCompany(
      id: #{id}, 
      name: #{name}
    ) {
      errors {
        path
        message
      }
      success
    }
  }
      GQL
    end

  end
end
