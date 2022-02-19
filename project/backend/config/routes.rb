Rails.application.routes.draw do
  # resources :rooms, only: [:index, :show, :create]

  namespace 'api' do
    namespace 'v1' do
      # post 'login' => 'users#login'
      resources :users
    end
  end
end
