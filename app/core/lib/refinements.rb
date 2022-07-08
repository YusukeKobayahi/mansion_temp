# frozen_string_literal: true

Dir[Pathname.new(__FILE__).dirname.join('refinements/**/*.rb')].sort.each { |f| require f }
