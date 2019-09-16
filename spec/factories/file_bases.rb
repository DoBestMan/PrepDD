FactoryBot.define do
  factory :file_basis, class: 'FileBase' do
    is_active { false }
    is_template { false }
  end
end
