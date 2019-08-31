FactoryBot.define do
  factory :team do
    sequence(:name) { Faker::Company.name }
    association :company
  end
end
