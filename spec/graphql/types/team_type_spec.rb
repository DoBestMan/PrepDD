require 'rails_helper'
module Types
  RSpec.describe TeamType do
    set_graphql_type
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    it 'has an :id field of ID type' do
      # Ensure that the field id is of type ID
      expect(subject.fields['id'].type.to_type_signature).to eq('ID!')
    end

    it 'has an :companyId field of ID type' do
      # Ensure that the field id is of type ID
      expect(subject.fields['companyId'].type.to_type_signature).to eq('ID!')
    end

    it 'has a :name field of String type' do
      # Ensure the field is of String type
      expect(subject.fields['name'].type.to_type_signature).to eq('String!')
    end

    it 'has :users field of User type' do
      # Ensure the field is of User type
      expect(subject.fields['users'].type.to_type_signature).to eq('[User!]!')
    end

    it 'has :company field of Company type' do
      # Ensure the field is of Company type
      expect(subject.fields['company'].type.to_type_signature).to eq('Company!')
    end
  end
end
