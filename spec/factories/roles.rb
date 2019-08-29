FactoryBot.define do
  factory :role do
    name { 'admin' }

    trait :super_admin do
      name { 'super_admin' }
    end
  end
end

