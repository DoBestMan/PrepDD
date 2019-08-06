release: bundle exec rake db:migrate
web: bundle exec rails server

web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -t 25
