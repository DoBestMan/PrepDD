module Types
  class FileBaseType < GraphQL::Schema::Object
    description 'A logical container for many versions of a file.'

    field :id, String, null: false
    field :is_template, Boolean, null: true
    field :is_active, Boolean, null: true
  end
end
