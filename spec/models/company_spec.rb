require 'rails_helper'

RSpec.describe Company, type: :model do
  describe Company, 'validations' do
    it { should validate_uniqueness_of(:name) }
    it { should validate_presence_of(:name) }
  end
end
