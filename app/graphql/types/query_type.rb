module Types
  class QueryType < GraphQL::Schema::Object
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :current_user,
          CurrentUserType,
          null: true, description: 'The currently logged in user'

    field :user, UserType, null: true do
      description 'Find a user by id' 
      argument :id, ID, required: true
      end

    field :user_details, UserDetailsType, null: true do
      description 'Find a user by id'
      argument :id, ID, required: true
    end

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

    field :company, CompanyType, null: false do
      description 'Find a company by id'
      argument :id, ID, required: true
    end

    field :team, TeamType, null: false do
      description 'Find a team by id'
      argument :id, ID, required: true
      end

    field :roles, [RoleType], null: false do
      description 'Return All available roles'
      end

    field :user, UserType, null: false do
      description 'Return details of a user'
      argument :id, ID, required: true
    end

    def current_user
      user = context[:controller].current_user
      { id: 'current_user', user: user }
    end

    def user_details(id:)
      user = User.find(id)
      { id: 'user details', user: user }
    end

    def user(id:)
      User.find(id)
    end

    def user_for_password_reset(token:)
      User.where(reset_password_token: token).first
    end

    def company(id:)
      Company.find(id)
    end

    def team(id:)
      Team.find(id)
    end

    def roles
      Role.all.where("id != ?", 1)
    end

    def user(id:)
      User.find(id)
    end
  end
end
