Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://h:p67ce11c00bdb54a0f694ea7f74e538a4b56a28db995ad378e1eb761dd266c41f@ec2-3-222-121-40.compute-1.amazonaws.com:19469' }
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://h:p67ce11c00bdb54a0f694ea7f74e538a4b56a28db995ad378e1eb761dd266c41f@ec2-3-222-121-40.compute-1.amazonaws.com:19469' }
end