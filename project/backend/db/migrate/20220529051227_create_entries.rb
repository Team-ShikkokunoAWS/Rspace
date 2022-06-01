class CreateEntries < ActiveRecord::Migration[6.1]
  def up
    create_table :entries do |t|
      t.string :uid, null: false
      t.integer :room_id, null: false

      t.timestamps
    end

    add_foreign_key :entries, :users, column: :uid, primary_key: :uid
  end

  def down
    remove_foreign_key :entries, column: :uid
  end
end
