# frozen_string_literal: true

require_relative 'boot'

require 'rails'
# Pick the frameworks you want:
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_mailbox/engine'
require 'action_text/engine'
require 'action_view/railtie'
# require "action_cable/engine"
# require 'sprockets/railtie'
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Inno
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.time_zone = 'Asia/Tokyo'

    Dir[Rails.root.join('lib/*.rb')].sort.each { |lib| require lib }

    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :ja

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.generators do |g|
      g.factory_bot false
      g.stylesheets false
      g.helper false
      g.test_frameworks false
      g.javascripts false
      g.orm :active_record, migration: false
    end

    # 現状ではActiveStorage::Analyzerで画像サイズを取得するためにキューを利用する
    # 重要な処理ではなないため inline を指定して簡易なシステム構成としている
    config.active_job.queue_adapter = :inline

    config.active_storage.routes_prefix = '/files'
  end
end