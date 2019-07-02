class Mutations::RegisterUser < GraphQL::Schema::Mutation
  argument :firstName, String, required: true
  argument :lastName, String, required: true
  argument :email, String, required: true
  argument :password, String, required: true

  type Types::UserType

  def resolve(first_name: nil, last_name: nil, email: nil, password: nil)
    User.create!(
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password_confirmation: password
      }
    )
  end
end
