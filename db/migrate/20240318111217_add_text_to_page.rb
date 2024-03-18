class AddTextToPage < ActiveRecord::Migration[7.1]
  def change
    add_column :pages, :text, :string
  end
end
