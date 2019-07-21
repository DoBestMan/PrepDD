# This file contains our custom graphql tasks. The rest of the graphql tasks
# are provided by the graphql gem

namespace :graphql do
  desc 'Remove generated files'
  task :clean do
    rm_rf ['./__generated__', *Dir.glob('app/**/__generated__')]
  end

  desc 'Generate typescript definitions'
  task :types do
    exec(
      'yarn',
      'run',
      'apollo',
      'codegen:generate',
      '--localSchemaFile=schema.graphql',
      '--includes=app/javascript/src/graphql/**/*.{ts,tsx}',
      '--target=typescript',
      '--tagName=gql',
      '--globalTypesFile=app/javascript/src/graphql/__generated__/globalTypes.ts',
      # '--outputFlat'
    )
  end

  desc 'Run all steps to generate typescript definitions'
  task gen: %w[clean types schema:dump]
end
