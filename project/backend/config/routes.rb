Rails.application.routes.draw do
  root 'rooms#index'
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :rooms, only: [:index, :show, :create]
end
