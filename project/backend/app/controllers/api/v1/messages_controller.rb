# coding: utf-8
require 'json'

class Api::V1::MessagesController < ApplicationController
  def all_messages
    messages = Message.where(room_id: params[:roomId])

    if messages.present?
      response = messages_response(messages)
      render status: 200, json: {status: 'SUCCESS', messages: response}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'illegalRoomId'}
    end
  end

  def unread_messages
    partner_uid = get_partner_uid(params[:roomId], params[:uid])
    if !partner_uid
      render status: 400, json: {status: 'ERROR', errorDetail: 'illegalRoomId'} and return
    end

    messages = Message.where(
      room_id: params[:roomId], uid: partner_uid, is_unread: true
    )
    if messages.present?
      response = messages_response(messages)
      update_is_read(messages)
      render status: 200, json: {status: 'SUCCESS', messages: response}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: 'cannotGetMessages'}
    end
  end

  def create
    message = Message.new(
      uid: params[:uid], room_id: params[:roomId], message: params[:message]
    )

    if message.save
      response = message_response(message)
      render status: 200, json: {status: 'SUCCESS', message: response}
    else
      render status: 400, json: {status: 'ERROR', errorDetail: message.errors}
    end
  end

  private
  def messages_response(messages)
    messages_hash = to_hash(messages)
    messages_hash.each do |message|
      change_key_for_js(message)
    end
  end

  def to_hash(message)
    message_json = message.to_json
    JSON.parse(message_json)
  end

  def change_key_for_js(message)
    message['roomId'] = message['room_id']
    message['isUnread'] = message['is_unread']
    message['createdAt'] = message['created_at']
    message['updatedAt'] = message['updated_at']
    message.delete('room_id')
    message.delete('is_unread')
    message.delete('created_at')
    message.delete('updated_at')
  end

  def get_partner_uid(room_id, client_uid)
    entries = Entry.where(room_id: room_id)

    entries.each do |entry|
      if entry.uid != client_uid
        return entry.uid
      end
    end
  end

  def update_is_read(messages)
    messages.each do |message|
      update_message = Message.find(message[:id])
      update_message.update({:is_unread => false})
    end
  end

  def message_response(message)
    message_hash = to_hash(message)
    change_key_for_js(message_hash)
  end
end
