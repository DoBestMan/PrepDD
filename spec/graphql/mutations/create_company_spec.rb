require 'rails_helper'
module Mutations
  RSpec.describe CreateCompany, type: :request do
    describe 'resolve' do
      it 'Create new company' do
        company = create(:company)
        expect do
          res =  post '/graphql', params: { query: query(name: company.name) }
          to change { Company.count }.by(1)
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
  end
end