# frozen_string_literal: true

module RidgepoleTask
  extend Rake::DSL

  namespace :ridgepole do
    desc 'Execute apply'
    task apply: :environment do
      ridgepole("-f #{schemafile_path} --apply")
      Rake::Task['plant_erd:generate'].invoke if Rails.env.development?
    end

    desc 'Execute dry_run'
    task dry_run: :environment do
      ridgepole("-f #{schemafile_path} --apply --dry-run")
    end

    desc 'Export Schemafile'
    task export: :environment do
      ridgepole("--export -o #{schemafile_path}.out")
    end

    desc 'Diff Schemafile'
    task diff: :environment do
      ridgepole("--diff #{db_config_path} #{schemafile_path} -o #{schemafile_path}-diff.out")
    end
  end

  class << self
    def ridgepole(options)
      opts = [
        '--dump-with-default-fk-name', (ENV['ALLOW_DROP_TABLE'] == '1' ? nil : '--skip-drop-table'), options
      ].compact.join(' ')
      system "#{env_vars}bundle exec ridgepole -c #{db_config_path} -E #{Rails.env} #{opts}"
    end

    def env_vars
      ENV['DATABASE_URL'].present? ? "DATABASE_URL='#{ENV['DATABASE_URL']}' " : ''
    end

    def schemafile_path
      Rails.root.join('Schemafile')
    end

    def db_config_path
      Rails.root.join('config', 'database.yml')
    end
  end
end
