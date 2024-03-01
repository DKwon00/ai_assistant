class CreatePages < ActiveRecord::Migration[7.1]
  def change
    create_table :pages do |t|
      t.string :page_name
      t.text :text
      t.integer :query_count
      t.vector :embedding, limit: 1536

      t.timestamps
    end
  end
end
