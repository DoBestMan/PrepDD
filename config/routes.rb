Rails.application.routes.draw do
  devise_for :users
  
  post "/graphql", to: "graphql#execute"
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  root to: 'welcome#index'

  # Redirect all html requests to the root so they can be handled by javascript
  get '*path', to: 'welcome#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
