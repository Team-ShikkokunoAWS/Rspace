# coding: utf-8
require 'json'

class Entry < ApplicationRecord
  belongs_to :user, foreign_key: 'uid'
  belongs_to :room

  def index_response(uid)
    res_entry = Entry.new
    entries = Entry.where(room_id: self[:room_id])
    entries.each do |entry|
      if entry.uid != uid
        res_entry = entry
      end
    end

    entry_hash = entry_to_hash(res_entry)
    add_user_name(entry_hash)
    add_latest_message(entry_hash)
    change_key_for_js(entry_hash)
  end

  def partner_response
    entry_hash = entry_to_hash(self)
    add_user_name(entry_hash)
    change_key_for_js(entry_hash)
  end

  def entry_to_hash(entry)
    entry_json = entry.to_json
    JSON.parse(entry_json)
  end

  def add_user_name(room)
    room['userName'] = user_name(room['uid'])
  end

  def user_name(uid)
    User.find_by(uid: uid)[:name]
  end

  def add_latest_message(room)
    room['latestMessage'] = latest_message(room)
  end

  def latest_message(room)
    latest_message = Message.order(created_at: 'DESC').find_by(room_id: room['room_id'])

    if latest_message
      latest_message[:message]
    end
  end

  def change_key_for_js(entry)
    entry['roomId'] = entry['room_id']
    entry['createdAt'] = Time.zone.parse(entry['created_at']).strftime("%Y-%m-%d %H:%M:%S")
    entry['updatedAt'] = Time.zone.parse(entry['updated_at']).strftime("%Y-%m-%d %H:%M:%S")
    entry.delete('room_id')
    entry.delete('created_at')
    entry.delete('updated_at')

    return entry
  end
end
