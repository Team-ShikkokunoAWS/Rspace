Rails.application.routes.draw do
  # resources :rooms, only: [:index, :show, :create]

  # scope '/users' do
  #   scope '/v1' do
  #     post 'create' => 'users#create'
  #     post 'login' => 'users#login'
  #   end
  # end

  namespace 'api' do
    namespace 'v1' do
      resources :users
    end
  end

end
