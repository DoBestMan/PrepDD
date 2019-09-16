FactoryBot.define do
  factory :file_label do
    description { 'MyText' }
    file_label_color { 'MyString' }
    is_active { false }
    is_public { false }
  end
end
