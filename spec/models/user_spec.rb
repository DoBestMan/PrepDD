require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#associations' do
    it { should have_many :owned_companies }
    it { should have_many :roles }
    it { should have_many :roles_users }
    it { should have_many :teams }
    it { should have_many :teams_users }
    it { should have_many :users_companies }
    it { should have_many :companies }
  end
end
