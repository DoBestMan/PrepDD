require 'rails_helper'
module Types
  RSpec.describe CurrentUserType do
    set_graphql_type
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    it 'has an :id field of ID type' do
      # Ensure that the field id is of type String
      expect(subject.fields['id'].type.to_type_signature).to eq('String!')
    end

    it 'has a :user field of User type' do
      # Ensure the field is of User type
      expect(subject.fields['user'].type.to_type_signature).to eq('User')
    end
  end
end
