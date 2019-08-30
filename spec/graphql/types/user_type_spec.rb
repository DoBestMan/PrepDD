require 'rails_helper'
module Types
  RSpec.describe UserType do
    set_graphql_type
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    it 'has an :id field of ID type' do
      # Ensure that the field id is of type ID
      expect(subject.fields["id"].type.to_type_signature).to eq("ID!")
    end

    it 'has a :fullName field of String type' do
      # Ensure the field is of String type
      expect(subject.fields["fullName"].type.to_type_signature).to eq("String!")
    end

    it 'has a :email field of String type' do
      # Ensure the field is of String type
      expect(subject.fields["email"].type.to_type_signature).to eq("String!")
    end

    it 'has a :displayName field of String type' do
      # Ensure the field is of String type
      expect(subject.fields["displayName"].type.to_type_signature).to eq("String")
      end

    it 'has a :displayName field of String type' do
      # Ensure the field is of String type
      expect(subject.fields["companies"].type.to_type_signature).to eq("[Company!]")
    end
  end
end