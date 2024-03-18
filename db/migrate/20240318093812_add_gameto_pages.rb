class AddGametoPages < ActiveRecord::Migration[7.1]
  def change
    add_reference :pages, :game
  end
end
