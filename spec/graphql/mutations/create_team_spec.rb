require 'rails_helper'
module Mutations
  RSpec.describe CreateTeam, type: :request do
    describe 'resolve' do
      it 'Create new Team' do
        company = create(:company)
        team = create(:team)
        expect do
          res =  post '/graphql', params: { query: query_create_company(name: company.name) }
          res =  post '/graphql', params: { query: query(company_id: company.id, name: team.name) }
          to change { Team.count }.by(1)
        it { expect Team.first.name.eql? team.name  }
        it { expect Team.first.company_id.eql? company.id }
        end
      end

    end

    def query(company_id:, name:)
      <<~GQL
       mutation{
    CreateTeam(
      name: #{name}, 
      company_id: #{company_id}
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

    def query_create_company(name:)
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
