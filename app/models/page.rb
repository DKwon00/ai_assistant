class Page < ApplicationRecord
    belongs_to :game
    has_neighbors :embedding
end
