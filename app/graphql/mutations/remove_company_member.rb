class Mutations::RemoveCompanyMember < GraphQL::Schema::Mutation
  argument :companyId, ID, required: true
  argument :userId, ID, required: false
  argument :userIds, [ID], required: false

  field :team, Types::TeamType, null: true
  field :errors, [Types::FormErrorType], null: false
  field :success, Boolean, null: false

  def resolve(company_id: nil, user_id: nil, user_ids: nil)
    response = { errors: [] }

    if user_id
      user = User.find(user_id)
      user.teams.where(company_id: company_id).destroy_all
      user.companies.where(id: company_id).first&.destroy!
      RolesUser.where(user_id: user_id, company_id: company_id).first&.destroy!

    elsif user_ids.present?
      user_ids.each do |id|
        user = User.find(id)
        user.teams.where(company_id: company_id).destroy_all
        user.companies.where(id: company_id).first.destroy!
      end
    end

    response[:success] = true
    response

    response
  end
end


