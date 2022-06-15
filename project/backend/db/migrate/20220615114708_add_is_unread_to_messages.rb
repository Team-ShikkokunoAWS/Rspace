class AddIsUnreadToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :is_unread, :bool, default: true
  end
end
