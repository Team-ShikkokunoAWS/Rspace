class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: false do |t|
      t.column :uid ,'STRING PRIMARY KEY NOT NULL'
      t.string :name, :null => false
      t.string :password, :null => false
      t.boolean :is_vaild, default: true

      t.timestamps
    end
  end
end
