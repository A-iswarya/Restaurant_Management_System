Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :restaurants
      resources :admins do
        post '/login', to: 'authentication#login', on: :collection
      end
      resources :staffs do
        post '/login', to: 'authentication#login', on: :collection
      end
    end
  end
end
