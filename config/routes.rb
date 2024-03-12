Rails.application.routes.draw do
  resources :chatroom
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  root "home#index"
  get "/send", to: 'chat_room#reply'
  get "/chat", to: 'chat_room#index'
  post "/page", to: 'page#create'
  get "hello_world", to: 'hello_world#index'
  # Defines the root path route ("/")
  # root "posts#index"
end
