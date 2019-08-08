class Types::FormErrorType < GraphQL::Schema::Object
  description 'A user-readable error from a form field'

  field :message, String, null: false, description: 'A description of the error'
  field :path,
        String,
        null: true, description: 'Which field this error came from'
end
