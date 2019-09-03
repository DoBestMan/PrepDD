source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 5.2.3'
gem 'pg'
gem 'puma', '~> 4.0.1'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'turbolinks', '~> 5'
gem 'graphql'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.1.0', require: false

#Auth
gem 'pundit'
gem 'devise'
gem 'omniauth'
gem 'omniauth-twitter'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2'
gem 'omniauth-linkedin-oauth2'

#Performance
gem 'data_migrate'
gem 'activerecord-session_store'
gem 'sidekiq'

#Third-Party
gem 'aws-sdk', '~> 3'
gem 'aws-sdk-s3', '~> 1'
gem 'aws-sdk-kms'

#Other
gem 'creek'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails', '~> 3.8'
  gem 'shoulda', '~> 3.6'
  gem 'shoulda-matchers', '~> 3.0'
  gem 'shoulda-callback-matchers'
  gem 'factory_bot_rails', '~> 5.0.2'
  gem 'faker'
  gem 'pry', '~> 0.12.2'
end

group :development do
  gem 'graphiql-rails'
  gem 'better_errors'
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'foreman'
end

group :test do
  gem 'database_cleaner', '~> 1.7'
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'simplecov'
  gem 'rails-controller-testing'
end