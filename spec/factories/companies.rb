FactoryBot.define do
  factory :company do
    sequence(:name) { Faker::Company.name }
  end
end
