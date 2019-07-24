# PREPDD
[Test runs](https://dashboard.heroku.com/pipelines/e7e67d04-df76-4a64-9cc1-ccf6ac1bb9ef/tests) | [Deployed environments](https://dashboard.heroku.com/pipelines/e7e67d04-df76-4a64-9cc1-ccf6ac1bb9ef) | [Code quality](https://codeclimate.com/repos/5d38ae252d61b945a600020c) | [Kanban board](https://trello.com/b/HFa63Rgb/product) 
## Setup
PrepDD is a normal Rails 5 application and follows the usual conventions and setup steps.

1. Install [chruby](https://github.com/postmodern/chruby) (recommended)
2. Install postgres using [postgres.app](https://postgresapp.com/downloads.html) (recommended) or homebrew
2. Install gems: `bundle install`
3. Install node packages: `yarn install`
4. Set up database: `bundle exec rake db:migrate db:seed`

Finally, you are ready to start the server by running `bundle exec rails server`. Although not required, it's recommeded to open up a second terminal window and run `bin/webpack-dev-server` to speed up asset compilation and display messages from typescript.

## Deployment

Deployment and test automation is controlled through [Heorku pipelines](https://devcenter.heroku.com/articles/pipelines).

- ___Pull requests___ are automatically deployed to individual ___review___ environments.
- ___Master___ is automatically deployed to the ___staging___ environment.
- ___Promote staging___ to ___production___ using the Heroku interface. ([see how](https://devcenter.heroku.com/articles/pipelines#promoting))

## Rake tasks

- **rake graphql:gen** Generates typescript definitions for graphql queries
- **rake format:write** Autoformats source files
