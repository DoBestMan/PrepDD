FactoryBot.define do
  factory :file_message_alert do
    file_message_id { 1 }
    user_id { 1 }
    is_read { false }
  end
end
