require 'rails_helper'

module Mutations

  RSpec.describe UpdateUserData, type: :request do
    describe '.resolve' do
      it 'updates a user details' do
        user = create(:user)

        expect do
          post '/graphql', params: { query: query(email: user.email, name: user.full_name) }
          post '/graphql', params: { query: query_update_user(name: 'Aijaz Khan') }
          it { expect(User.first.full_name).to eq 'Aijaz Khan' }
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

    def query_update_user(name:)
      <<~GQL
       mutation{
    updateUserData(
      fullName: #{name}
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
