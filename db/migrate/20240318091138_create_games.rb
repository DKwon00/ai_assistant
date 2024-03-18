class CreateGames < ActiveRecord::Migration[7.1]
  def change
    create_table :games do |t|
      t.string :title

      t.timestamps
    end
    add_index :games, :title, unique: true
  end
end
