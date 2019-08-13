Rails.application.routes.draw do
  devise_for :users, skip: :all

  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  post '/graphql', to: 'graphql#execute'
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  root to: 'welcome#index'

  # Redirect all html requests to the root so they can be handled by javascript
  get '*path',
      to: 'welcome#index',
      constraints: ->(request) { !request.xhr? && request.format.html? }
end
