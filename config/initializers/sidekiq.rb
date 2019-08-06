Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://h:p1da991059a1dfa30351ed23a72902fbdc6f3fd18db44cf18245c601c550c1000@ec2-3-222-82-60.compute-1.amazonaws.com:27059' }
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://h:p1da991059a1dfa30351ed23a72902fbdc6f3fd18db44cf18245c601c550c1000@ec2-3-222-82-60.compute-1.amazonaws.com:27059' }
end