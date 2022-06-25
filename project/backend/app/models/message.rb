class Message < ApplicationRecord
  belongs_to :user, foreign_key: 'uid'
  belongs_to :room

  def message_response
    message_hash = to_hash(self)
    change_key_for_js(message_hash)
  end

  def to_hash(message)
    message_json = message.to_json
    JSON.parse(message_json)
  end

  def change_key_for_js(message)
    message['roomId'] = message['room_id']
    message['isUnread'] = message['is_unread']
    message['createdAt'] = Time.zone.parse(message['created_at']).strftime("%Y-%m-%d %H:%M:%S")
    message['updatedAt'] = Time.zone.parse(message['updated_at']).strftime("%Y-%m-%d %H:%M:%S")
    message.delete('room_id')
    message.delete('is_unread')
    message.delete('created_at')
    message.delete('updated_at')

    return message
  end

  def update_is_read
    update_message = Message.find(self[:id])
    update_message.update({:is_unread => false})
  end
end
