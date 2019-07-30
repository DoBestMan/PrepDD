require 'aws-sdk'
Aws.config.update(
  credentials: Aws::Credentials.new(ENV['ACCESS_KEY_ID'], ENV['SECRET_ACCESS_KEY']),
  region: 'us-east-1',
  )