FactoryBot.define do
  factory :user do
    sequence(:email) {|n| Faker::Internet.email.gsub(/@/,"#{n}@")}
    sequence(:full_name)  { Faker::Name.name }
  end
end
