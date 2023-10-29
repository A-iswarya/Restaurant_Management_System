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
      resources :customers do
        post '/login', to: 'authentication#login', on: :collection
      end
      resources :menus
      resources :feedbacks
      resources :orders do
        post '/update_status', to: 'orders#update_status', on: :member
      end
      resources :tables do
        post '/update_status', to: 'tables#update_status', on: :member
      end
    end
  end
end
