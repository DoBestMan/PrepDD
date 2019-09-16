FactoryBot.define do
  factory :file_message do
    user_id { 1 }
    file_version_id { 1 }
    message { 'MyText' }
    is_public { false }
  end
end
