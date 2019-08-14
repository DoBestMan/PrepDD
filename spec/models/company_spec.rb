require 'rails_helper'

RSpec.describe Company, type: :model do
  let!(:company) { create(:company) }

  describe '#validations' do
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:name) }
  end

  describe '#associations' do
    it { should have_many :users }
    it { should belong_to :owner }
    it { should belong_to :subscription }
  end

  describe '#callback' do
    # Company callback
    describe '#method' do
      it { is_expected.to callback(:create_s3_kms).after(:create) }
      it { is_expected.to callback(:generate_encryption_key).before(:create) }
    end
  end
end
