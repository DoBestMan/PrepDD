require 'rails_helper'
module Types
  RSpec.describe CompanyType do
    set_graphql_type
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    it 'has an :id field of ID type' do
      # Ensure that the field id is of type ID
      expect(subject.fields['id'].type.to_type_signature).to eq('ID!')
    end

    it 'has a :name field of String type' do
      # Ensure the field is of String type
      expect(subject.fields['name'].type.to_type_signature).to eq('String!')
    end

    it 'has a :is_active field of Boolean type' do
      # Ensure the field is of Boolean type
      expect(subject.fields['isActive'].type.to_type_signature).to eq('Boolean')
    end

    it 'has a :autoPdf field of Boolean type' do
      # Ensure the field is of Boolean type
      expect(subject.fields['autoPdf'].type.to_type_signature).to eq('Boolean')
    end

    it 'has a :autoWatermark field of Boolean type' do
      # Ensure the field is of Boolean type
      expect(subject.fields['autoWatermark'].type.to_type_signature).to eq(
        'Boolean'
      )
    end

    it 'has a :previewOnly field of Boolean type' do
      # Ensure the field is of Boolean type
      expect(subject.fields['previewOnly'].type.to_type_signature).to eq(
        'Boolean'
      )
    end

    it 'has a :subscription field of Subscription type' do
      # Ensure the field is of subscription type
      expect(subject.fields['subscription'].type.to_type_signature).to eq(
        'Subscription'
      )
    end

    it 'has a :totalUsers field of Int type' do
      # Ensure the field is of Int type
      expect(subject.fields['totalUsers'].type.to_type_signature).to eq('Int')
    end

    it 'has a :totalStorage field of Integer type' do
      # Ensure the field is of Int type
      expect(subject.fields['totalStorage'].type.to_type_signature).to eq('Int')
    end

    it 'has :parents field of Company type' do
      # Ensure the field is of Company type
      expect(subject.fields['parents'].type.to_type_signature).to eq(
        '[Company!]'
      )
    end

    it 'has :brokers field of Company type' do
      # Ensure the field is of Company type
      expect(subject.fields['brokers'].type.to_type_signature).to eq(
        '[Company!]'
      )
    end

    it 'has :users field of User type' do
      # Ensure the field is of User type
      expect(subject.fields['users'].type.to_type_signature).to eq('[User!]!')
    end

    it 'has :teams field of Team type' do
      # Ensure the field is of Team type
      expect(subject.fields['teams'].type.to_type_signature).to eq('[Team!]!')
    end

    it 'has :logoUrl field of String type' do
      # Ensure the field is of String type
      expect(subject.fields['logoUrl'].type.to_type_signature).to eq('String')
    end
  end
end
