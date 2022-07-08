# frozen_string_literal: true

Rails.application.routes.draw do
  post '/consumer/graphql', to: 'consumer/graphql#execute'

  # admin
  devise_for :admin, class_name: 'Admin::User', controllers: { omniauth_callbacks: 'admin/omniauth_callbacks' }

  devise_scope :admin do
    get '/admin/sign_in', to: 'devise/sessions#new', as: :new_admin_session
    delete '/admin/sign_out', to: 'devise/sessions#destroy', as: :destroy_admin_session
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # ヘルスチェック
  mount KomachiHeartbeat::Engine => '/ops'
end
