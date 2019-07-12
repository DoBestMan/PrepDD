source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.3'

gem 'rails', '~> 5.2.3'
gem 'sqlite3', groups: [:development, :test]
gem 'pg', group: :production
gem 'puma', '~> 3.11'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
gem 'turbolinks', '~> 5'
gem 'graphql'
gem 'bcrypt', '~> 3.1.7'
gem 'bootsnap', '>= 1.1.0', require: false

# Authentication
gem 'devise'
gem 'omniauth'
gem 'omniauth-twitter'
gem 'omniauth-facebook'
gem 'omniauth-linkedin'

#
gem "pundit"

#Performance
gem 'data_migrate'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'rspec-rails', '~> 3.8'
  gem 'shoulda', '~> 3.5'
  gem 'shoulda-matchers', '~> 2.0'
  gem 'factory_bot_rails', '~> 5.0.2'
  gem 'faker'
end

group :development do
  gem 'graphiql-rails'
  gem 'better_errors'
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
