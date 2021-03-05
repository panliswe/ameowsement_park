class CreateGameRecords < ActiveRecord::Migration[6.1]
  def change
    create_table :game_records do |t|
      t.string :score
      t.references :user, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
