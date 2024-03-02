Rails.application.routes.draw do
  resources :chats
  resources :page
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  root "home#index"
  get "/send", to: 'chats#reply'
  get "/chat", to: 'chats#chat_room'
  # Defines the root path route ("/")
  # root "posts#index"
end
