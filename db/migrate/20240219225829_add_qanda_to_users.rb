class AddQandaToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :q_and_a, :string, array: true, default: []
  end
end
