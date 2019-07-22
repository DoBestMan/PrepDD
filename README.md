# PREPDD

## Installation

1. Install chruby (optional)
2. Install gems: `bundle install`
3. Install node deps: `yarn install`
4. Set up database: `bundle exec rake db:migrate db:seed`

## Deployment

Making a pull request automatically create a one-off review app in Heroku. Changes merged into master are automatically deployed to staging.

## Rake tasks

- **rake graphql:gen** Generates typescript definitions for graphql queries
- **rake format:write** Autoformats source files
