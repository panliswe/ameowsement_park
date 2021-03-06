class CreateRedDotGames < ActiveRecord::Migration[6.1]
  def change
    create_table :red_dot_games do |t|
      t.integer :score
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
