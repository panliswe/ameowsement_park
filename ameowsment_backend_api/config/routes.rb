Rails.application.routes.draw do
  get '/red_dot_games/topscore', to: 'red_dot_games#topscore'
  resources :red_dot_games
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
