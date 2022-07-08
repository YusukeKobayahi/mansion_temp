# frozen_string_literal: true

module MansionImport
  extend Rake::DSL

  namespace :mansion_import do
    desc 'Import mansion data from S3'
    task execute: :environment do
      Mansion.import_from_s3(
        client: Aws::S3::Client.new(region: 'ap-northeast-1'),
        bucket: ENV['S3_MANSION_DATA_BUCKET'],
        object_key: ENV['S3_MANSION_DATA_OBJECT_KEY'],
        tmp_file_path: Rails.root.join('tmp', 'mansion-data-from-s3.csv'),
      )
    end
  end
end
