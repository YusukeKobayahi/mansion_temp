# frozen_string_literal: true

module PlantErdTask
  extend Rake::DSL

  namespace :plant_erd do
    desc 'Generate erd'
    task generate: :environment do
      config = Rails.application.config.database_configuration[Rails.env]
      output_path = Rails.root.join('doc', 'erd.pu')
      opts = "--host #{config['host']} --user #{config['username']} --database #{config['database']}"
      system "plant_erd mysql #{opts} > #{output_path}"
    end
  end
end
