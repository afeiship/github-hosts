Rails.application.routes.draw do
  scope :api do
    resources :posts
  end
end
