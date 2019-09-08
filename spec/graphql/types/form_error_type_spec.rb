require 'rails_helper'
module Types
  RSpec.describe FormErrorType do
    set_graphql_type
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    it 'has an :message field of String type' do
      # Ensure that the field id is of type String
      expect(subject.fields['message'].type.to_type_signature).to eq('String!')
    end

    it 'has a :path field of String type' do
      # Ensure the field is of String type
      expect(subject.fields['path'].type.to_type_signature).to eq('String')
    end
  end
end
