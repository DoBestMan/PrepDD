Sidekiq.configure_server { |config| config.redis = { url: ENV['REDIS_URL'] } }

Sidekiq.configure_client { |config| config.redis = { url: ENV['REDIS_URL'] } }
