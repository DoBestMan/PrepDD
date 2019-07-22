module Types
  class UserForPasswordResetType < GraphQL::Schema::Object
    description 'User with limited fields for the password reset screen'

    field :email, String, null: false
    field :reset_password_period_valid,
          Boolean,
          null: true, method: :reset_password_period_valid?

    def email
      object.email if object.reset_password_period_valid?
    end
  end
end
