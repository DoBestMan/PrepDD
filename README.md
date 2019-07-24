# PREPDD
[View test runs](https://dashboard.heroku.com/pipelines/e7e67d04-df76-4a64-9cc1-ccf6ac1bb9ef/tests)

[View environments](https://dashboard.heroku.com/pipelines/e7e67d04-df76-4a64-9cc1-ccf6ac1bb9ef)
## Installation

1. Install [chruby](https://github.com/postmodern/chruby) (recommended)
2. Install postgres using [postgres.app](https://postgresapp.com/downloads.html) (recommended) or homebrew
2. Install gems: `bundle install`
3. Install node deps: `yarn install`
4. Set up database: `bundle exec rake db:migrate db:seed`

## Deployment

Making a pull request automatically create a one-off review app in Heroku. Changes merged into master are automatically deployed to staging.

## Rake tasks

- **rake graphql:gen** Generates typescript definitions for graphql queries
- **rake format:write** Autoformats source files
