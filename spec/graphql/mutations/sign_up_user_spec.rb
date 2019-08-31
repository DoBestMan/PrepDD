require 'rails_helper'

module Mutations
  RSpec.describe SignUpUser, type: :request do
    describe 'resolve' do
      it 'Sign up user' do
        user = create(:user)
        expect do
          res =  post '/graphql', params: { query: query(email: user.email, name: user.full_name) }
          to change { User.count }.by(1)
        end
      end
    end

    def query(email:, name:)
      <<~GQL
       mutation{
    signUpUser(
      email: #{email}, 
      fullName: #{name}
    ) {
      user {
        email
      }
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
