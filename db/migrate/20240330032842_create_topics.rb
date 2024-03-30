class CreateTopics < ActiveRecord::Migration[7.1]
  def change
    create_table :topics do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.string :q_and_a, array: true, default: []
      t.timestamps
    end
  end
end
