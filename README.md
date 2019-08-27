# PREPDD

[Test runs](https://dashboard.heroku.com/pipelines/e7e67d04-df76-4a64-9cc1-ccf6ac1bb9ef/tests) | [Deployed environments](https://dashboard.heroku.com/pipelines/e7e67d04-df76-4a64-9cc1-ccf6ac1bb9ef) | [Code quality](https://codeclimate.com/repos/5d38ae252d61b945a600020c) | [Kanban board](https://trello.com/b/HFa63Rgb/product)

## Setup

PrepDD is a normal Rails 5 application and follows the usual conventions and setup steps.

1. Install [chruby](https://github.com/postmodern/chruby) (recommended)
2. Install postgres using [postgres.app](https://postgresapp.com/downloads.html) (recommended) or homebrew
3. Install redis: `brew install redis`
4. Install gems: `bundle install`
5. Install node packages: `yarn install`
6. Set up database: `bundle exec rake db:create:all db:migrate db:seed`
7. Run `bundle exec rake data:migrate` to seed data


Finally, you are ready to start the server by running `bundle exec foreman start -f Procfile.dev`.

## Deployment

Deployment and test automation is controlled through [Heorku pipelines](https://devcenter.heroku.com/articles/pipelines).

- **_Pull requests_** are automatically deployed to individual **_review_** environments.
- **_Master_** is automatically deployed to the **_staging_** environment.
- **_Promote staging_** to **_production_** using the Heroku interface. ([see how](https://devcenter.heroku.com/articles/pipelines#promoting))

## Rake tasks

- **rake graphql:gen** Generates typescript definitions for graphql queries
- **rake format:write** Autoformats source files
