FactoryBot.define do
  factory :company do
    sequence(:full_name) { Faker::Company.name }
  end
end
