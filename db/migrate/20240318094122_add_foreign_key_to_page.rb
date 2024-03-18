class AddForeignKeyToPage < ActiveRecord::Migration[7.1]
  def change
    add_foreign_key :pages, :games
  end
end
