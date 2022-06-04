class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :uid, null: false
      t.integer :room_id, null: false, foreign_key: true
      t.string :message

      t.timestamps
    end

    add_foreign_key :messages, :users, column: :uid, primary_key: :uid
  end

  def down
    remove_foreign_key :messages, column: :uid
  end
end
