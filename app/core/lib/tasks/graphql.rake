# frozen_string_literal: true

module GraphqlTask
  extend Rake::DSL

  namespace :graphql do
    namespace :consumer do
      task schema_dump: :environment do
        require 'graphql/rake_task'

        GraphQL::RakeTask.new(
          load_schema: lambda { |_task|
            require File.expand_path('../../app/graphql/consumer/inno_schema', __dir__)
            Consumer::InnoSchema
          },
          directory: './graphql/consumer',
        )
        Rake::Task['graphql:schema:idl'].invoke
      end
    end
  end
end
