Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "/", to: "home_page#index"
  get "/send", to: 'chat_room#reply'
  get "/", to: 'chat_room#index'
  post "/page", to: 'pages#create'
  # Defines the root path route ("/")
  # root "posts#index"
end
