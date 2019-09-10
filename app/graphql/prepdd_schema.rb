class PrepddSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  max_depth 6
  # max_complexity 1000
end
