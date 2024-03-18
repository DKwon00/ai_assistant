class Game < ApplicationRecord
    has_many :pages, dependent: :destroy
end
