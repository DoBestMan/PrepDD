module Types
  class QueryType < GraphQL::Schema::Object
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :users,
          [UserType],
          null: false, description: 'List all users in the application'

    def users
      User.all
    end
  end
end
