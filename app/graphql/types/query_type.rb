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
      argument :companyId, ID, required: false
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

    field :company_users, CompanyUsersType, null: false do
      description 'Return details of a user'
      argument :CompanyId, ID, required: true
      argument :TeamId, ID, required: false
      argument :limit, Integer, required: false
      argument :offset, Integer, required: false
    end

    field :search_companies, SearchCompaniesType, null: false do
      description 'Find companies by user email OR Name'
      argument :text, String, required: true
      argument :companyId, ID, required: false
    end

    field :templateLists, [ListType], null: false do
      description 'All Available lists templates'
    end

    field :list, ListType, null: false do
      description 'Find a list by id'
      argument :id, ID, required: true
    end

    field :search_company_users, SearchCompanyUsersType, null: false do
      description 'Search users by company id'
      argument :companyId, ID, required: true
      argument :text, String, required: true
    end

    field :userLists, UserListType, null: false do
      description 'All users lists & tasks in current company'
      end

    field :tasks, [TaskType], null: false do
      description 'All users lists & tasks in current company'
    end

    def tasks
      Task.all
    end

    def user_lists
      user = context[:controller].current_user

      lists = user.lists.where(requester_id: user.last_viewed_company_id).
        or(user.lists.where(responder_id: user.last_viewed_company_id)).uniq

      {id: 'List & Task Sections', lists: lists}
    end

    def search_company_users(company_id:, text:)
      company = Company.find(company_id)
      users =
        company.users.where(
          'lower(email) LIKE :email_text OR lower(full_name) LIKE :text',
          email_text: text.downcase, text: "%#{text.downcase}%"
        )

      teams =
        company.teams.where(
          'lower(name) LIKE :text',
          text: "%#{text.downcase}%"
        )

      { users: users, teams: teams }
    end

    def template_lists
      List.where(is_template: true, is_public_template: true)
    end

    def list(id:)
      List.find(id)
    end

    def company_users(company_id:, team_id: nil, limit:, offset:)
      company = Company.find(company_id)
      users = company.users.limit(limit).offset(offset)
      if team_id.present?
        team = Team.find(team_id)
        users = team.users.limit(limit).offset(offset)
      end
      { company: company, users: users }
    end

    def current_user
      user = context[:controller].current_user
      { id: 'current_user', user: user }
    end

    def user_details(id:, company_id: nil)
      user = User.find(id)
      role = RolesUser.where(user_id: id, company_id: company_id).first&.role
      { id: 'user details', user: user, role: role }
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
      Role.all.where('id != ?', 1)
    end

    def user(id:)
      User.find(id)
    end

    def search_companies(text:, company_id: nil)
      return { companies: [], users: [] } unless !text.empty?

      if company_id
        company = Company.find(company_id)

        associates_company_ids = company.company_parents.pluck(:id)
        associates_company_ids += company.broker_parents.pluck(:id)
        associates_company_ids += [company_id]
      end

      companies = Company.search(text).where.not(id: associates_company_ids)
      users = User.search(text)

      users.each do |user|
        user_companies = user.companies.where.not(id: associates_company_ids)
        user.companies = user_companies
      end

      { companies: companies.uniq, users: users }
    end
  end
end
