Rails.application.routes.draw do
  # resources :rooms, only: [:index, :show, :create]

  namespace 'api' do
    namespace 'v1' do
      post 'auth' => 'users#auth'
      post 'all-users' => 'users#all_users'
      post 'users/show' => 'users#show'
      post 'users/update' => 'users#update'
      resources :users, except:[:show, :update]
    end
  end
end
