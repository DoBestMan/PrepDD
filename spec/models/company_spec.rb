require 'rails_helper'

RSpec.describe Company, type: :model do
  let!(:company) { create(:company) }

  describe Company, 'validations' do
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:name) }
  end

  describe '#callback' do
    # Company callback
    describe '#method' do
      it { is_expected.to callback(:create_s3).after(:create) }
      it { is_expected.to callback(:create_kms).after(:create) }
      it { is_expected.to callback(:generate_encryption_key).before(:create) }
    end
  end
end
