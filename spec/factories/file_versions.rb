FactoryBot.define do
  factory :file_version do
    file_id { 1 }
    file_owner_id { 1 }
    version { 1 }
    file_name { 'MyString' }
    file_extension { 'MyString' }
    file_location { 'MyString' }
  end
end
