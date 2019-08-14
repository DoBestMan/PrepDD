module Types
  class QueryType < GraphQL::Schema::Object
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :current_user,
          CurrentUserType,
          null: true, description: 'The currently logged in user'

    field :user_for_password_reset,
          UserForPasswordResetType,
          null: true,
          description: 'Information for resetting a users password' do
      argument :token,
               String,
               required: true,
               description:
                 'The reset token received from a forgot password email'
    end

    def current_user
      user = context[:controller].current_user
      { id: 'current_user', user: user, owned_companies: user.owned_companies, member_companies:
        user.companies, teams: user.teams }
    end

    def user_for_password_reset(token:)
      User.where(reset_password_token: token).first
    end
  end
end
