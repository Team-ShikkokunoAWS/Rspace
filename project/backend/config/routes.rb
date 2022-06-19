Rails.application.routes.draw do
  # resources :rooms, only: [:index, :show, :create]

  namespace 'api' do
    namespace 'v1' do
      post 'auth' => 'users#auth'
      post 'all-users' => 'users#all_users'
      post 'users/show' => 'users#show'
      post 'users/update' => 'users#update'
      resources :users, except:[:show, :update]

      # get 'rooms/all-rooms' => 'rooms#all_rooms'
      post 'rooms/index' => 'rooms#index'
      post 'rooms/show' => 'rooms#show'
      post 'rooms/create' => 'rooms#create'
      post 'rooms/check-room' => 'rooms#check_room'
      post 'rooms/partner' => 'rooms#partner'

      post 'messages/all-messages' => 'messages#all_messages'
      post 'messages/unread-messages' => 'messages#unread_messages'
      post 'messages/create' => 'messages#create'
    end
  end
end
