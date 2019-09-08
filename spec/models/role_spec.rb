require 'rails_helper'

RSpec.describe Role, type: :model do
  context 'associations' do
    it { should have_many(:roles_users) }
    it { should have_many(:users).through(:roles_users) }
  end

  describe '#method' do
    let!(:admin_role) { create(:role, name: 'Admin') }
    let!(:super_admin_role) { create(:role, name: 'Super Admin') }

    describe '#customize_title' do
      it do
        admin_role.customize_title
        expect(admin_role.name).to eql 'Admin'
      end

      it do
        admin_role.customize_title
        expect(super_admin_role.name).to eql 'SuperAdmin'
      end
    end

    describe '#self.add(name)' do
      context 'when role.name is exists' do
        it do
          Role.add('Admin')
          expect(Role.count).to eql 2
        end
      end

      context 'when role.name is not exists' do
        it do
          Role.add('User')
          expect(Role.count).to eql 3
        end
      end

      context 'when role.name is nil' do
        it { expect { Role.add(nil) }.to raise_error ArgumentError }
      end
    end

    describe '#self.delete(name)' do
      let!(:owner) { create(:role, name: 'owner') }

      context 'when role.name not exists' do
        it do
          Role.delete('NotExits')
          expect(Role.count).to eql 3
        end
      end

      context 'when role.name is nil' do
        it do
          Role.delete(nil)
          expect(Role.count).to eql 3
        end
      end
    end
  end
end
